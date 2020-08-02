import { createStore, createEvent, sample, combine } from 'effector';
import { personAdded, categoryAdded, tagAdded } from '../core';
import { addCategoryClicked, addPersonClicked, addTagClicked } from '../header';

export const modalClose = createEvent();
export const newPersonDataPushed = createEvent();
export const newCategoryDataPushed = createEvent();
export const newTagDataPushed = createEvent();
export const fullNameChanged = createEvent();
export const categoryNameChanged = createEvent();
export const categoriesSelectChanged = createEvent();
export const tagNameChanged = createEvent();
export const selectedTagsChanged = createEvent();

export const $modalOpen = createStore(false)
  .on([addCategoryClicked, addPersonClicked, addTagClicked], () => true)
  .on(modalClose, () => false)
  .reset([newPersonDataPushed, newCategoryDataPushed, newTagDataPushed]);

export const $fullName = createStore('').on(fullNameChanged, (_, p) => p);
export const $categoryName = createStore('').on(
  categoryNameChanged,
  (_, p) => p
);
export const $tagName = createStore('').on(tagNameChanged, (_, p) => p);

export const $modalType = createStore(null)
  .on(addCategoryClicked, () => 'category')
  .on(addPersonClicked, () => 'person')
  .on(addTagClicked, () => 'tag');

export const $categoriesSelectValue = createStore([]).on(
  categoriesSelectChanged,
  (_, p) => p.value
);

export const $selectedTags = createStore([]).on(
  selectedTagsChanged,
  (_, p) => p.value
);

sample({
  clock: newPersonDataPushed,
  source: combine(
    $fullName,
    $categoriesSelectValue,
    $selectedTags,
    (fullName, categories, tags) => ({
      fullName,
      categories: categories.map(el => el.id),
      tags: tags.map(el => el.id),
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

sample({
  clock: newTagDataPushed,
  source: $tagName,
  fn: tagName => ({ id: Date.now(), name: tagName }),
  target: tagAdded,
});

$categoriesSelectValue.reset([modalClose, personAdded]);
$selectedTags.reset([modalClose, personAdded])
$fullName.reset([modalClose, personAdded]);
$categoryName.reset([modalClose, categoryAdded]);
$tagName.reset([modalClose, tagAdded]);
