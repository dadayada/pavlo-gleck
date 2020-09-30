import { forward, guard, sample } from 'effector';
import { deleteCategoryClicked } from '.';
import { confirmModalClickedYes, confirmModalOpened } from '../confirm-modal';
import { $confirmModalOwner } from '../confirm-modal/state';
import { categoryRemoved } from '../core';
import { $peopleInfo } from '../core/state';

const getConfirmCategoryRemoveMessage = (peopleInfo, categoryId) => {
  let nonEmptyRecordsCount = 0;
  for (const recordsMap of Object.values(peopleInfo)) {
    if (recordsMap[categoryId]) {
      nonEmptyRecordsCount += 1;
    }
  }
  if (nonEmptyRecordsCount === 0) {
    return 'No data will be lost. Remove this category?';
  }
  return `There are ${nonEmptyRecordsCount} people with records in this category. These records will be LOST. Are you sure you want to remove this category?`;
};

sample({
  source: $peopleInfo,
  clock: deleteCategoryClicked,
  fn: (peopleInfo, { id }) => ({
    owner: 'remove-category',
    description: getConfirmCategoryRemoveMessage(peopleInfo, id),
  }),
  target: confirmModalOpened,
});

sample({
  source: deleteCategoryClicked,
  clock: guard(sample($confirmModalOwner, confirmModalClickedYes), {
    filter: owner => owner === 'remove-category',
  }),
  target: categoryRemoved,
});

forward({
  from: deleteCategoryClicked.map(() => ({ owner: 'remove-category' })),
  to: confirmModalOpened,
});
