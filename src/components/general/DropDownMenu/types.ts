import { JSX } from 'react';
import { tDropDownOption } from '../../../utils';

export type tProps = {
  classContainer: string;
  classTrigger: string;
  classList: string;
  classElement: string;
  selected: string | JSX.Element;
  options: tDropDownOption[];
  action: (value: tDropDownOption['key']) => void;
};
