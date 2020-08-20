import {
  tagToggled,
  clearSelectedTagsClicked,
  exportClicked,
  exportToJSONFileFx,
} from '.';
import { $selectedTags } from './state';
import { sample } from 'effector';
import {
  $people,
  $categories,
  $peopleInfo,
  $tags,
  $peopleTags,
  $appVersion,
} from '../core/state';

$selectedTags
  .on(tagToggled, (s, p) => {
    if (p.checked) {
      return [...s, p.id];
    }
    return s.filter(id => id !== p.id);
  })
  .reset(clearSelectedTagsClicked);

sample({
  clock: exportClicked,
  source: {
    people: $people,
    categories: $categories,
    peopleInfo: $peopleInfo,
    tags: $tags,
    peopleTags: $peopleTags,
    appVersion: $appVersion,
  },
  target: exportToJSONFileFx,
});
