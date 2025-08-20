import { tProps } from './types';

const ListFilterButton = (props: tProps) => {
  return (
    <button className="list-element button" onClick={props.action}>
      {props.text}
    </button>
  );
};

export default ListFilterButton;
