import { Button } from 'baseui/button';
import {
  Modal,
  ModalBody,
  ModalHeader,
  SIZE,
  ROLE,
  ModalFooter,
} from 'baseui/modal';
import { LabelMedium } from 'baseui/typography';
import { useStore } from 'effector-react';
import React from 'react';
import { fileUploaded, importConfirmed, importModalClosed } from '.';
import { $importModalOpen, $parsingStatus } from './state';

export function ImportModal() {
  const modalOpen = useStore($importModalOpen);
  const parsingStatus = useStore($parsingStatus);
  return (
    <Modal
      isOpen={modalOpen}
      onClose={importModalClosed}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Import records from file</ModalHeader>
      <ModalBody>
        <input
          type='file'
          multiple={false}
          onChange={fileUploaded}
          style={{ height: 48, background: 'lightgrey' }}
        />
        {parsingStatus === 'success' && (
          <LabelMedium>
            File is correct. AFTER IMPORT ALL CURRENT DATA WILL BE LOST
          </LabelMedium>
        )}
        {parsingStatus === 'fail' && (
          <LabelMedium>File is incorrect</LabelMedium>
        )}
      </ModalBody>
      {parsingStatus === 'success' && (
        <ModalFooter>
          <Button onClick={importConfirmed}>Import</Button>
        </ModalFooter>
      )}
    </Modal>
  );
}
