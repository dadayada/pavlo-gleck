import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from 'baseui/list';
import { Button } from 'baseui/button';
import { DeleteAlt } from 'baseui/icon';
import { LabelMedium } from 'baseui/typography';
import { useList } from 'effector-react';
import { $peopleList } from './state';
import { removePersonClicked } from './init';

export function PeopleList() {
  return (
    <section>
      {useList($peopleList, ({ fullName, id }) => (
        <ListItem>
          <Link to={`/person-info/${id}`}>
            <LabelMedium>{fullName}</LabelMedium>
          </Link>
          <Button kind='tertiary' onClick={() => removePersonClicked({ id })}>
            <DeleteAlt size='scale800' />
          </Button>
        </ListItem>
      ))}
    </section>
  );
}
