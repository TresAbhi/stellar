import { GroupProps, MeshProps } from '@react-three/fiber';
import { GroupType } from 'core/parts/Group';
import * as RootPart from 'core/parts/Root';
import { RefObject } from 'react';

export const vanillaData = {
  center: 0,
  offset: {
    x: 0,
    y: 0,
  },
  parts: [] as AnyVanillaPartTypeArray,
  stages: [] as { partIndexes: number[] }[],
};

export const data = {
  ...vanillaData,

  '.stellar': {
    format_version: 1,
  },
  parts: [] as AnyPartTypeArray,
};

export type Type = typeof data;
export type VanillaType = typeof vanillaData;

export type AnyPartTypeArray = RootPart.AnyPartType[];
export type AnyVanillaPartTypeArray = RootPart.AnyVanillaPartType[];

export type PartAddress = number[];
export type PartAddresses = PartAddress[];

export type PartPointer = {
  // if undefined, the part is in the root
  parent?: GroupType;
  self: RootPart.AnyPartType;

  listing: RefObject<HTMLDivElement>;
  layoutModel: RefObject<GroupProps | MeshProps>; // TODO: fix ref object type
};
export type PartPointers = PartPointer[];

export type SelectionType = 'single' | 'multi' | 'list' | 'multi_list';
export type EfficientSelectionType = [
  number,
  boolean | EfficientSelectionType,
][];