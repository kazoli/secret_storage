import { Dispatch, ReactNode } from 'react';
import {
  tStorageActions,
  tStorageInitialState,
} from '../../utils/storage/storageTypes';

// Type of props
export type tProps = {
  children: ReactNode;
};

// Type of context
export type tContext = {
  storageState: tStorageInitialState;
  storageDispatch: Dispatch<tStorageActions>;
};
