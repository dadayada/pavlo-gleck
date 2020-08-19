import React from 'react';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { Button } from 'baseui/button';
import { Block } from 'baseui/block';
import { DeleteAlt } from 'baseui/icon';
import { LabelMedium } from 'baseui/typography';
import { Tag, VARIANT } from 'baseui/tag';
import { useList, useStore } from 'effector-react';
import { $peopleList } from './state';
import { removePersonClicked } from './init';
import { $searchValue, $selectedTags } from '../header/state';

export function PeopleList() {
  const searchValue = useStore($searchValue);
  const selectedTags = useStore($selectedTags);
  return (
    <section>
      {useList($peopleList, ({ fullName, id, tags, categories }) => (
        <Block
          marginBottom='scale300'
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
              <LabelMedium>
                <Highlighter
                  textToHighlight={fullName}
                  searchWords={[searchValue]}
                  autoEscape
                />
              </LabelMedium>
            </Link>
            <div>
              {tags.map(tag => (
                <Tag
                  key={tag.id}
                  closeable={false}
                  kind={selectedTags.includes(tag.id) ? 'positive' : 'neutral'}
                  variant={
                    selectedTags.includes(tag.id)
                      ? VARIANT.solid
                      : VARIANT.light
                  }
                >
                  {tag.name}
                </Tag>
              ))}
            </div>
            <Button kind='tertiary' onClick={() => removePersonClicked({ id })}>
              <DeleteAlt size='scale800' />
            </Button>
          </Block>
          {categories.length > 0 && (
            <Block marginLeft='scale300' marginRight='scale300'>
              {categories.map(
                ({ categoryId, categoryName, categoryContent }) => (
                  <LabelMedium key={categoryId}>
                    <strong>{`${categoryName} (category): `}</strong>
                    <Highlighter
                      textToHighlight={categoryContent}
                      searchWords={[searchValue]}
                      autoEscape
                    />
                  </LabelMedium>
                )
              )}
            </Block>
          )}
        </Block>
      ))}
    </section>
  );
}
