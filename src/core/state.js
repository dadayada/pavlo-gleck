import { createStore } from 'effector';
import connectLocalStorage from "effector-localstorage";

const peopleLocalStorage = connectLocalStorage('people/$people');
const categoriesLocalStorage = connectLocalStorage('people/$categories');
const peopleInfoLocalStorage = connectLocalStorage('people/$peopleInfo');
const tagsLocalStorage = connectLocalStorage('people/$tags');
const peopleTagsLocalStorage = connectLocalStorage('people/$peopleTags');

const appVersionLocalStorage = connectLocalStorage('people/$appVersion');

const $people = createStore(peopleLocalStorage.init([]));
const $categories = createStore(categoriesLocalStorage.init([]));
const $peopleInfo = createStore(peopleInfoLocalStorage.init({})); // { [personId]: { [categoryId]: value } }
const $tags = createStore(tagsLocalStorage.init([]));
const $peopleTags = createStore(peopleTagsLocalStorage.init([])) // Array<{ id: number, tags: number[] }>

const $appVersion = createStore(appVersionLocalStorage.init('alpha')) // alpha - first release

$people.watch(peopleLocalStorage);
$categories.watch(categoriesLocalStorage);
$peopleInfo.watch(peopleInfoLocalStorage);
$tags.watch(tagsLocalStorage);
$peopleTags.watch(peopleTagsLocalStorage);

$appVersion.watch(appVersionLocalStorage);

export { $people, $categories, $peopleInfo, $tags, $peopleTags, $appVersion };
