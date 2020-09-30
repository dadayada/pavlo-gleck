import React from 'react';
import { useStore } from 'effector-react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import { ParagraphMedium } from 'baseui/typography';
import { $confirmModalOpen } from './init';
import {
  confirmModalClosed,
  confirmModalClickedCancel,
  confirmModalClickedYes,
} from '.';
import { $description } from './state';

export function ConfirmModal() {
  const modalOpen = useStore($confirmModalOpen);
  const description = useStore($description);
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
      {description && (
        <ModalBody>
          <ParagraphMedium>{description}</ParagraphMedium>
        </ModalBody>
      )}
      <ModalFooter>
        <ModalButton kind='tertiary' onClick={confirmModalClickedCancel}>
          Cancel
        </ModalButton>
        <ModalButton onClick={confirmModalClickedYes}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
}
