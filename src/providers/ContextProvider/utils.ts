import { createContext, useContext, useReducer } from 'react';
import { tContext } from './types';
import { storageInitialState, storageReducer } from '../../utils';

// Create context
export const Context = createContext({} as tContext);

// Get context values custom hook
export const useGetContextValues = () => {
  // storage reducer
  const [storageState, storageDispatch] = useReducer(
    storageReducer,
    storageInitialState,
  );
  return { storageState, storageDispatch };
};

// Context custom hook
export const useAppContext = () => useContext(Context);
