import { ReactComponent as Icon } from 'assets/icons/group.svg';
import { memo } from 'react';
import { AnyPart, PartModule } from 'types/Parts';
import compareAddressProps from 'utilities/compareAddressProps';
import { DefaultPartData, PartWithMeta } from './Default';

export interface Group extends PartWithMeta {
  n: 'Group';
  parts: AnyPart[];
}

export const GroupData: Group = {
  meta: {
    ...DefaultPartData.meta,

    label: 'Group',
  },
  n: 'Group',
  parts: [],
};

const GroupLayoutComponent = memo(() => <mesh />, compareAddressProps);

export const GroupIcon = Icon;

const GroupPart: PartModule = {
  data: GroupData,

  Icon: GroupIcon,
  LayoutComponent: GroupLayoutComponent,

  isExportable: false,
};
export default GroupPart;