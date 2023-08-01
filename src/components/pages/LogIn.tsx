import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tFileContent } from '../../app/general/types';
import {
  tStorageActionTypes,
  tStoragePayload,
} from '../../app/storage/storageTypes';
import { storageSettings } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import {
  bcryptHash,
  tweetNaClDecryptData,
} from '../../app/general/middlewares';
import {
  storageLoginValidate,
  storageParseFileContent,
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
    // set loading shows
    storageDispatch({
      type: tStorageActionTypes.setStatus,
      payload: 'loading',
    });
    // data to be dispatched
    const data: tStoragePayload[tStorageActionTypes.setData] = {
      encodedPassword: '',
      encodedData: '',
      decodedData: [],
    };
    let error = '';
    // there was stored data previously
    if (storageState.encodedData) {
      // trying to decode by password
      const result = tweetNaClDecryptData(
        storageState.encodedData,
        formData.password,
      );
      // resulting the decoded data or an error message if could not decode
      if (result) {
        data.decodedData = result;
      } else {
        error = storageSettings.passwordCheckError;
      }
    } else {
      // no stored data previously so validate a new password
      error = await storageLoginValidate(formData.password);
    }
    if (error) {
      // password error
      storageDispatch({
        type: tStorageActionTypes.setStatus,
        payload: 'idle',
      });
      setFormErrors({ ...formErrors, password: error });
    } else {
      // hashing entered password for secure using
      data.encodedPassword = await bcryptHash(formData.password);
      // dispatching data
      storageDispatch({
        type: tStorageActionTypes.setData,
        payload: data,
      });
    }
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
