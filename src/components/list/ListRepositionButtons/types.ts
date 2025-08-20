import { tReposition } from '../../../utils';

export type tProps = {
  dataId: string;
  selectedId: string | false;
  selectAction: (selectedId: tReposition['id'] | false) => void;
  repositionAction: (position: tReposition['position']) => void;
};
