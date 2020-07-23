import { createStore } from 'effector';
import connectLocalStorage from "effector-localstorage";

const peopleLocalStorage = connectLocalStorage('people/$people');
const categoriesLocalStorage = connectLocalStorage('people/$categories');
const peopleInfoLocalStorage = connectLocalStorage('people/$peopleInfo');

const $people = createStore(peopleLocalStorage.init([]));
const $categories = createStore(categoriesLocalStorage.init([]));
const $peopleInfo = createStore(peopleInfoLocalStorage.init({})); // { [personId]: { [categoryId]: value } } 

$people.watch(peopleLocalStorage);
$categories.watch(categoriesLocalStorage);
$peopleInfo.watch(peopleInfoLocalStorage);

export { $people, $categories, $peopleInfo };
