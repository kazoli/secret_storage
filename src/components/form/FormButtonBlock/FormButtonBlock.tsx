import { tProps } from './types';

const FormButtonBlock = (props: tProps) => {
  return (
    <div
      className={`flex flex-wrap gap-[10px] mt-[15px] ${
        props.blockStyle ?? ''
      }`}
    >
      {props.buttons.map((button, index) => (
        <button key={index} onClick={button.action} className="form-button">
          {button.text}
        </button>
      ))}
    </div>
  );
};

export default FormButtonBlock;
