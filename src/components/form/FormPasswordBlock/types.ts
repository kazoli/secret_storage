export type tProps = {
  id: string;
  password: string;
  passwordError: string;
  action: (value: string) => void;
  labelStyle?: string;
  label?: string;
  placeholder?: string;
};
