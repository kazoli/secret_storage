import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  tStorageActionTypes,
  tStoragePayload,
} from '../../app/storage/storageTypes';
import { storageSettings } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import {
  bcryptHash,
  queryManager,
  tweetNaClDecryptData,
} from '../../app/general/middlewares';
import { storageLoginValidate } from '../../app/storage/storageMiddlewares';
import DefaultLayout from '../layout/DefaultLayout';
import FormButtonBlock from '../form/FormButtonBlock';
import FormPasswordBlock from '../form/FormPasswordBlock';

function LogIn() {
  useEffect(() => {
    document.title = 'Secret storage - Log in';
  }, []);

  const navigate = useNavigate();
  const { storageState, storageDispatch } = useAppContext();

  useEffect(() => {
    if (storageState.loggedIn) {
      navigate('/');
    } else {
      queryManager('get', '/api/storage').then(
        (result: false | tStoragePayload['initializeData']) => {
          if (result && result.encodedData) {
            storageDispatch({
              type: tStorageActionTypes.initializeData,
              payload: result,
            });
          }
        },
      );
    }
  }, [storageState.loggedIn]);

  const [formData, setFormData] = useState({
    password: '',
    passwordError: '',
  });

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
      setFormData({ ...formData, passwordError: error });
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
        <FormPasswordBlock
          label="Password"
          id="password"
          placeholder={`${storageSettings.passwordLength.min} - ${storageSettings.passwordLength.max} characters`}
          password={formData.password}
          passwordError={formData.passwordError}
          action={(value) => setFormData({ ...formData, password: value })}
        />
        <FormButtonBlock buttons={buttons} />
      </form>
    </DefaultLayout>
  );
}

export default LogIn;
