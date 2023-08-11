type tProps = {
  action: () => void;
  id?: string;
  style?: string;
  text?: string;
  title?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
};

function IconButton(props: tProps) {
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
}

export default IconButton;
