import FormLabel from './FormLabel';
import ErrorMessage from '../general/ErrorMessage';

type tProps = {
  blockStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  errorStyle?: string;
  label?: string;
  rightIcon?: JSX.Element;
  placeholder?: string;
  autocomplete?: string;
  onPaste?: boolean;
  id: string;
  type: 'text' | 'password';
  value: string;
  action: (value: string) => void;
  error: string;
};

function FormInputBlock(props: tProps) {
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
      <div className="relative flex-[1_1_auto]">
        <input
          className={`w-[100%] rounded-[3px] border border-[#d0d0d0] focus:shadow-[0_0_3px_0_#d0d0d0] rounded-[2px] p-[5px] ${
            props.inputStyle ?? ''
          }`}
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          autoComplete={props.autocomplete}
          onPaste={(e) => {
            props.onPaste === false ? e.preventDefault() : e;
          }}
          onChange={(event) => props.action(event.target.value)}
        />
        {props.rightIcon}
      </div>
      <ErrorMessage
        text={props.error}
        style={`w-full ${props.errorStyle ?? ''}`}
      />
    </div>
  );
}

export default FormInputBlock;
