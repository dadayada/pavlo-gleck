import { combine } from 'effector';
import {
  $people,
  $peopleTags,
  $tags,
  $peopleInfo,
  $categories,
} from '../core/state';
import { $searchValue, $selectedTags } from '../header/state';

// TODO: refactor this
const $peopleList = combine(
  $searchValue,
  $people,
  $peopleTags,
  $tags,
  $selectedTags,
  $peopleInfo,
  $categories,
  (
    searchValue,
    people,
    peopleTags,
    tags,
    selectedTags,
    peopleInfo,
    categories
  ) => {
    return people
      .map(person => ({
        ...person,
        categories: Array.from(Object.entries(peopleInfo[person.id]))
          .map(([categoryId, categoryContent]) => ({
            categoryId: Number(categoryId),
            categoryContent,
            categoryName: categories.find(el => el.id === Number(categoryId)).name,
          }))
          .filter(({ categoryContent }) =>
            searchValue && categoryContent.toLowerCase().includes(searchValue.toLowerCase())
          ),
      }))
      .filter(
        el =>
          el.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
          el.categories.length > 0
      )
      .map(person => ({
        ...person,
        // TODO: workaround for alpha -> 1.0.0 migration
        tags:
          peopleTags.length > 0
            ? peopleTags
                .find(el => el.id === person.id)
                .tags.map(tagId => tags.find(tag => tag.id === tagId))
            : [],
      }))
      .filter(
        person =>
          selectedTags.length === 0 ||
          selectedTags.some(tagId =>
            Boolean(person.tags.find(tag => tag.id === tagId))
          )
      );
  }
);

export { $peopleList };
