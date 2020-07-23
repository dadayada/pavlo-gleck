import { createGate } from 'effector-react';
import { combine, sample, createEvent, createStore } from 'effector';
import { $categories, $peopleInfo, $people } from '../core/state';
import {
  personInfoEdited,
  personNameChanged,
  categoriesForPersonAdded,
} from '../core';

export const personInfoGate = createGate('person-info');
export const categoryEdited = createEvent();
export const fullNameChanged = createEvent();
export const newCategorySelectChanged = createEvent();
export const addCategoriesClicked = createEvent();

export const $newCategorySelectValue = createStore([])
  .on(newCategorySelectChanged, (_, p) => p.value)
  .reset([categoriesForPersonAdded, personInfoGate.state]);

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
