import { tFileContent } from '../../../utils';

export type tProps = {
  accept: string;
  contentAction: (filename: string, value: tFileContent) => void;
  error: string;
};
