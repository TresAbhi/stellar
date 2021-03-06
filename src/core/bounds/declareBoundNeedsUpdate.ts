import useBlueprint from 'hooks/useBlueprint';
import useBounds, { UseBounds } from 'hooks/useBounds';
import produce from 'immer';

export const declareBoundNeedsUpdate = (id: string, draft?: UseBounds) => {
  if (draft) {
    const boundListing = draft.parts.get(id);
    const part = useBlueprint.getState().parts.get(id);

    if (boundListing) boundListing.needsUpdate = true;
    if (part && part.parentId) declareBoundNeedsUpdate(part.parentId, draft);
  } else {
    useBounds.setState(
      produce<UseBounds>((draft) => {
        declareBoundNeedsUpdate(id, draft);
      }),
    );
  }
};
