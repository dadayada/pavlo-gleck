import { createStore } from 'effector';
import {
  confirmModalClosed,
  confirmModalOpened,
  confirmModalClickedCancel,
  confirmModalClickedYes,
} from '.';
import { $confirmModalOwner } from './state';

export const $confirmModalOpen = createStore(false)
  .on(confirmModalOpened, () => true)
  .reset([
    confirmModalClickedCancel,
    confirmModalClickedYes,
    confirmModalClosed,
  ]);

$confirmModalOwner
  .on(confirmModalOpened, (_, p) => p)
  .reset([confirmModalClickedCancel, confirmModalClosed]);
