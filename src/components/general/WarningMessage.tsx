type tProps = {
  message: string;
  extraClass?: string;
};
const WarningMessage = (props: tProps) => {
  return (
    <div
      className={`p-[5px] bg-[#fff] shadow-[inset_0_0_4px_0_#FFA000,0_0_0_1px_#FFA000] rounded-[3px] ${
        props.extraClass ?? ''
      }`}
    >
      {props.message}
    </div>
  );
};

export default WarningMessage;
