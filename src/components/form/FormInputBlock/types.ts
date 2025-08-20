import { JSX } from 'react';

export type tProps = {
  id: string;
  type: 'text' | 'password';
  value: string;
  action: (value: string) => void;
  error: string;
  blockStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  errorStyle?: string;
  label?: string;
  rightIcon?: JSX.Element;
  placeholder?: string;
  autocomplete?: string;
  onPaste?: boolean;
};
