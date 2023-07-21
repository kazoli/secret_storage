import { tDropDownOption } from '../../app/general/types';

type tProps = {
  classContainer: string;
  classList: string;
  classElement: string;
  selector: string | JSX.Element;
  options: tDropDownOption[];
  action: (value: tDropDownOption['key']) => void;
};

function DropDownMenu(props: tProps) {
  return (
    <div className={props.classContainer}>
      <button className="block w-[100%] peer">{props.selector}</button>
      <ul
        className={`${props.classList} peer-focus:block active:block hidden absolute`}
      >
        {props.options.map((element) => (
          <li
            key={element.key}
            className={props.classElement}
            onClick={() => props.action(element.key)}
          >
            {element.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DropDownMenu;
