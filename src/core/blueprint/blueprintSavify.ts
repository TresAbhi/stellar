import { Blueprint, SavedBlueprint } from 'game/Blueprint';
import { cloneDeep } from 'lodash';

export const blueprintSavify = (blueprint: Blueprint) => {
  const clonedBlueprint = cloneDeep(blueprint);
  const savedBlueprint: SavedBlueprint = {
    ...clonedBlueprint,
    parts: Array.from(clonedBlueprint.parts, (couple) => couple),
  };

  return savedBlueprint;
};
