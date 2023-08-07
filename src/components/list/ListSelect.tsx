import { useMemo } from 'react';
import { tDropDownOption } from '../../app/general/types';
import DropDownMenu from '../general/DropDownMenu';
import DropDownSelector from '../general/DropDownSelector';

type tSelect = {
  selected: tDropDownOption['value'];
  options: tDropDownOption[];
};

type tProps = {
  selected: tDropDownOption['key'];
  options: tDropDownOption[];
  action: (value: tDropDownOption['key']) => void;
};

function ListSelect(props: tProps) {
  const select = useMemo(() => {
    const selectData: tSelect = { selected: '', options: [] };
    props.options.forEach((option) => {
      if (option.key === props.selected) {
        // add selected element value
        selectData.selected = option.value;
      } else {
        // push unselected option to options
        selectData.options.push(option);
      }
    });
    if (!selectData.selected) {
      // select first option if empty or wrong selected value was sent
      selectData.selected = props.options[0].value;
      // drop the first option from list
      selectData.options.shift();
    }
    return selectData;
  }, [props.options, props.selected]);

  return (
    <DropDownMenu
      selector={<DropDownSelector selected={select.selected} />}
      classContainer="list-element items-start"
      classList="left-0 mt-[35px] whitespace-nowrap"
      classElement="transition-custom block cursor-pointer mt-[5px] p-[10px] bg-[#fff] shadow-[inset_0_0_5px_0_#fff,0_0_0_1px_#d0d0d0] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] rounded-[3px]"
      options={select.options}
      action={props.action}
    />
  );
}

export default ListSelect;
