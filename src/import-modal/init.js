import { sample } from 'effector';
import {
  fileUploaded,
  importModalClosed,
  parseFileFx,
  importConfirmed,
} from '.';
import { importRecords } from '../core';
import { importClicked } from '../header';
import { $importModalOpen, $parsingStatus } from './state';

$importModalOpen.on(importClicked, () => true);
$importModalOpen.on(importModalClosed, () => false);
$importModalOpen.on(importRecords, () => false);

sample({
  source: fileUploaded,
  fn: event => ({ file: event.target.files[0] }),
  target: parseFileFx,
});

sample({
  source: parseFileFx.doneData,
  clock: importConfirmed,
  target: importRecords,
});

$parsingStatus.on(parseFileFx.done, () => 'success');
$parsingStatus.on(parseFileFx.fail, () => 'fail');
$parsingStatus.reset([importModalClosed, importRecords]);
