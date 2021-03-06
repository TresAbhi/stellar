import { Part } from 'game/parts/Part';
import useBlueprint from 'hooks/useBlueprint';

export const getPart = <Type extends Part>(id: string) => {
  return useBlueprint.getState().parts.get(id) as Type | undefined;
};
