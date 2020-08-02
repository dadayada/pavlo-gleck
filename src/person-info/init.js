import { createGate } from 'effector-react';
import { combine, sample, createEvent } from 'effector';
import {
  $categories,
  $peopleInfo,
  $people,
  $tags,
  $peopleTags,
} from '../core/state';
import {
  personInfoEdited,
  personNameChanged,
  categoriesForPersonAdded,
} from '../core';
import { $newCategorySelectValue, $tagsModalOpen } from './state';

export const personInfoGate = createGate('person-info');
export const categoryEdited = createEvent();
export const fullNameChanged = createEvent();
export const newCategorySelectChanged = createEvent();
export const addCategoriesClicked = createEvent();

export const tagsModalClosed = createEvent();
export const selectedTagsChanged = createEvent();
export const changeTagsClicked = createEvent();

$tagsModalOpen.on(changeTagsClicked, () => true).reset([tagsModalClosed]);

$newCategorySelectValue
  .on(newCategorySelectChanged, (_, p) => p.value)
  .reset([categoriesForPersonAdded, personInfoGate.state]);

export const $personTags = combine(
  personInfoGate.state,
  $tags,
  $peopleTags,
  ({ id }, tags, peopleTags) => {
    if (!id) {
      return [];
    }
    const personTags = peopleTags.find(el => String(el.id) === String(id)).tags;
    return tags.map(el => ({ ...el, selected: personTags.includes(el.id) }));
  }
);

export const $fullName = combine(
  personInfoGate.state,
  $people,
  ({ id }, people) => people.find(el => String(el.id) === String(id))?.fullName
);

export const $personInfo = combine(
  $peopleInfo,
  $categories,
  personInfoGate.state,
  (peopleInfo, categories, { id }) => {
    if (!id) {
      return [];
    }
    const personInfo = peopleInfo[id];
    const personCategories = Object.keys(personInfo);
    return categories
      .filter(el => personCategories.includes(String(el.id)))
      .map(category => ({
        id: category.id,
        name: category.name,
        value: personInfo[category.id] || '',
      }));
  }
);

export const $freeCategories = combine(
  $peopleInfo,
  $categories,
  personInfoGate.state,
  (peopleInfo, categories, { id }) => {
    if (!id) {
      return [];
    }
    const personInfo = peopleInfo[id];
    const personCategories = Object.keys(personInfo);
    return categories.filter(el => !personCategories.includes(String(el.id)));
  }
);

export const $canAddCategories = combine(
  $peopleInfo,
  $categories,
  personInfoGate.state,
  (peopleInfo, categories, { id }) => {
    if (!id) {
      return false;
    }
    return Object.keys(peopleInfo[id]).length !== categories.length;
  }
);

sample({
  source: personInfoGate.state,
  clock: fullNameChanged,
  fn: (pageParams, event) => ({
    id: Number(pageParams.id),
    value: event.target.value,
  }),
  target: personNameChanged,
});

sample({
  source: personInfoGate.state,
  clock: categoryEdited,
  fn: (pageParams, { id, value }) => ({
    personId: pageParams.id,
    info: { categoryId: id, value: value },
  }),
  target: personInfoEdited,
});

sample({
  clock: addCategoriesClicked,
  source: combine({
    pageParams: personInfoGate.state,
    categories: $newCategorySelectValue,
  }),
  fn: ({ pageParams, categories }) => ({
    personId: pageParams.id,
    categoriesIds: categories.map(el => el.id),
  }),
  target: categoriesForPersonAdded,
});
