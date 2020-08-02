import React from 'react';
import { useHistory, Switch, Route, Link } from 'react-router-dom';
import { useStore, useStoreMap } from 'effector-react';
import { useStyletron } from 'baseui';
import { StatefulPopover } from 'baseui/popover';
import { StatefulMenu } from 'baseui/menu';
import { Checkbox } from 'baseui/checkbox';
import { Button, SHAPE } from 'baseui/button';
import { Input } from 'baseui/input';
import { Filter, Menu } from 'baseui/icon';
import { $searchValue, searchValueChanged, $selectedTags } from './state';
import {
  addCategoryClicked,
  addPersonClicked,
  addTagClicked,
  tagToggled,
  clearSelectedTagsClicked,
} from '.';
import { $tags } from '../core/state';

const ADD_PERSON_LABEL = 'Add person';
const ADD_CATEGORY_LABEL = 'Add category';
const CATEGORIES_LIST_LABEL = 'Edit categories';
const ADD_TAG_LABEL = 'Add tag';
const TAGS_LIST_LABEL = 'Edit tags';

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
    case TAGS_LIST_LABEL: {
      history.push('/edit-tags');
      break;
    }
    case ADD_TAG_LABEL: {
      addTagClicked();
      break;
    }
    default:
  }
};

function TagCheckbox({ tag }) {
  const checked = useStoreMap({
    keys: [tag.id],
    store: $selectedTags,
    fn: (selectedTags, [id]) => selectedTags.includes(id),
  });
  return (
    <Checkbox
      onChange={e => tagToggled({ id: tag.id, checked: e.target.checked })}
      checked={checked}
    >
      {tag.name}
    </Checkbox>
  );
}

export function Header() {
  const [css, theme] = useStyletron();
  const searchValue = useStore($searchValue);
  const tags = useStore($tags);
  const history = useHistory();
  const filters = tags.map(tag => <TagCheckbox tag={tag} key={tag.id} />);
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
          <StatefulPopover
            content={({ close }) => (
              <div style={{ width: '100wh' }}>
                <p>Filter by tag</p>
                <Button shape={SHAPE.pill} size="compact" onClick={clearSelectedTagsClicked}>
                  Clear tags
                </Button>
                {filters}
              </div>
            )}
          >
            <Button size='compact'>
              <Filter size={theme.sizing.scale800} />
            </Button>
          </StatefulPopover>
          <Input
            size='compact'
            placeholder='Search person'
            value={searchValue}
            onChange={searchValueChanged}
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
              { label: ADD_TAG_LABEL },
              { label: CATEGORIES_LIST_LABEL },
              { label: TAGS_LIST_LABEL },
            ]}
            onItemSelect={({ item }) => {
              close();
              onItemSelect(item, history);
            }}
          />
        )}
      >
        <Button size='compact'>
          <Menu size='scale800' />
        </Button>
      </StatefulPopover>
    </section>
  );
}
