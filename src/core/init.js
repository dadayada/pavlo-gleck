import { sample } from 'effector';
import {
  personAdded,
  personRemoved,
  categoryAdded,
  personInfoEdited,
  categoriesReordered,
  categoryNameChanged,
  personNameChanged,
  categoriesForPersonAdded,
  tagAdded,
  tagAddedForPerson,
  tagNameChanged,
  tagRemoved,
  tagRemovedForPerson,
  appMigratedFromAlphaToV1_0_0,
  importRecords,
} from '.';
import {
  $people,
  $categories,
  $peopleInfo,
  $peopleTags,
  $tags,
  $appVersion,
} from './state';

$people
  .on(personAdded, (s, { id, fullName }) => [...s, { id, fullName }])
  .on(personRemoved, (s, { id }) => s.filter(el => el.id !== id))
  .on(personNameChanged, (s, { value, id }) =>
    s.map(el => (el.id === id ? { ...el, fullName: value } : el))
  )
  .on(importRecords, (_, p) => p.people);

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
  )
  .on(importRecords, (_, p) => p.categories);

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
  }))
  .on(importRecords, (_, p) => p.peopleInfo);

$tags
  .on(tagAdded, (s, p) => [...s, p])
  .on(tagRemoved, (s, p) => s.filter(el => el.id !== p.id))
  .on(tagNameChanged, (s, p) =>
    s.map(el => (el.id === p.id ? { ...el, name: p.name } : el))
  )
  .on(importRecords, (_, p) => p.tags);

$peopleTags
  .on(personAdded, (s, p) => [...s, { id: p.id, tags: p.tags }])
  .on(personRemoved, (s, p) => s.filter(el => el.id !== p.id))
  .on(tagAddedForPerson, (s, p) =>
    s.map(el =>
      el.id === p.personId ? { id: el.id, tags: [...el.tags, p.tagId] } : el
    )
  )
  .on(tagRemovedForPerson, (s, p) =>
    s.map(el =>
      el.id === p.personId
        ? { id: el.id, tags: el.tags.filter(tag => tag !== p.tagId) }
        : el
    )
  )
  .on(tagRemoved, (s, p) =>
    s.map(el =>
      el.tags.includes(p.id)
        ? { ...el, tags: el.tags.filter(id => id !== p.id) }
        : el
    )
  )
  .on(importRecords, (_, p) => p.peopleTags);

$appVersion.on(appMigratedFromAlphaToV1_0_0, () => '1.0.0');

sample({
  clock: appMigratedFromAlphaToV1_0_0,
  source: $people,
  fn: people => people.map(person => ({ id: person.id, tags: [] })),
  target: $peopleTags,
});

$appVersion.watch(s => {
  if (s === 'alpha') {
    appMigratedFromAlphaToV1_0_0();
  }
});
