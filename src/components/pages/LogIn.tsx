import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tFileContent } from '../../app/general/types';
import { storageSettings } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import {
  storageParseFileContent,
  storageProcessFile,
} from '../../app/storage/storageMiddlewares';
import DefaultLayout from '../layout/DefaultLayout';
import FormFileBlock from '../form/FormFileBlock';
import FormPasswordBlock from '../form/FormPasswordBlock';
import FormButtonBlock from '../form/FormButtonBlock';

function LogIn() {
  useEffect(() => {
    document.title = 'Secret storage - Log in';
  }, []);

  const navigate = useNavigate();
  const { storageState, storageDispatch } = useAppContext();

  useEffect(() => {
    if (storageState.loggedIn) {
      navigate('/');
    }
  }, [storageState.loggedIn]);

  const [formData, setFormData] = useState({
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    password: '',
    file: '',
  });

  // Get the storage file content to be parsed
  const getStorageFileContent = (
    fileName: string,
    fileContent: tFileContent,
  ) => {
    const error = storageParseFileContent(
      fileName,
      fileContent,
      storageDispatch,
      storageState.encodedData,
    );
    setFormErrors({
      ...formErrors,
      file: error,
    });
  };

  // Submit password parse and log in
  const onSubmit = async (event: void | React.FormEvent<HTMLFormElement>) => {
    // prevent default submit if submit by enter on input
    event && event.preventDefault();
    // process file and return error message
    const error = await storageProcessFile(
      storageState.encodedData,
      formData.password,
      storageDispatch,
    );
    setFormErrors({ ...formErrors, password: error });
  };

  const buttons = [{ text: 'Log in', action: onSubmit }];

  return (
    <DefaultLayout loading={storageState.status === 'loading'}>
      <form
        onSubmit={onSubmit}
        className="m-[0_auto] p-[10px_15px] rounded-[5px] bg-[#eee9f7] shadow-[inset_0_0_50px_0_#e2daf1,0_0_3px_0_#777] max-w-[500px]"
      >
        <FormFileBlock
          label="Storage file type"
          buttonText="Select a file"
          defaultText={storageSettings.fileUploadText}
          accept="application/json"
          contentAction={getStorageFileContent}
          error={formErrors.file}
        />
        <FormPasswordBlock
          label="Password"
          id="password"
          placeholder={`${storageSettings.passwordLength.min} - ${storageSettings.passwordLength.max} characters`}
          password={formData.password}
          passwordError={formErrors.password}
          action={(value) => setFormData({ ...formData, password: value })}
        />
        <FormButtonBlock buttons={buttons} />
      </form>
    </DefaultLayout>
  );
}

export default LogIn;
