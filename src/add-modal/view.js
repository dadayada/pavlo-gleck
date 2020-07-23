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
import { $categories } from '../core/state';
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
} from './init';

export function AddModal() {
  const modalOpen = useStore($modalOpen);
  const fullName = useStore($fullName);
  const categoryName = useStore($categoryName);
  const modalType = useStore($modalType);
  const categories = useStore($categories);
  const categoriesValue = useStore($categoriesSelectValue);
  return (
    <Modal
      isOpen={modalOpen}
      onClose={modalClose}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>
        {modalType === 'category' ? 'New category' : 'New person'}
      </ModalHeader>
      <ModalBody>
        <FormControl
          label={modalType === 'category' ? 'Category name' : 'Full name'}
        >
          <Input
            id={modalType === 'category' ? 'category-name' : 'full-name'}
            value={modalType === 'category' ? categoryName : fullName}
            onChange={e =>
              modalType === 'category'
                ? categoryNameChanged(e.target.value)
                : fullNameChanged(e.target.value)
            }
          />
        </FormControl>
        {modalType === 'person' && (
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
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={
            modalType === 'category'
              ? newCategoryDataPushed
              : newPersonDataPushed
          }
        >
          Add
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
