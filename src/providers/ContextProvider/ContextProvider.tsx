import { Context, useGetContextValues } from './utils';
import { tProps } from './types';

// Context provider
const ContextProvider = (props: tProps) => {
  const values = useGetContextValues();
  return <Context.Provider value={values}>{props.children}</Context.Provider>;
};

export default ContextProvider;
