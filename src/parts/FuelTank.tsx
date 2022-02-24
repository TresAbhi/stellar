import { ReactComponent as Icon } from 'assets/icons/fuel-tank.svg';
import * as PropertiesExplorer from 'components/PropertiesExplorer';
import useSelectionHandler, {
  UseMeshSelectionHandler,
} from 'hooks/useDesktopSelection';
import usePartMeta from 'hooks/usePartMeta';
import usePartUpdate from 'hooks/usePartUpdate';
import useUnitInputController from 'hooks/useUnitInputController';
import { getPartByAddress, setPartsByAddresses } from 'interfaces/blueprint';
import { FC, memo, useRef } from 'react';
import { CylinderGeometry, Mesh, MeshStandardMaterial } from 'three';
import {
  PartModule,
  PropertyComponentProps,
  ReactivePartComponentProps,
} from 'types/Parts';
import compareAddressesProps from 'utilities/compareAddressesProps';
import getMutualSlice from 'utilities/getMutualSlice';
import usePartTransformations from 'utilities/usePartTransformations';
import {
  DefaultPartData,
  PartWithMeta,
  PartWithTransformations,
} from './Default';

export interface VanillaFuelTank extends PartWithTransformations {
  n: 'Fuel Tank';
  N: {
    width_original: number;
    width_a: number;
    width_b: number;
    height: number;
    fuel_percent: number;
  };
  T: {
    color_tex:
      | '_'
      | 'Color_White'
      | 'Color_Gray'
      | 'Color_Black'
      | 'Color_Orange'
      | 'Metal'
      | 'Metal_2'
      | 'Metal_3'
      | 'Metal_4'
      | 'Pattern_Squares'
      | 'Pattern_Bars_Band'
      | 'Pattern_Bars'
      | 'Pattern_Bars_Half'
      | 'Pattern_Half'
      | 'Pattern_Cone'
      | 'SV_S1_USA'
      | 'SV_S1_Flag'
      | 'SV_S2'
      | 'SV_S3'
      | 'USA_Logo'
      | 'Gold_Foil'
      | 'Nozzle_2'
      | 'Nozzle_3'
      | 'Array'
      | 'Arrows'
      | 'Strut_Gray';
    shape_tex:
      | '_'
      | 'Flat'
      | 'Flat Smooth'
      | 'Flat Smooth 4'
      | 'Flat Faces'
      | 'Edges Smooth'
      | 'Edges Faces'
      | 'Edges Faces Top'
      | 'Edges Faces Bottom'
      | 'Rivets'
      | 'Half Rivets'
      | 'Interstage'
      | 'Interstage Full'
      | 'Fairing'
      | 'Nozzle_4'
      | 'Capsule'
      | 'Strut';
  };
}

export interface FuelTank extends VanillaFuelTank, PartWithMeta {}

export const FuelTankData: FuelTank = {
  ...DefaultPartData,

  meta: {
    ...DefaultPartData.meta,

    label: 'Fuel Tank',
  },
  n: 'Fuel Tank',
  N: {
    width_original: 2,
    width_a: 2,
    width_b: 2,
    height: 2,
    fuel_percent: 1,
  },
  T: {
    color_tex: '_',
    shape_tex: '_',
  },
};

const temp_material = new MeshStandardMaterial({
  color: 'white',
  roughness: 0.8,
  metalness: 0.8,
  flatShading: true,
});

export const FuelTankLayoutComponent = memo<ReactivePartComponentProps>(
  ({ address }) => {
    const initialState = getPartByAddress(address) as FuelTank;
    const mesh = useRef<Mesh>(null!);
    const selectionHandler = useSelectionHandler(
      address,
      'mesh',
    ) as UseMeshSelectionHandler;

    usePartUpdate(address, initialState, (state) => {
      mesh.current!.geometry = new CylinderGeometry(
        state.N.width_b / 2,
        state.N.width_a / 2,
        state.N.height,
        12,
        1,
        true,
        Math.PI / -2,
        Math.PI,
      );
    });
    usePartTransformations(address, initialState, mesh, (state) => {
      return (state as FuelTank).N.height / 2;
    });
    usePartMeta(address, initialState, mesh);

    return (
      <mesh
        ref={mesh}
        material={temp_material}
        position={[0, initialState.N.height / 2, 0]}
        onClick={selectionHandler}
      />
    );
  },
  compareAddressesProps,
);

export const FuelTankIcon = Icon;

export const FuelTankPropertyComponent: FC<PropertyComponentProps> = ({
  addresses,
}) => {
  const widthRef = useRef<HTMLInputElement>(null);
  const heightRef = useRef<HTMLInputElement>(null);
  const fuelRef = useRef<HTMLInputElement>(null);

  const { width, height, fuel } = getMutualSlice(
    (data) => ({
      width: data.N.width_original,
      height: data.N.height,
      fuel: data.N.fuel_percent,
    }),
    addresses.map((address) => getPartByAddress(address) as FuelTank),
  );

  useUnitInputController(widthRef, width, {
    min: 0,
    suffix: 'm',
    onChange: (value) =>
      // TODO: separate these
      setPartsByAddresses(addresses, {
        N: { width_original: value, width_a: value, width_b: value },
      }),
  });
  useUnitInputController(heightRef, height, {
    min: 0,
    suffix: 'm',
    onChange: (value) =>
      setPartsByAddresses(addresses, { N: { height: value } }),
  });
  useUnitInputController(fuelRef, (fuel ?? 1) * 100, {
    min: 0,
    max: 100, // remove max?
    suffix: '%',
    onChange: (value) =>
      setPartsByAddresses(addresses, { N: { fuel_percent: value / 100 } }),
  });

  return (
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>Fuel Tank</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.NamedInput ref={widthRef} label="W" />
        <PropertiesExplorer.NamedInput ref={heightRef} label="H" />
        <PropertiesExplorer.NamedInput ref={fuelRef} label="F" />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};

const FuelTankPart: PartModule = {
  isExportable: true,

  Icon: FuelTankIcon,
  PropertyComponent: FuelTankPropertyComponent,

  LayoutComponent: FuelTankLayoutComponent,

  data: FuelTankData,
};
export default FuelTankPart;
