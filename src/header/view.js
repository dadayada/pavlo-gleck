import React from 'react';
import { useHistory, Switch, Route, Link } from 'react-router-dom';
import { useStore } from 'effector-react';
import { useStyletron } from 'baseui';
import { StatefulPopover } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { Search, Menu } from 'baseui/icon';
import { $searchValue, searchValueChanged } from './state';
import { addCategoryClicked, addPersonClicked } from '.';

const ADD_PERSON_LABEL = 'Add person';
const ADD_CATEGORY_LABEL = 'Add category';
const CATEGORIES_LIST_LABEL = 'Edit categories';

const onItemSelect = (item, history) => {
  switch (item.label) {
    case ADD_CATEGORY_LABEL: {
      addCategoryClicked();
      break;
    }
    case ADD_PERSON_LABEL: {
      addPersonClicked();
      break;
    }
    case CATEGORIES_LIST_LABEL: {
      history.push('/edit-categories');
      break;
    }
    default:
  }
};

export function Header() {
  const [css, theme] = useStyletron();
  const searchValue = useStore($searchValue);
  const history = useHistory();

  return (
    <section
      className={css({
        position: 'sticky',
        top: theme.sizing.scale300,
        display: 'flex',
        justifyContent: 'space-between',
      })}
    >
      <Switch>
        <Route path='/' exact>
          <Input
            placeholder='Search person'
            value={searchValue}
            onChange={searchValueChanged}
            startEnhancer={<Search size={theme.sizing.scale800} />}
          />
        </Route>
        <Route path='*'>
          <Link to='/'>Return to list</Link>
        </Route>
      </Switch>

      <StatefulPopover
        content={({ close }) => (
          <StatefulMenu
            items={[
              { label: ADD_PERSON_LABEL },
              { label: ADD_CATEGORY_LABEL },
              { label: CATEGORIES_LIST_LABEL },
            ]}
            onItemSelect={({ item }) => {
              close();
              onItemSelect(item, history);
            }}
          />
        )}
      >
        <Button>
          <Menu size='scale800' />
        </Button>
      </StatefulPopover>
    </section>
  );
}
