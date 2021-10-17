import { FC, SyntheticEvent, useRef } from 'react';
import { ReactComponent as DeleteIcon } from '../../assets/icons/delete.svg';
import { ReactComponent as EyeIcon } from '../../assets/icons/eye.svg';
import { ReactComponent as FuelTankIcon } from '../../assets/icons/fuel-tank.svg';
import { ReactComponent as NoEyeIcon } from '../../assets/icons/no-eye.svg';
import { type as rootPartType } from '../../utilities/parts/Root';
import UnitTextInput from '../UnitTextInput';
import './index.scss';

const listingIcons = {
  'Fuel Tank': <FuelTankIcon />,
};

interface IContainer {
  rightSide?: boolean;
}
const Container: FC<IContainer> = ({ children, rightSide }) => {
  return (
    <div
      className={`
        explorer-container
        ${rightSide ? 'right-side' : 'left-side'}
      `}
    >
      {children}
    </div>
  );
};

const TabsContainer: FC = ({ children }) => (
  <div className="explorer-tabs-container">{children}</div>
);

interface IPartsListingContainer {
  parts: Array<rootPartType>;
  onPartDataMutate: Function;
  onPartDelete: Function;
}
const PartsListingContainer: FC<IPartsListingContainer> = ({
  children,
  parts,
  onPartDataMutate,
  onPartDelete,
}) => {
  const parsedArray = parts?.map((partData, index) => {
    return (
      <PartListing
        icon={(listingIcons as any)?.[partData.n] || <EyeIcon />}
        defaultName={
          partData?.['.stellar']?.label || 'Internally Unlabeled Part'
        }
        visible={partData['.stellar'].visible}
        onEyeClick={() => {
          onPartDataMutate(index, {
            ...partData,
            '.stellar': { visible: !partData['.stellar'].visible },
          });
        }}
        onDeleteClick={() => onPartDelete(index)}
        onLabelChange={(label: boolean) => {
          onPartDataMutate(index, {
            ...partData,
            '.stellar': { label: label },
          });
        }}
      />
    );
  });

  return (
    <div className="explorer-listing-container">
      {parts ? parsedArray : children}
    </div>
  );
};

interface IPartListing {
  icon: Object;
  defaultName: string;
  visible: boolean;
  onEyeClick: Function;
  onDeleteClick: Function;
  onLabelChange: Function;
}
const PartListing: FC<IPartListing> = ({
  icon,
  defaultName,
  visible,
  onEyeClick,
  onDeleteClick,
  onLabelChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  let preLabel = defaultName;

  return (
    <button className="explorer-part-listing">
      {/* icon */}
      {icon}

      {/* text */}
      <input
        className="explorer-part-listing-input"
        defaultValue={defaultName}
        ref={inputRef}
        onBlur={() => {
          if (preLabel !== inputRef.current?.value) {
            onLabelChange(inputRef.current?.value);
            preLabel = inputRef.current?.value!;
          }
        }}
      />

      <DeleteIcon
        onClick={() => {
          if (onDeleteClick) onDeleteClick();
        }}
        className="explorer-part-listing-icon"
      />
      {visible ? (
        <EyeIcon
          onClick={() => onEyeClick()}
          className="explorer-part-listing-icon"
        />
      ) : (
        <NoEyeIcon
          onClick={() => onEyeClick()}
          className="explorer-part-listing-icon"
        />
      )}
    </button>
  );
};

interface IPropertyListing {
  subProperties?: Array<Object>;
}
const PropertyListing: FC<IPropertyListing> = ({ children, subProperties }) => {
  return (
    <div className="explorer-property-listing">
      {/* text */}
      {children}

      <div className="explorer-property-listing-sub-properties-container">
        {/* sub properties */}
        {subProperties?.map((component) => component)}
      </div>
    </div>
  );
};

interface ITab {
  defaultSelected?: boolean;
}
const Tab: FC<ITab> = ({ children, defaultSelected }) => {
  // let for now, react state hook in the future
  let selected = defaultSelected;
  return (
    <button
      className={`
        explorer-tab
        ${selected ? 'selected' : ''}
      `}
    >
      {children}
    </button>
  );
};

const StaticTab: FC<ITab> = ({ children }) => (
  <div className="explorer-static-tab">{children}</div>
);

interface ISubPropertyTextInput {
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
  name?: string;
}
const SubPropertyTextInput: FC<ISubPropertyTextInput> = ({
  children,
  defaultValue,
  prefix,
  suffix,
  name,
}) => {
  return (
    <div className="explorer-sub-property-text-input">
      <span>{name || children}</span>
      <UnitTextInput
        defaultValue={defaultValue}
        suffix={suffix}
        prefix={prefix}
      />
    </div>
  );
};

export default Object.assign({
  Container,
  TabsContainer,
  PartsListingContainer,

  Tab,
  StaticTab,

  PartListing,
  PropertyListing,

  SubPropertyTextInput,
});
