import { createEvent, createEffect } from 'effector';

export const addPersonClicked = createEvent();
export const addCategoryClicked = createEvent();
export const addTagClicked = createEvent();
export const tagToggled = createEvent();
export const clearSelectedTagsClicked = createEvent();
export const exportClicked = createEvent();
export const importClicked = createEvent();

export const exportToJSONFileFx = createEffect({
  handler: params => {
    const blobUrl = URL.createObjectURL(
      new File([JSON.stringify(params)], 'people.json', {
        type: 'text/json',
      })
    );
    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = 'people.json';

    document.body.appendChild(link);

    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    );

    document.body.removeChild(link);
  },
});
