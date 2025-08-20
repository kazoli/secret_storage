import { RiArrowDropDownLine } from 'react-icons/ri';

import { tProps } from './types';

const FormSelected = (props: tProps) => {
  return (
    <div className="flex gap-[5px] items-center justify-between">
      {props.selected}
      <RiArrowDropDownLine className="text-[1.5rem] shrink-0" />
    </div>
  );
};

export default FormSelected;
