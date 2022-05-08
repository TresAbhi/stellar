import { mutateBlueprintWithoutHistory } from "functions/blueprint";
import { UUID } from "types/Parts";
import { getPart } from "./getPart";

export const unselectParts = (IDs: UUID[]) => {
  mutateBlueprintWithoutHistory((draft) => {
    IDs.forEach((ID) => {
      const part = getPart(ID, draft);
      if (part) part.selected = false;
    });

    draft.selections = draft.selections.filter(
      (selection) => !IDs.includes(selection),
    );
  });
};
