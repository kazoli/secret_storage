import { useState } from 'react';
import { useIntl } from 'react-intl';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import { defaultMessages } from '../../../providers/TranslationProvider';
import FormInputBlock from '../FormInputBlock';
import { tProps } from './types';

const FormPasswordBlock = (props: tProps) => {
  const translate = useIntl().formatMessage;

  const [visible, setVisible] = useState(false);

  return (
    <FormInputBlock
      id={props.id}
      type={visible ? 'text' : 'password'}
      inputStyle="pr-[2rem]"
      label={props.label}
      labelStyle={props.labelStyle}
      placeholder={props.placeholder}
      autocomplete="off"
      onPaste={false}
      value={props.password}
      action={(value) => props.action(value)}
      error={props.passwordError}
      rightIcon={
        visible ? (
          <AiOutlineEyeInvisible
            className="password-icon"
            onClick={() => setVisible(!visible)}
            title={translate(defaultMessages.common.passwordUnreadableIcon)}
          />
        ) : (
          <AiOutlineEye
            className="password-icon"
            onClick={() => setVisible(!visible)}
            title={translate(defaultMessages.common.passwordReadableIcon)}
          />
        )
      }
    />
  );
};

export default FormPasswordBlock;
