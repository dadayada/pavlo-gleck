import React from 'react';
import { useStore } from 'effector-react';
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import { $confirmModalOpen } from './init';
import {
  confirmModalClosed,
  confirmModalClickedCancel,
  confirmModalClickedYes,
} from '.';

export function ConfirmModal() {
  const modalOpen = useStore($confirmModalOpen);
  return (
    <Modal
      isOpen={modalOpen}
      onClose={confirmModalClosed}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Confirm?</ModalHeader>
      <ModalFooter>
        <ModalButton kind='tertiary' onClick={confirmModalClickedCancel}>
          Cancel
        </ModalButton>
        <ModalButton onClick={confirmModalClickedYes}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
