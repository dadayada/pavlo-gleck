import React from 'react';
import { useList, useGate, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { Textarea } from 'baseui/textarea';
import { Input } from 'baseui/input';
import { Button } from 'baseui/button';
import { Select } from 'baseui/select';
import { Block } from 'baseui/block';
import { FormControl } from 'baseui/form-control';
import {
  $personInfo,
  personInfoGate,
  $fullName,
  categoryEdited,
  fullNameChanged,
  $canAddCategories,
  $freeCategories,
  $newCategorySelectValue,
  newCategorySelectChanged,
  addCategoriesClicked,
} from './init';

export function PersonInfo() {
  const { id } = useParams();
  useGate(personInfoGate, { id });
  const fullName = useStore($fullName);
  const canAddCategories = useStore($canAddCategories);
  const freeCategories = useStore($freeCategories);
  const selectedNewCategory = useStore($newCategorySelectValue);
  return (
    <Block margin='scale500'>
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
        <Block display='flex' justifyContent="space-between">
          <Block width="50%">
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
    </Block>
  );
}
