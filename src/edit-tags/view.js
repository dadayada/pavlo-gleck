import React from 'react';
import { useList } from 'effector-react';
import { ListItem } from 'baseui/list';
import { Input } from 'baseui/input';
import { DeleteAlt } from 'baseui/icon';
import { Button } from 'baseui/button';
import { $tags } from '../core/state';
import { tagNameChanged } from '../core';
import { removeTagClicked } from './init';

export function EditTags() {
  const tags = useList($tags, tag => (
    <ListItem key={tag.id}>
      <Input
        size='compact'
        value={tag.name}
        onChange={e => tagNameChanged({ id: tag.id, name: e.target.value })}
      />
      <Button
        kind='tertiary'
        size='compact'
        onClick={() => removeTagClicked({ id: tag.id })}
      >
        <DeleteAlt size='scale800' />
      </Button>
    </ListItem>
  ));
  return tags;
}
