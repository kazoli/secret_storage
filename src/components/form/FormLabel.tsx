type tProps = {
  labelStyle?: string;
  id: string;
  label: string;
};

function FormLabel(props: tProps) {
  return (
    <label
      className={`w-full font-bold mb-[2px] ${props.labelStyle ?? ''}`}
      htmlFor={props.id}
    >
      {props.label}
    </label>
  );
}

export default FormLabel;
