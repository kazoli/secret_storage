import { tDropDownOption } from '../../../utils';

export type tProps = {
  selected: tDropDownOption['key'];
  options: tDropDownOption[];
  action: (value: tDropDownOption['key']) => void;
  labelStyle?: string;
  label?: string;
};
