import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { MdOutlineClear } from 'react-icons/md';

import {
  defaultMessages,
  useTranslationContext,
} from '../../../providers/TranslationProvider';
import ErrorMessage from '../../general/ErrorMessage/ErrorMessage';
import FormLabel from '../FormLabel';
import { tProps } from './types';

const FormFileBlock = (props: tProps) => {
  const translate = useIntl().formatMessage;
  const { locale } = useTranslationContext();

  const [selectedFile, setSelectedFile] = useState(false);
  const [defaultFileText, setDefaultFileText] = useState('');
  const [fileText, setFileText] = useState('');

  useEffect(() => {
    const translatedText = translate(defaultMessages.login.fileNewSelected);
    setDefaultFileText(translatedText);
    if (!selectedFile) {
      setFileText(translatedText);
    }
  }, [locale, translate]);

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
        setSelectedFile(true);
      }
    }
  };

  const setDefault = () => {
    (document.getElementById('file-input') as HTMLInputElement).value = '';
    setSelectedFile(false);
    setFileText(defaultFileText);
    props.contentAction('', '');
  };

  return (
    <div className={`flex flex-wrap first-of-type:mt-0 mt-[15px]`}>
      <FormLabel
        id="file-selector"
        label={translate(defaultMessages.login.fileSelectorTitle)}
      />
      <div className={`flex flex-wrap gap-[5px_10px] items-center`}>
        <label htmlFor="file-input" className="form-button">
          {translate(defaultMessages.login.fileSelectorButton)}
        </label>
        <span className="flex-[10000_10000_auto] flex gap-[5px] break-all">
          {fileText !== defaultFileText && (
            <MdOutlineClear
              className="my-[5px] shrink-0 text-[1rem] cursor-pointer bg-[#fff] border-2 border-[#ff0000] text-[#ff0000] rounded-[3px]"
              onClick={setDefault}
              title={translate(defaultMessages.login.fileResetButton)}
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
      <ErrorMessage text={props.error} style={`w-full`} />
    </div>
  );
};

export default FormFileBlock;
