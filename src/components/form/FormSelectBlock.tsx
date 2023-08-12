import { useSelectData } from '../../app/general/hooks';
import { tDropDownOption } from '../../app/general/types';
import DropDownMenu from '../general/DropDownMenu';
import FormLabel from './FormLabel';
import FormSelected from './FormSelected';

type tProps = {
  label?: string;
  labelStyle?: string;
  selected: tDropDownOption['key'];
  options: tDropDownOption[];
  action: (value: tDropDownOption['key']) => void;
};

function FormSelectBlock(props: tProps) {
  const selectData = useSelectData(props.options, props.selected);

  return (
    <>
      {props.label && (
        <FormLabel id="" labelStyle={props.labelStyle} label={props.label} />
      )}
      <DropDownMenu
        selected={<FormSelected selected={selectData.selected} />}
        classContainer="relative flex items-start gap-[10px] bg-[#fff] border border-[#d0d0d0] focus:shadow-[0_0_3px_0_#d0d0d0] rounded-[3px] p-[5px]"
        classList="left-[0] top-[100%] whitespace-nowrap mt-[5px]"
        classElement="transition-custom block cursor-pointer mt-[5px] first-of-type:mt-[0] p-[10px] bg-[#fff] shadow-[inset_0_0_5px_0_#fff,0_0_0_1px_#d0d0d0] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] rounded-[3px]"
        options={selectData.options}
        action={props.action}
      />
    </>
  );
}

export default FormSelectBlock;
