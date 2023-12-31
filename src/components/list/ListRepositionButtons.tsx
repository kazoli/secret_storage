import { useState, useEffect } from 'react';
import { tReposition } from '../../app/general/types';
import { BsArrowsMove } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { VscDebugStepBack, VscDebugStepOver } from 'react-icons/vsc';
import IconButton from '../general/IconButton';

type tProps = {
  dataId: string;
  selectedId: string | false;
  selectAction: (selectedId: tReposition['id'] | false) => void;
  repositionAction: (position: tReposition['position']) => void;
};

function ListRepositionButtons(props: tProps) {
  const [buttons, setButtons] = useState<JSX.Element>();

  useEffect(() => {
    if (props.selectedId === false) {
      setButtons(
        <IconButton
          style="hover"
          title="Reposition"
          leftIcon={<BsArrowsMove />}
          action={() => props.selectAction(props.dataId)}
        />,
      );
    } else if (props.selectedId === props.dataId) {
      setButtons(
        <IconButton
          style="hover"
          title="Cancel reposition"
          leftIcon={<FcCancel />}
          action={() => props.selectAction(false)}
        />,
      );
    } else {
      setButtons(
        <>
          <IconButton
            style="hover"
            title="Insert before this"
            leftIcon={<VscDebugStepBack />}
            action={() => props.repositionAction('before')}
          />
          <IconButton
            style="hover"
            title="Insert after this"
            leftIcon={<VscDebugStepOver />}
            action={() => props.repositionAction('after')}
          />
        </>,
      );
    }
  }, [props]);

  return buttons;
}

export default ListRepositionButtons;
