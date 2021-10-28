import { FunctionComponent } from 'react';
import { listing, type as rootType } from './root';

export type type = rootType & {
  text: string;
  action: Function;
  icon?: FunctionComponent;
};
