import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { Block } from 'baseui/block';
import { Header } from '../header/view';
import { PeopleList } from '../people-list/view';
import { AddModal } from '../add-modal/view';
import { PersonInfo } from '../person-info/view';
import { ConfirmModal } from '../confirm-modal/view';
import { EditCategories } from '../edit-categories/view';
import { EditTags } from '../edit-tags/view';

const engine = new Styletron();

export function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Router>
          <Block>
            <Block margin='scale300'>
              <Header />
            </Block>
            <Switch>
              <Route path='/' exact>
                <PeopleList />
              </Route>
              <Route path='/person-info/:id'>
                <PersonInfo />
              </Route>
              <Route path='/edit-categories'>
                <EditCategories />
              </Route>
              <Route path='/edit-tags'>
                <EditTags />
              </Route>
            </Switch>
            <AddModal />
            <ConfirmModal />
          </Block>
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}
