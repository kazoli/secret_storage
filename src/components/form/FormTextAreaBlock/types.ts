export type tProps = {
  id: string;
  value: string;
  action: (value: string) => void;
  error: string;
  blockStyle?: string;
  labelStyle?: string;
  textareaStyle?: string;
  errorStyle?: string;
  label?: string;
  placeholder?: string;
  minLength?: number;
  maxLength?: number;
  preventEnter?: boolean;
};
