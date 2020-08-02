import React from 'react';
import { useList, useGate, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { Textarea } from 'baseui/textarea';
import { Label2 } from 'baseui/typography';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Checkbox } from 'baseui/checkbox';
import { Select } from 'baseui/select';
import { Tag } from 'baseui/tag';
import { Block } from 'baseui/block';
import { Modal, ModalHeader, ModalBody, SIZE, ROLE } from 'baseui/modal';
import { FormControl } from 'baseui/form-control';
import { tagAddedForPerson, tagRemovedForPerson } from '../core';
import {
  $personInfo,
  personInfoGate,
  $fullName,
  categoryEdited,
  fullNameChanged,
  $canAddCategories,
  $freeCategories,
  newCategorySelectChanged,
  addCategoriesClicked,
  changeTagsClicked,
  $personTags,
  tagsModalClosed,
} from './init';
import { $newCategorySelectValue, $tagsModalOpen } from './state';

export function PersonInfo() {
  const { id } = useParams();
  useGate(personInfoGate, { id });
  const fullName = useStore($fullName);
  const canAddCategories = useStore($canAddCategories);
  const freeCategories = useStore($freeCategories);
  const selectedNewCategory = useStore($newCategorySelectValue);
  const modalOpen = useStore($tagsModalOpen);
  const tags = useStore($personTags);
  const selectedTags = tags.filter(tag => tag.selected);
  return (
    <Block margin='scale300'>
      <Block>
        {selectedTags.length === 0 && (
          <Label2 marginRight='scale300' display='inline-block'>
            No tags
          </Label2>
        )}
        {selectedTags.map(tag => (
          <Tag key={tag.id} closeable={false}>
            {tag.name}
          </Tag>
        ))}
        <Button size='mini' onClick={changeTagsClicked}>
          Change tags
        </Button>
      </Block>
      <FormControl label='Full name'>
        <Input id={id} value={fullName} onChange={fullNameChanged} />
      </FormControl>
      {useList($personInfo, ({ id, name, value }) => (
        <>
          <FormControl label={name}>
            <Textarea
              id={name}
              value={value}
              onChange={e => categoryEdited({ id, value: e.target.value })}
            />
          </FormControl>
        </>
      ))}
      {canAddCategories && (
        <Block display='flex' justifyContent='space-between'>
          <Block width='50%'>
            <Select
              placeholder='Select categories to add'
              multi
              options={freeCategories}
              value={selectedNewCategory}
              onChange={newCategorySelectChanged}
              labelKey='name'
            />
          </Block>
          <Button
            disabled={selectedNewCategory.length === 0}
            onClick={addCategoriesClicked}
          >
            Add categories
          </Button>
        </Block>
      )}
      <Modal
        isOpen={modalOpen}
        onClose={tagsModalClosed}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Change tags for {fullName}</ModalHeader>
        <ModalBody>
          {tags.map(tag => (
            <Checkbox
              key={tag.id}
              onChange={e => {
                if (e.target.checked) {
                  tagAddedForPerson({ personId: Number(id), tagId: tag.id });
                } else {
                  tagRemovedForPerson({ personId: Number(id), tagId: tag.id });
                }
              }}
              checked={tag.selected}
            >
              {tag.name}
            </Checkbox>
          ))}
        </ModalBody>
      </Modal>
    </Block>
  );
}
