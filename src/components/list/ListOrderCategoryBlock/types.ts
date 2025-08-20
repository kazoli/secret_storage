import { Dispatch, SetStateAction } from 'react';
import { tStorageInitialState } from '../../../utils';

export type tProps = {
  visible: boolean;
  categories: tStorageInitialState['categories'];
  setCategories: Dispatch<SetStateAction<tStorageInitialState['categories']>>;
};
