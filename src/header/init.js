import { tagToggled, clearSelectedTagsClicked } from '.';
import { $selectedTags } from './state';

$selectedTags
  .on(tagToggled, (s, p) => {
    if (p.checked) {
      return [...s, p.id];
    }
    return s.filter(id => id !== p.id);
  })
  .reset(clearSelectedTagsClicked);
