import { tDropDownOption } from '../../app/general/types';
import { useSelectData } from '../../app/general/hooks';
import DropDownMenu from '../general/DropDownMenu';
import DropDownSelector from '../general/DropDownSelector';

type tProps = {
  selected: tDropDownOption['key'];
  options: tDropDownOption[];
  action: (value: tDropDownOption['key']) => void;
};

function ListFilterSelect(props: tProps) {
  const selectData = useSelectData(props.options, props.selected);

  return (
    <DropDownMenu
      selector={<DropDownSelector selected={selectData.selected} />}
      classContainer="list-element items-start"
      classList="left-0 mt-[35px] whitespace-nowrap"
      classElement="transition-custom block cursor-pointer mt-[5px] p-[10px] bg-[#fff] shadow-[inset_0_0_5px_0_#fff,0_0_0_1px_#d0d0d0] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] rounded-[3px]"
      options={selectData.options}
      action={props.action}
    />
  );
}

export default ListFilterSelect;
