import { Dispatch, SetStateAction } from 'react';
import { tStorageInitialState } from '../../../utils';

export type tProps = {
  categories: tStorageInitialState['categories'];
  setCategories: Dispatch<SetStateAction<tStorageInitialState['categories']>>;
};
