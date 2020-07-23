import {
  createEvent,
  createStore,
  sample,
  forward,
  combine,
  guard,
} from 'effector';
import { personRemoved } from '../core';
import { confirmModalOpened, confirmModalClickedYes } from '../confirm-modal';
import { $confirmModalOwner } from '../confirm-modal/state';

export const removePersonClicked = createEvent();

const $personIdToRemove = createStore(null).on(
  removePersonClicked,
  (_, { id }) => id
);

forward({
  from: removePersonClicked.map(() => 'remove-person'),
  to: confirmModalOpened,
});

const sampledPersonRemoved = guard({
  source: sample({
    clock: confirmModalClickedYes,
    source: combine({ id: $personIdToRemove, owner: $confirmModalOwner }),
  }),
  filter: ({ owner }) => owner === 'remove-person',
  target: personRemoved.prepend(p => ({ id: p.id })),
});

forward({ from: sampledPersonRemoved.map(() => null), to: $confirmModalOwner });
