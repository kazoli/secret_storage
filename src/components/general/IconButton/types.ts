import { JSX } from 'react';

export type tProps = {
  action: () => void;
  id?: string;
  style?: string;
  text?: string;
  title?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};
