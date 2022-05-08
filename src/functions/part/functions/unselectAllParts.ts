import { mutateBlueprint } from 'functions/blueprint';
import { mutateParts } from './mutateParts';

export const unselectAllParts = () => {
  mutateBlueprint((draft) => {
    mutateParts(
      draft.selections,
      (draft) => {
        draft.selected = false;
      },
      draft,
    );
    draft.selections = [];
  });
};
