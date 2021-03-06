import { merge } from 'lodash';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface UseSettings {
  debug: {
    dev_blueprint?: string;
    error_logs: boolean;
  };

  performance: {
    regress_amount: number;
  };

  layout: {
    leftSideBar: {
      visible: boolean;
      partition: 'parts' | 'snippets';
    };

    rightSideBar: {
      visible: boolean;
      partition: 'properties' | 'inspect';
      scaleConstrained: boolean;
    };
  };

  language: string;
}

export const UseSettingsData: UseSettings = {
  debug: {
    error_logs: false,
  },

  performance: {
    regress_amount: 1,
  },

  layout: {
    leftSideBar: {
      visible: true,
      partition: 'parts',
    },

    rightSideBar: {
      visible: true,
      partition: 'properties',
      scaleConstrained: false,
    },
  },

  language: 'en-US',
};

const useSettings = create<UseSettings>(
  persist(() => UseSettingsData, {
    name: 'settings',
    merge: (persistedState, currentState) =>
      merge(currentState, persistedState),
  }),
);
export default useSettings;
