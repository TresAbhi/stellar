import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { AnyPart, PartModule } from 'core/types/Parts';
import { memo } from 'react';
import { DefaultPartData, PartWithMeta } from './Default';

export interface GroupData extends PartWithMeta {
  n: 'Group';
  parts: AnyPart[];
}

export const GroupData: GroupData = {
  meta: {
    ...DefaultPartData.meta,

    label: 'Group',
  },
  n: 'Group',
  parts: [],
};

const GroupLayoutComponent = memo(() => <mesh />);

export const GroupIcon = Icon;

const Group: PartModule = {
  data: GroupData,

  Icon: GroupIcon,
  LayoutComponent: GroupLayoutComponent,

  isExportable: false,
};
export default Group;
