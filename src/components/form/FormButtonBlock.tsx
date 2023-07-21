import { tButtonBlock } from '../../app/general/types';

type tProps = {
  blockStyle?: string;
  buttons: tButtonBlock;
};

function FormButtonBlock(props: tProps) {
  return (
    <div className={`flex flex-wrap gap-[10px] mt-[15px] ${props.blockStyle}`}>
      {props.buttons.map((button, index) => (
        <button
          key={index}
          onClick={button.action}
          className="transition-custom cursor-pointer p-[5px_10px] bg-[#fff] shadow-[inset_0_0_3px_1px_#909090] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] rounded-[3px]"
        >
          {button.text}
        </button>
      ))}
    </div>
  );
}

export default FormButtonBlock;
