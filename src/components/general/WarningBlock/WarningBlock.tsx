import { tProps } from './types';

const WarningBlock = (props: tProps) => {
  return (
    <div
      className={`p-[5px] bg-[#fff] shadow-[inset_0_0_4px_0_#FFA000,0_0_0_1px_#FFA000] rounded-[3px] ${
        props.style ?? ''
      }`}
    >
      {props.text}
    </div>
  );
};

export default WarningBlock;
