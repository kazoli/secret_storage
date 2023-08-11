type tProps = {
  text: string;
  action: () => void;
};

function ListFilterButton(props: tProps) {
  return (
    <button className="list-element button" onClick={props.action}>
      {props.text}
    </button>
  );
}

export default ListFilterButton;
