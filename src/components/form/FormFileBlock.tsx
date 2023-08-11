import { useState } from 'react';
import { tFileContent } from '../../app/general/types';
import { MdOutlineClear } from 'react-icons/md';
import FormLabel from './FormLabel';
import ErrorMessage from '../general/ErrorMessage';

type tProps = {
  blockStyle?: string;
  labelStyle?: string;
  fileBlockStyle?: string;
  errorStyle?: string;
  label?: string;
  buttonText: string;
  defaultText: string;
  accept: string;
  contentAction: (filename: string, value: tFileContent) => void;
  error: string;
};

function FormFileBlock(props: tProps) {
  const [fileText, setFileText] = useState(props.defaultText);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          props.contentAction(
            file.name,
            event.target ? event.target.result : null,
          );
        };
        reader.readAsText(file);
        setFileText(file.name);
      }
    }
  };

  const setDefault = () => {
    (document.getElementById('file-input') as HTMLInputElement).value = '';
    setFileText(props.defaultText);
    props.contentAction('', '');
  };

  return (
    <div
      className={`flex flex-wrap first-of-type:mt-0 mt-[15px] ${
        props.blockStyle ?? ''
      }`}
    >
      {props.label && (
        <FormLabel id="" labelStyle={props.labelStyle} label={props.label} />
      )}
      <div
        className={`flex flex-wrap gap-[5px_10px] items-center ${
          props.fileBlockStyle ?? ''
        }`}
      >
        <label htmlFor="file-input" className="form-button">
          {props.buttonText}
        </label>
        <span className="flex-[10000_10000_auto] flex gap-[5px]">
          {fileText !== props.defaultText && (
            <MdOutlineClear
              className="my-[5px] shrink-0 text-[1rem] cursor-pointer bg-[#fff] border-2 border-[#ff0000] text-[#ff0000] rounded-[3px]"
              onClick={setDefault}
              title="Reset to new file"
            />
          )}
          {fileText}
        </span>
        <input
          type="file"
          id="file-input"
          accept={props.accept}
          className="hidden"
          multiple={false}
          onChange={handleFileChange}
        />
      </div>
      <ErrorMessage
        text={props.error}
        style={`w-full ${props.errorStyle ?? ''}`}
      />
    </div>
  );
}

export default FormFileBlock;
