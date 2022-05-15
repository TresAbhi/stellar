import * as PropertiesExplorer from 'components/PropertiesExplorer';
import { getPartRegistry } from 'core/part';
import useBlueprint from 'hooks/useBlueprint';
import usePart from 'hooks/usePart';
import { isUndefined } from 'lodash';
import { Box2 } from 'three';

const InspectViewer = () => {
  const selections = useBlueprint((state) => state.selections);
  const ID = selections[0];
  const part = usePart(ID); // TODO: this is reactive, but we need to make it not reactive
  const computeBoundingBox = part
    ? getPartRegistry(part.n)?.computeBoundingBox
    : undefined;
  const boundingBox = computeBoundingBox
    ? computeBoundingBox(part!) // TODO: is this "!" going to be a problem?
    : new Box2();

  return part && selections.length === 1 ? (
    <PropertiesExplorer.Container>
      {/* <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>JSON</PropertiesExplorer.Title>
        <PropertiesExplorer.Title>
          eh, imma do this part later
        </PropertiesExplorer.Title>
      </PropertiesExplorer.Group> */}
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>Internal Data</PropertiesExplorer.Title>
        <PropertiesExplorer.Property
          type="wide"
          label="ID"
          value={ID}
          copyable
        />
        <PropertiesExplorer.Property
          type="wide"
          label="Parent ID"
          value={`${part.parentID}`}
          copyable={!isUndefined(part.parentID)}
        />
      </PropertiesExplorer.Group>
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>Meta Data</PropertiesExplorer.Title>
        <PropertiesExplorer.Property label="Name" value={part.n} />
        <PropertiesExplorer.Property label="Locked" value={`${part.locked}`} />
        <PropertiesExplorer.Property label="Hidden" value={`${part.hidden}`} />
      </PropertiesExplorer.Group>
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>Bounding Box</PropertiesExplorer.Title>
        <PropertiesExplorer.Property
          label="Min X"
          value={`${boundingBox.min.x}`}
        />
        <PropertiesExplorer.Property
          label="Min Y"
          value={`${boundingBox.min.y}`}
        />
        <PropertiesExplorer.Property
          label="Max X"
          value={`${boundingBox.max.x}`}
        />
        <PropertiesExplorer.Property
          label="Max Y"
          value={`${boundingBox.max.y}`}
        />
      </PropertiesExplorer.Group>
    </PropertiesExplorer.Container>
  ) : (
    <PropertiesExplorer.Container>
      <PropertiesExplorer.Group>
        <PropertiesExplorer.Title>
          {selections.length > 1 ? '>1 Selections' : 'No Selections'}
        </PropertiesExplorer.Title>
      </PropertiesExplorer.Group>
    </PropertiesExplorer.Container>
  );
};
export default InspectViewer;
