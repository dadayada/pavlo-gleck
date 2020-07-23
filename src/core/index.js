import { createEvent } from 'effector';

export const personAdded = createEvent();
export const personRemoved = createEvent();

export const categoryAdded = createEvent();
export const categoryNameChanged = createEvent();
export const categoriesReordered = createEvent();

export const personNameChanged = createEvent();
export const personInfoEdited = createEvent(); // payload: { personId, info: { categoryId: value } }
export const categoriesForPersonAdded = createEvent(); 
