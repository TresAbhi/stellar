import { GroupProps } from '@react-three/fiber';
import { Group as GroupPart } from 'game/parts/Group';
import { getPart } from 'interfaces/blueprint';
import { getPartLayoutComponent } from 'interfaces/part';
import { forwardRef } from 'react';
import blueprintStore from 'stores/blueprint';
import { Group } from 'three';
import { UUID } from 'types/Parts';
import comparePartOrders from 'utilities/comparePartOrders';

interface PartClusterProps extends GroupProps {
  parentID?: UUID;
}
const PartCluster = forwardRef<Group, PartClusterProps>(
  ({ parentID, ...props }, ref) => {
    const state = blueprintStore(
      (state) =>
        (parentID ? (getPart(parentID, state) as GroupPart) : state).partOrder,
      comparePartOrders,
    );
    let partListing: JSX.Element[] = [];

    state.forEach((ID) => {
      const part = getPart(ID);

      if (part) {
        const LayoutComponent = getPartLayoutComponent(part.n);

        if (LayoutComponent) {
          partListing.push(<LayoutComponent ID={ID} key={`part-${ID}`} />);
        }
      }
    });

    return (
      <group {...props} ref={ref}>
        {partListing}
      </group>
    );
  },
);
export default PartCluster;
