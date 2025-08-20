import { tProps } from './types';

const IconButton = (props: tProps) => {
  return (
    <button
      id={props.id}
      className={`icon-button ${props.style ?? ''}`}
      title={props.title}
      onClick={props.action}
    >
      {props.leftIcon}
      {props.text}
      {props.rightIcon}
    </button>
  );
};

export default IconButton;
