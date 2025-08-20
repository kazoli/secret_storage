import { tFileContent } from '../../../utils';

export type tProps = {
  buttonText: string;
  defaultText: string;
  accept: string;
  contentAction: (filename: string, value: tFileContent) => void;
  error: string;
  blockStyle?: string;
  labelStyle?: string;
  fileBlockStyle?: string;
  errorStyle?: string;
  label?: string;
};
