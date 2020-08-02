import { createEvent, restore, createStore } from 'effector';

const searchValueChanged = createEvent();

const $selectedTags = createStore([]);
const $searchValue = restore(searchValueChanged.map(p => p.target.value), '');

export {
  $searchValue,
  $selectedTags,
  searchValueChanged
}