import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { DeleteAlt } from 'baseui/icon';
import { LabelMedium } from 'baseui/typography';
import { Tag } from 'baseui/tag';
import { useList } from 'effector-react';
import { $peopleList } from './state';
import { removePersonClicked } from './init';

export function PeopleList() {
  return (
    <section>
      {useList($peopleList, ({ fullName, id, tags }) => (
        <Block
          marginBottom="scale300"
          overrides={{
            Block: {
              style: ({ $theme }) => ({ ...$theme.borders.border200 }),
            },
          }}
        >
          <Block
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            marginLeft='scale300'
            marginRight='scale300'
          >
            <Link to={`/person-info/${id}`}>
              <LabelMedium>{fullName}</LabelMedium>
            </Link>
            <div>
              {tags.map(tag => (
                <Tag key={tag.id} closeable={false}>{tag.name}</Tag>
              ))}
            </div>
            <Button kind='tertiary' onClick={() => removePersonClicked({ id })}>
              <DeleteAlt size='scale800' />
            </Button>
          </Block>
        </Block>
      ))}
    </section>
  );
}
