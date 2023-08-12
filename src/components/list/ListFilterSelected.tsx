import { AiOutlineDown } from 'react-icons/ai';
import { tSelect } from '../../app/general/types';

type tProps = {
  selected: tSelect['selected'];
};

function ListFilterSelected(props: tProps) {
  return (
    <div className="flex gap-[5px] items-center">
      {props.selected}
      <AiOutlineDown className="icon-button" />
    </div>
  );
}

export default ListFilterSelected;
