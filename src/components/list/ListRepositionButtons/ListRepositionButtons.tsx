import { JSX, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { BsArrowsMove } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';
import { VscDebugStepBack, VscDebugStepOver } from 'react-icons/vsc';

import { defaultMessages } from '../../../providers/TranslationProvider';

import IconButton from '../../general/IconButton';

import { tProps } from './types';

const ListRepositionButtons = (props: tProps) => {
  const translate = useIntl().formatMessage;

  const [buttons, setButtons] = useState<JSX.Element>();

  useEffect(() => {
    if (props.selectedId === false) {
      setButtons(
        <IconButton
          style="hover"
          title={translate(defaultMessages.list.repositionButton)}
          leftIcon={<BsArrowsMove />}
          action={() => props.selectAction(props.dataId)}
        />,
      );
    } else if (props.selectedId === props.dataId) {
      setButtons(
        <IconButton
          style="hover"
          title={translate(defaultMessages.list.repositionCancelButton)}
          leftIcon={<FcCancel />}
          action={() => props.selectAction(false)}
        />,
      );
    } else {
      setButtons(
        <>
          <IconButton
            style="hover"
            title={translate(defaultMessages.list.insertBeforeButton)}
            leftIcon={<VscDebugStepBack />}
            action={() => props.repositionAction('before')}
          />
          <IconButton
            style="hover"
            title={translate(defaultMessages.list.insertAfterButton)}
            leftIcon={<VscDebugStepOver />}
            action={() => props.repositionAction('after')}
          />
        </>,
      );
    }
  }, [props]);

  return buttons;
};

export default ListRepositionButtons;
