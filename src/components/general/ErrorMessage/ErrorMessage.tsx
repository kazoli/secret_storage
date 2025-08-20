import { tProps } from './types';

const ErrorMessage = (props: tProps) => {
  return (
    props.text && (
      <div className={`text-[#ff0000] ${props.style ?? ''}`}>{props.text}</div>
    )
  );
};

export default ErrorMessage;
