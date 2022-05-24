import { getPart, mutateParts, subscribeToPart } from 'core/part';
import { Part } from 'game/parts/Part';
import { merge } from 'lodash';
import { useEffect, useRef } from 'react';
import DeepPartial from 'types/DeepPartial';
import { UUID } from 'types/Parts';
import fallingEdgeDebounce from 'utilities/fallingEdgeDebounce';
import useUnitInputController, {
  UseUnitInputControllerOptions,
} from './useUnitInputController';

const DEBOUNCE_TIME = 250;

const usePropertyController = (
  IDs: UUID[],
  get: (state: Part) => number,
  set: (value: number) => DeepPartial<Part>,
  controllerOptions?: Partial<UseUnitInputControllerOptions>,
) => {
  const mergedControllerOptions = {
    ...useUnitInputController,
    ...controllerOptions,
    onChange: (value) => {
      mutateParts(IDs, (draft) => {
        merge(draft, set(value));
      });
    },
  } as UseUnitInputControllerOptions;
  const inputRef = useRef<HTMLInputElement>(null!);
  const inputController = useUnitInputController(
    inputRef,
    undefined,
    mergedControllerOptions,
  );
  let unsubscribeFunctions: (() => void)[] = [];
  let values = new Map<UUID, number>();

  const initialize = () => {
    IDs.forEach((ID) => {
      const part = getPart(ID);

      if (part) {
        const property = get(part as Part);
        values.set(ID, property);

        const unsubscribe = subscribeToPart(
          ID,
          (newValue) => update(ID, newValue as number),
          (part) => get(part as Part),
        );

        unsubscribeFunctions.push(unsubscribe);
      }
    });

    rerender();
  };
  const rerender = () => {
    Array.from(values).some(([ID, value], index) => {
      if (index === 0) {
        inputController.value = value;
      } else {
        if (inputController.value !== value) {
          inputController.value = undefined;
          return true;
        }
      }

      return false;
    });

    inputController.rerender();
  };
  const debouncedRerender = fallingEdgeDebounce(rerender, DEBOUNCE_TIME);
  const update = (ID: UUID, value: number) => {
    values.set(ID, value);
    debouncedRerender();
  };

  initialize();

  useEffect(() => {
    return () => {
      unsubscribeFunctions.forEach((unsubscription) => unsubscription());
    };
  }, []);

  return inputRef;
};
export default usePropertyController;
