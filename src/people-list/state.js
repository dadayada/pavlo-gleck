import { combine } from 'effector';
import { $people } from '../core/state';
import { $searchValue } from '../header/state';

const $peopleList = combine($searchValue, $people, (searchValue, people) =>
  people.filter(el =>
    el.fullName.toLowerCase().includes(searchValue.toLowerCase())
  )
);

export { $peopleList };
