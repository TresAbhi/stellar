import { mutateBlueprint } from 'core/blueprint';
import { Blueprint } from 'game/Blueprint';
import { forEachRight, isEqual } from 'lodash';

export const togglePartsSelection = (ids: string[], draft?: Blueprint) => {
  let spliceIds: string[] = [];
  let insertIds: string[] = [];

  if (draft) {
    ids.forEach((id) => {
      const part = draft.parts.get(id);

      if (part) {
        if (part.selected) {
          spliceIds.push(id);
        } else {
          insertIds.push(id);
        }

        part.selected = !part.selected;
      }
    });

    spliceIds.forEach((id) => {
      forEachRight(draft.selections, (selection, index) => {
        if (isEqual(id, selection)) draft.selections.splice(index, 1);
      });
    });

    draft.selections.push(...insertIds);
  } else {
    mutateBlueprint((draft) => {
      togglePartsSelection(ids, draft);
    });
  }
};
