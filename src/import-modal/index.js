import { createEffect, createEvent } from 'effector';

export const importModalClosed = createEvent();
export const fileUploaded = createEvent();
export const importConfirmed = createEvent();

export const parseFileFx = createEffect({
  handler: async ({ file }) => {
    const str = await file.text();
    const json = JSON.parse(str);
    if (
      !json.categories ||
      !json.people ||
      !json.peopleInfo ||
      !json.peopleTags ||
      !json.tags
    ) {
      throw new Error();
    }
    return json;
  },
});
