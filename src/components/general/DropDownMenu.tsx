import { useEffect, useState, useRef } from 'react';
import { tDropDownOption } from '../../app/general/types';

type tProps = {
  classContainer: string;
  classTrigger: string;
  classList: string;
  classElement: string;
  selected: string | JSX.Element;
  options: tDropDownOption[];
  action: (value: tDropDownOption['key']) => void;
};

function DropDownMenu(props: tProps) {
  const [showDropDown, setShowDropDown] = useState(false);
  const dropDownRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // close dropdown when clicking anywhere outside trigger button
    const clickOutside = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };
    // add event listener when the component mounts
    document.addEventListener('click', clickOutside);
    // clean up the event listener when the component unmounts
    return () => document.removeEventListener('click', clickOutside);
  }, []);

  return (
    <div className={`relative ${props.classContainer}`}>
      <button
        ref={dropDownRef}
        className={`block ${props.classTrigger}`}
        onClick={() => setShowDropDown(!showDropDown)}
      >
        {props.selected}
      </button>
      <ul
        className={`${
          showDropDown ? '' : 'hidden'
        } absolute scroll-bar max-h-[50vh] overflow-y-auto z-[2] ${
          props.classList
        }`}
      >
        {props.options.map((element) => (
          <li
            key={element.key}
            className={`bg-[#fff] ${props.classElement}`}
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
