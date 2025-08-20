import { tProps } from './types';

const CommentBlock = (props: tProps) => {
  return (
    <div
      className={`p-[5px] bg-[#fff] shadow-[inset_0_0_4px_0_#9d81d0,0_0_0_1px_#9d81d0] rounded-[3px] ${
        props.style ?? ''
      }`}
    >
      {props.text}
    </div>
  );
};

export default CommentBlock;
