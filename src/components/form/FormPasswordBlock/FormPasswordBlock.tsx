import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import FormInputBlock from '../FormInputBlock';
import { tProps } from './types';

const FormPasswordBlock = (props: tProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <FormInputBlock
      inputStyle="pr-[2rem]"
      type={visible ? 'text' : 'password'}
      label={props.label}
      labelStyle={props.labelStyle}
      id={props.id}
      placeholder={props.placeholder}
      autocomplete="off"
      onPaste={false}
      value={props.password}
      action={(value) => props.action(value)}
      error={props.passwordError}
      rightIcon={
        visible ? (
          <AiOutlineEye
            className="password-icon"
            onClick={() => setVisible(!visible)}
          />
        ) : (
          <AiOutlineEyeInvisible
            className="password-icon"
            onClick={() => setVisible(!visible)}
          />
        )
      }
    />
  );
};

export default FormPasswordBlock;
