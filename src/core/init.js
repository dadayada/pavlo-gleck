import {
  personAdded,
  personRemoved,
  categoryAdded,
  personInfoEdited,
  categoriesReordered,
  categoryNameChanged,
  personNameChanged,
  categoriesForPersonAdded,
} from '.';
import { $people, $categories, $peopleInfo } from './state';

$people
  .on(personAdded, (s, { id, fullName }) => [...s, { id, fullName }])
  .on(personRemoved, (s, { id }) => s.filter(el => el.id !== id))
  .on(personNameChanged, (s, { value, id }) =>
    s.map(el => (el.id === id ? { ...el, fullName: value } : el))
  );

$categories
  .on(categoryAdded, (s, p) => [...s, p])
  .on(categoriesReordered, (s, { source, dest }) => {
    const listCopy = [...s];
    const [removed] = listCopy.splice(source, 1);
    listCopy.splice(dest, 0, removed);

    return listCopy;
  })
  .on(categoryNameChanged, (s, { id, value }) =>
    s.map(el => (el.id === id ? { ...el, name: value } : el))
  );

$peopleInfo
  .on(personInfoEdited, (s, { personId, info }) => ({
    ...s,
    [personId]: { ...s[personId], [info.categoryId]: info.value },
  }))
  .on(personAdded, (s, { id, categories }) => ({
    ...s,
    [id]: categories.reduce((acc, value) => {
      acc[value] = '';
      return acc;
    }, {}),
  }))
  .on(personRemoved, (s, { id }) => {
    const newState = { ...s };
    delete newState[id];
    return newState;
  })
  .on(categoriesForPersonAdded, (s, { personId, categoriesIds }) => ({
    ...s,
    [personId]: {
      ...s[personId],
      ...categoriesIds.reduce((acc, val) => {
        acc[val] = '';
        return acc;
      }, {}),
    },
  }));
