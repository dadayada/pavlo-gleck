import { createEvent, restore } from 'effector';

const searchValueChanged = createEvent();

const $searchValue = restore(searchValueChanged.map(p => p.target.value), '');

export {
  $searchValue,
  searchValueChanged
}