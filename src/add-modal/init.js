import { createStore, createEvent, sample, combine } from 'effector';
import { personAdded, categoryAdded } from '../core';
import { addCategoryClicked, addPersonClicked } from '../header';

export const modalClose = createEvent();
export const newPersonDataPushed = createEvent();
export const newCategoryDataPushed = createEvent();
export const fullNameChanged = createEvent();
export const categoryNameChanged = createEvent();
export const categoriesSelectChanged = createEvent();

export const $modalOpen = createStore(false)
  .on([addCategoryClicked, addPersonClicked], () => true)
  .on(modalClose, () => false)
  .reset([newPersonDataPushed, newCategoryDataPushed]);

export const $fullName = createStore('').on(fullNameChanged, (_, p) => p);
export const $categoryName = createStore('').on(
  categoryNameChanged,
  (_, p) => p
);

export const $modalType = createStore(null)
  .on(addCategoryClicked, () => 'category')
  .on(addPersonClicked, () => 'person');

export const $categoriesSelectValue = createStore([]).on(
  categoriesSelectChanged,
  (_, p) => p.value
);

sample({
  clock: newPersonDataPushed,
  source: combine(
    $fullName,
    $categoriesSelectValue,
    (fullName, categories) => ({
      fullName,
      categories: categories.map(el => el.id),
    })
  ),
  fn: source => ({ ...source, id: Date.now() }),
  target: personAdded,
});

sample({
  clock: newCategoryDataPushed,
  source: $categoryName,
  fn: source => ({ name: source, id: Date.now() }),
  target: categoryAdded,
});

$categoriesSelectValue.reset([modalClose, personAdded]);
$fullName.reset([modalClose, personAdded]);
$categoryName.reset([modalClose, categoryAdded]);
