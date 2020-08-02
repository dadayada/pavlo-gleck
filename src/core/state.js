import { createStore } from 'effector';
import connectLocalStorage from "effector-localstorage";

const peopleLocalStorage = connectLocalStorage('people/$people');
const categoriesLocalStorage = connectLocalStorage('people/$categories');
const peopleInfoLocalStorage = connectLocalStorage('people/$peopleInfo');
const tagsLocalStorage = connectLocalStorage('people/$tags');
const peopleTagsLocalStorage = connectLocalStorage('people/$peopleTags');

const $people = createStore(peopleLocalStorage.init([]));
const $categories = createStore(categoriesLocalStorage.init([]));
const $peopleInfo = createStore(peopleInfoLocalStorage.init({})); // { [personId]: { [categoryId]: value } }
const $tags = createStore(tagsLocalStorage.init([]));
const $peopleTags = createStore(peopleTagsLocalStorage.init([])) // Array<{ id: number, tags: number[] }>

$people.watch(peopleLocalStorage);
$categories.watch(categoriesLocalStorage);
$peopleInfo.watch(peopleInfoLocalStorage);
$tags.watch(tagsLocalStorage);
$peopleTags.watch(peopleTagsLocalStorage);

export { $people, $categories, $peopleInfo, $tags, $peopleTags };
