import { AiOutlineDown } from 'react-icons/ai';

import { tProps } from './types';

const ListFilterSelected = (props: tProps) => {
  return (
    <div className="flex gap-[5px] items-center">
      {props.selected}
      <AiOutlineDown className="icon-button" />
    </div>
  );
};

export default ListFilterSelected;
