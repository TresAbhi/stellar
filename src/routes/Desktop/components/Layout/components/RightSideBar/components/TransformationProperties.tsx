import * as PropertiesExplorer from 'components/PropertiesExplorer';
import usePropertyController from 'hooks/usePropertyController';
import { PartWithTransformations } from 'parts/Default';
import { FC } from 'react';
import { PropertyComponentProps } from 'types/Parts';

const TransformationProperties: FC<PropertyComponentProps> = ({
  addresses,
}) => {
  const xPos = usePropertyController<PartWithTransformations>(
    addresses,
    (state) => state.p.x,
    (value) => ({ p: { x: value } }),
    { suffix: 'm' },
  );
  const yPos = usePropertyController<PartWithTransformations>(
    addresses,
    (state) => state.p.y,
    (value) => ({ p: { y: value } }),
    { suffix: 'm' },
  );
  const rot = usePropertyController<PartWithTransformations>(
    addresses,
    (state) => state.o.z,
    (value) => ({ o: { z: value } }),
    { modOnClamp: true, max: 360, suffix: '°' },
  );
  const xScale = usePropertyController<PartWithTransformations>(
    addresses,
    (state) => state.o.x,
    (value) => ({ o: { x: value } }),
    { min: 0, suffix: 'x' },
  );
  const yScale = usePropertyController<PartWithTransformations>(
    addresses,
    (state) => state.o.y,
    (value) => ({ o: { y: value } }),
    { min: 0, suffix: 'x' },
  );

  return (
    <PropertiesExplorer.Group>
      <PropertiesExplorer.Title>Transformations</PropertiesExplorer.Title>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.NamedInput ref={xPos} label="X" />
        <PropertiesExplorer.NamedInput ref={yPos} label="Y" />
        <PropertiesExplorer.NamedInput ref={rot} label="R" />
      </PropertiesExplorer.Row>
      <PropertiesExplorer.Row>
        <PropertiesExplorer.NamedInput ref={xScale} label="W" />
        <PropertiesExplorer.NamedInput ref={yScale} label="H" />
      </PropertiesExplorer.Row>
    </PropertiesExplorer.Group>
  );
};
export default TransformationProperties;