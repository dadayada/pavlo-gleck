import { createEvent } from 'effector';

export const personAdded = createEvent();
export const personRemoved = createEvent();

export const categoryAdded = createEvent();
export const categoryNameChanged = createEvent();
export const categoriesReordered = createEvent();

export const personNameChanged = createEvent();
export const personInfoEdited = createEvent(); // payload: { personId, info: { categoryId: value } }
export const categoriesForPersonAdded = createEvent();

export const tagAdded = createEvent(); // { id: number, name: string }
export const tagRemoved = createEvent(); // { id: number }
export const tagNameChanged = createEvent(); // { id: number, name: string }
export const tagAddedForPerson = createEvent(); // { tagId: number, personId: number }
export const tagRemovedForPerson = createEvent(); // { personId: number, tagId: number }

export const importRecords = createEvent();

export const appMigratedFromAlphaToV1_0_0 = createEvent();
