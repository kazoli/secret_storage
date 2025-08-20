import { useSelectData } from '../../../utils';
import DropDownMenu from '../../general/DropDownMenu';
import FormLabel from '../FormLabel';
import FormSelected from '../FormSelected';
import { tProps } from './types';

const FormSelectBlock = (props: tProps) => {
  const selectData = useSelectData(props.options, props.selected);

  return (
    <>
      {props.label && (
        <FormLabel id="" labelStyle={props.labelStyle} label={props.label} />
      )}
      <DropDownMenu
        selected={<FormSelected selected={selectData.selected} />}
        classContainer=""
        classTrigger="w-[100%] shadow-[inset_0_0_0_1px_#d0d0d0] focus:shadow-[inset_0_0_0_1px_#d0d0d0,0_0_3px_0_#c0c0c0] rounded-[3px] p-[5px]"
        classList="left-[0] top-[100%] w-[max-content] mt-[5px] bg-[#f0f0f0] rounded-[3px] shadow-[0_0_5px_0_#d0d0d0]"
        classElement="transition-custom block cursor-pointer mt-[5px] first-of-type:mt-[0] p-[5px] shadow-[inset_0_0_0_1px_#d0d0d0] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] rounded-[3px]"
        options={selectData.options}
        action={props.action}
      />
    </>
  );
};

export default FormSelectBlock;
