import { createStore } from 'effector';
import {
  confirmModalClosed,
  confirmModalOpened,
  confirmModalClickedCancel,
  confirmModalClickedYes,
} from '.';
import { $confirmModalOwner, $description } from './state';

export const $confirmModalOpen = createStore(false)
  .on(confirmModalOpened, () => true)
  .reset([
    confirmModalClickedCancel,
    confirmModalClickedYes,
    confirmModalClosed,
  ]);

$confirmModalOwner
  .on(confirmModalOpened, (_, { owner }) => owner)
  .reset([confirmModalClickedCancel, confirmModalClosed]);

$description
  .on(confirmModalOpened, (_, { description }) => description)
  .reset([confirmModalClickedCancel, confirmModalClosed]);
