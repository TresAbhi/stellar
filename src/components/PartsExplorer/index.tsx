import { ReactComponent as ArrowHeadDownIcon } from 'assets/icons/arrow-head-down.svg';
import { ReactComponent as ArrowHeadRightIcon } from 'assets/icons/arrow-head-right.svg';
import { ReactComponent as QuestionMarkIcon } from 'assets/icons/question-mark.svg';
import useSelectionHandler, {
  UseListingSelectionHandler,
} from 'hooks/useSelectionHandler';
import { getPart, mutatePart, subscribeToPart } from 'interfaces/blueprint';
import { getPartModule } from 'interfaces/part';
import { PartWithMeta } from 'parts/Default';
import {
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  memo,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import blueprintStore from 'stores/blueprint';
import { PartID } from 'types/Parts';
import compareIDArrays from 'utilities/compareIDArrays';
import compareIDProps from 'utilities/compareIDProps';
import styles from './index.module.scss';

export const Container: FC<InputHTMLAttributes<HTMLDivElement>> = ({
  ...props
}) => {
  const state = blueprintStore((state) => state.partOrder, compareIDArrays);

  const partListings = state.map((ID) => (
    <Listing key={`part-${ID}`} ID={ID} indentation={0} />
  ));

  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['parts-explorer']}`}
    >
      {partListings}
    </div>
  );
};

interface ListingProps {
  indentation: number;
  ID: PartID;
}
export const Listing = memo<ListingProps>(({ indentation, ID }) => {
  const [expanded, setExpanded] = useState(false);
  const listingRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialState = getPart(ID);

  useEffect(() => {
    subscribeToPart(
      ID,
      (selected) => {
        if (selected) {
          listingRef.current?.classList.add(styles.selected);
        } else {
          listingRef.current?.classList.remove(styles.selected);
        }
      },
      (state: PartWithMeta) => state.meta.selected,
      { unsubscribeOnUnmount: true },
    );
  }, [ID]);

  const selectionHandler = useSelectionHandler(
    ID,
    'listing',
  ) as UseListingSelectionHandler;

  // part was deleted
  if (!initialState) return null;

  let childParts: JSX.Element[] | undefined;
  const handleExpandClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setExpanded((state) => !state);
  };
  const handleExpandMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    if (initialState.n === 'Group') event.preventDefault();
  };
  const handleLabelMouseDown = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    buttonRef.current?.focus();
  };
  const handleLabelDoubleClick = () => {
    inputRef.current?.focus();
    inputRef.current?.select();
  };
  const handleLabelBlur = () => {
    if (inputRef.current)
      inputRef.current.value = inputRef.current.value.trim();
    mutatePart(ID, { meta: { label: inputRef.current?.value } });
  };
  const handleLabelKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') buttonRef.current?.focus();
  };

  let Icon = getPartModule(initialState.n, true).Icon;

  if (initialState.n === 'Group') {
    childParts = initialState.partOrder.map((part) => {
      return (
        <Listing key={`part-${ID}`} ID={ID} indentation={indentation + 1} />
      );
    });
  }

  return (
    <div ref={listingRef} tabIndex={-1} className={styles.listing}>
      <div
        className={styles.button}
        style={{ paddingLeft: `${16 * indentation}px` }}
        onClick={selectionHandler}
      >
        <button
          ref={buttonRef}
          onClick={handleExpandClick}
          onMouseDown={handleExpandMouseDown}
          className={styles.expand}
        >
          {initialState.n === 'Group' ? (
            expanded ? (
              <ArrowHeadDownIcon className={styles['expand-icon']} />
            ) : (
              <ArrowHeadRightIcon className={styles['expand-icon']} />
            )
          ) : undefined}
        </button>

        <div className={styles['icon-holder']}>
          {Icon ? (
            <Icon className={styles.icon} />
          ) : (
            <QuestionMarkIcon className={styles.icon} />
          )}
        </div>

        <input
          ref={inputRef}
          onMouseDown={handleLabelMouseDown}
          onDoubleClick={handleLabelDoubleClick}
          onBlur={handleLabelBlur}
          onKeyPress={handleLabelKeyPress}
          className={styles.label}
          defaultValue={initialState.meta.label}
        />

        {/* visible */}
        {/* lock */}
      </div>

      {childParts ? (
        <Container style={{ display: expanded ? 'flex' : 'none' }}>
          {childParts}
        </Container>
      ) : undefined}
    </div>
  );
}, compareIDProps);
