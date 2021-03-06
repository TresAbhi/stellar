import useBlueprint from 'hooks/useBlueprint';
import useVersionControl, { UseVersionControl } from 'hooks/useVersionControl';
import produce, { applyPatches } from 'immer';
import { declareUnsavedChanges } from './declareUnsavedChanges';

export const versionRedo = () => {
  useVersionControl.setState(
    produce((draft: UseVersionControl) => {
      const redoPatch = draft.history[draft.index + 1]?.redo;

      if (redoPatch) {
        useBlueprint.setState(applyPatches(useBlueprint.getState(), redoPatch));
      }

      draft.index = Math.min(draft.history.length - 1, draft.index + 1);
    }),
  );

  declareUnsavedChanges();
};
