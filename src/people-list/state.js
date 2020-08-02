import { combine } from 'effector';
import { $people, $peopleTags, $tags } from '../core/state';
import { $searchValue, $selectedTags } from '../header/state';

const $peopleList = combine(
  $searchValue,
  $people,
  $peopleTags,
  $tags,
  $selectedTags,
  (searchValue, people, peopleTags, tags, selectedTags) =>
    people
      .filter(el =>
        el.fullName.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(person => ({
        ...person,
        tags: peopleTags
          .find(el => el.id === person.id)
          .tags.map(tagId => tags.find(tag => tag.id === tagId)),
      }))
      .filter(
        person =>
          selectedTags.length === 0 ||
          selectedTags.some(tagId =>
            Boolean(person.tags.find(tag => tag.id === tagId))
          )
      )
);

export { $peopleList };
