import { createEvent, forward, createStore, guard, sample, combine } from 'effector';
import { confirmModalOpened, confirmModalClickedYes } from '../confirm-modal';
import { $confirmModalOwner } from '../confirm-modal/state';
import { tagRemoved } from '../core';

export const removeTagClicked = createEvent();

const $tagIdToRemove = createStore(null).on(removeTagClicked, (_, { id }) => id);

forward({
  from: removeTagClicked.map(() => 'remove-tag'),
  to: confirmModalOpened,
});

const sampledTagRemoved = guard({
  source: sample({
    clock: confirmModalClickedYes,
    source: combine({ id: $tagIdToRemove, owner: $confirmModalOwner }),
  }),
  filter: ({ owner }) => owner === 'remove-tag',
  target: tagRemoved.prepend(p => ({ id: p.id })),
});

forward({ from: sampledTagRemoved.map(() => null), to: $confirmModalOwner });
