import { FuelTank } from 'parts/FuelTank';
import { Group } from 'parts/Group';
import { FC } from 'react';
import { PartAddress } from './Blueprint';
import DeepPartial from './DeepPartial';

export type AnyPart = Group | FuelTank;
export type AnyVanillaPart = AnyPart & { meta: never };

export type AnyPartName = 'Group' | 'Fuel Tank';
export type AnyVanillaPartName = 'Fuel Tank';

export type AnyPartialPartType = DeepPartial<AnyPart>;
export type AnyPartialVanillaPartType = DeepPartial<AnyVanillaPart>;

export interface PartComponentProps {
  address: PartAddress;
}

export type PartModule = {
  data: AnyPart;

  Icon: FC<any>;
  LayoutComponent: FC<PartComponentProps>;

  isExportable: boolean;
};
