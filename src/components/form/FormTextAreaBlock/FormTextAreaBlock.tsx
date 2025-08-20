import TextareaAutosize from 'react-textarea-autosize';

import ErrorMessage from '../../general/ErrorMessage';
import FormLabel from '../FormLabel';
import { tProps } from './types';

const FormTextAreaBlock = (props: tProps) => {
  return (
    <div
      className={`flex flex-wrap first-of-type:mt-0 mt-[15px] ${
        props.blockStyle ?? ''
      }`}
    >
      {props.label && (
        <FormLabel
          id={props.id}
          labelStyle={props.labelStyle}
          label={props.label}
        />
      )}
      <TextareaAutosize
        className={`w-[100%] rounded-[3px] shadow-[0_0_0_1px_#d0d0d0] focus:shadow-[inset_0_0_0_1px_#d0d0d0,0_0_3px_0_#c0c0c0] rounded-[2px] p-[5px] ${
          props.textareaStyle ?? ''
        }`}
        placeholder={props.placeholder}
        minLength={props.minLength}
        maxLength={props.maxLength}
        onKeyDown={(e) =>
          props.preventEnter && e.key === 'Enter' && e.preventDefault()
        }
        onChange={(e) => props.action(e.target.value)}
        value={props.value}
      />
      <ErrorMessage
        text={props.error}
        style={`w-full ${props.errorStyle ?? ''}`}
      />
    </div>
  );
};

export default FormTextAreaBlock;
