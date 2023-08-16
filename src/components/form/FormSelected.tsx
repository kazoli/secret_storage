import { RiArrowDropDownLine } from 'react-icons/ri';
import { tSelect } from '../../app/general/types';

type tProps = {
  selected: tSelect['selected'];
};

function FormSelected(props: tProps) {
  return (
    <div className="flex gap-[5px] items-center justify-between">
      {props.selected}
      <RiArrowDropDownLine className="text-[1.5rem] shrink-0" />
    </div>
  );
}

export default FormSelected;
