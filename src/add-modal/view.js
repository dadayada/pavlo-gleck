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
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';
import { $categories, $tags } from '../core/state';
import {
  $modalOpen,
  modalClose,
  $fullName,
  fullNameChanged,
  newPersonDataPushed,
  newCategoryDataPushed,
  $modalType,
  $categoryName,
  categoryNameChanged,
  $categoriesSelectValue,
  categoriesSelectChanged,
  $tagName,
  newTagDataPushed,
  tagNameChanged,
  $selectedTags,
  selectedTagsChanged,
} from './init';

function AddPersonModal() {
  const modalOpen = useStore($modalOpen);
  const fullName = useStore($fullName);
  const categories = useStore($categories);
  const categoriesValue = useStore($categoriesSelectValue);
  const selectedTags = useStore($selectedTags);
  const tags = useStore($tags);
  return (
    <Modal
      isOpen={modalOpen}
      onClose={modalClose}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>New person</ModalHeader>
      <ModalBody>
        <FormControl label='Full name'>
          <Input
            id='full-name'
            value={fullName}
            onChange={e => fullNameChanged(e.target.value)}
          />
        </FormControl>
        <FormControl label='Choose categories'>
          <Select
            multi
            options={categories}
            labelKey='name'
            value={categoriesValue}
            closeOnSelect={false}
            onChange={categoriesSelectChanged}
          />
        </FormControl>
        <FormControl label='Choose tags'>
          <Select
            multi
            options={tags}
            labelKey='name'
            value={selectedTags}
            closeOnSelect={false}
            onChange={selectedTagsChanged}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={newPersonDataPushed}>Add</ModalButton>
      </ModalFooter>
    </Modal>
  );
}

function AddCategoryModal() {
  const modalOpen = useStore($modalOpen);
  const categoryName = useStore($categoryName);
  return (
    <Modal
      isOpen={modalOpen}
      onClose={modalClose}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>New category</ModalHeader>
      <ModalBody>
        <FormControl label='Category name'>
          <Input
            id='category-name'
            value={categoryName}
            onChange={e => categoryNameChanged(e.target.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={newCategoryDataPushed}>Add</ModalButton>
      </ModalFooter>
    </Modal>
  );
}

function AddTagModal() {
  const modalOpen = useStore($modalOpen);
  const tagName = useStore($tagName);
  return (
    <Modal
      isOpen={modalOpen}
      onClose={modalClose}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>New tag</ModalHeader>
      <ModalBody>
        <FormControl label='Tag name'>
          <Input
            id='tag-name'
            value={tagName}
            onChange={e => tagNameChanged(e.target.value)}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={newTagDataPushed}>Add</ModalButton>
      </ModalFooter>
    </Modal>
  );
}

export function AddModal() {
  const modalType = useStore($modalType);
  if (modalType === 'person') {
    return <AddPersonModal />;
  }
  if (modalType === 'category') {
    return <AddCategoryModal />;
  }
  if (modalType === 'tag') {
    return <AddTagModal />;
  }
  return null;
}
