import ErrorMessage from '../general/ErrorMessage';
import FormLabel from './FormLabel';

type tProps = {
  blockStyle?: string;
  labelStyle?: string;
  inputStyle?: string;
  errorStyle?: string;
  label?: string;
  buttonText: string;
  fileText: string;
  accept: string;
  action: (value: string) => void;
  error: string;
};

function FormFileBlock(props: tProps) {
  return (
    <div
      className={`flex flex-wrap first-of-type:mt-0 mt-[15px] ${props.blockStyle}`}
    >
      {props.label && (
        <FormLabel id="" labelStyle={props.labelStyle} label={props.label} />
      )}
      <label
        htmlFor="file-input"
        className="flex flex-wrap gap-[0_10px] items-center"
      >
        <span className="form-button">{props.buttonText}</span>
        <span>{props.fileText}</span>
      </label>
      <input
        type="file"
        id="file-input"
        accept={props.accept}
        className="hidden"
        multiple={false}
        onChange={(event) => props.action(event.target.value)}
      />
      <ErrorMessage text={props.error} style={`w-full ${props.errorStyle}`} />
    </div>
  );
}

export default FormFileBlock;
