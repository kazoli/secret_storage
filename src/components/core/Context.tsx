import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  useReducer,
} from 'react';
import {
  tStorageActions,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { storageInitialState } from '../../app/storage/storageInitialStates';
import { storageReducer } from '../../app/storage/storageReducer';

// Type of context
type tContext = {
  storageState: tStorageInitialState;
  storageDispatch: Dispatch<tStorageActions>;
};

// Type of props
type tProps = {
  children: ReactNode;
};

// Initial state of context
const contextInitialState = {} as tContext;

// Create context
const Context = createContext(contextInitialState);

// Context custom hook
function useAppContext() {
  return useContext(Context);
}

// Context provider
function ContextProvider(props: tProps) {
  // get state and dipatch from storage reducer
  const [storageState, storageDispatch] = useReducer(
    storageReducer,
    storageInitialState,
  );

  return (
    <Context.Provider value={{ storageState, storageDispatch }}>
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, useAppContext };
