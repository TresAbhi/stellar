import useBlueprint from 'hooks/useBlueprint';
import useVersionControl, { UseVersionControl } from 'hooks/useVersionControl';
import produce, { applyPatches } from 'immer';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const versionUndo = () => {
  useVersionControl.setState(
    produce((draft: UseVersionControl) => {
      const undoPatch = draft.history[draft.index]?.undo;

      if (undoPatch) {
        useBlueprint.setState(applyPatches(useBlueprint.getState(), undoPatch));
      }

      draft.index = Math.max(0, draft.index - 1);
    }),
  );

  declareUnsavedChanges();
};
