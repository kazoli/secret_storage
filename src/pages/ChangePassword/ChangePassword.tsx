import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LayoutProvider from '../../providers/LayoutProvider';
import CustomConfirm from '../../components/general/CustomConfirm';
import FormPasswordBlock from '../../components/form/FormPasswordBlock';
import FormButtonBlock from '../../components/form/FormButtonBlock';
import {
  bcryptHash,
  storageChangePasswordValidate,
  storageSettings,
  tRouteNames,
  tStorageActionTypes,
  useAppContext,
} from '../../utils';

const ChangePassword = () => {
  useEffect(() => {
    document.title = 'Secret storage - Set password';
  }, []);

  const navigate = useNavigate();
  const { storageState, storageDispatch } = useAppContext();

  useEffect(() => {
    if (!storageState.loggedIn) {
      navigate(tRouteNames.LOGIN);
    }
  }, [storageState.loggedIn, navigate]);

  const [formData, setFormData] = useState({
    newPassword: '',
    newPasswordAgain: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    newPassword: '',
    newPasswordAgain: '',
    password: '',
  });

  const onSubmit = (event: void | React.FormEvent<HTMLFormElement>) => {
    // prevent default submit if submit by enter on input
    event && event.preventDefault();
    // set loading shows
    storageDispatch({
      type: tStorageActionTypes.setStatus,
      payload: 'loading',
    });
    // validate passwords
    storageChangePasswordValidate(
      formData.newPassword,
      formData.newPasswordAgain,
      formData.password,
      storageState.encodedPassword,
    ).then((errors) => {
      if (errors.newPassword || errors.newPasswordAgain || errors.password) {
        // if any field has error show related message
        setFormErrors(errors);
        // set loading off
        storageDispatch({
          type: tStorageActionTypes.setStatus,
          payload: 'idle',
        });
      } else {
        // hashing password and thereafter store it
        bcryptHash(formData.newPassword).then((hashedPassword) => {
          storageDispatch({
            type: tStorageActionTypes.changePassword,
            payload: hashedPassword,
          });
          navigate(tRouteNames.HOME);
        });
      }
    });
  };

  const onCancel = async (event: void | React.FormEvent<HTMLFormElement>) => {
    // prevent default submit if submit by enter on input
    event && event.preventDefault();
    // navigate back to list
    navigate(tRouteNames.HOME);
  };

  const buttons = [
    { text: 'Change password', action: onSubmit },
    { text: 'Cancel', action: onCancel },
  ];

  return (
    <LayoutProvider loading={storageState.status === 'loading'}>
      <>
        {storageState.customConfirm && (
          <CustomConfirm {...storageState.customConfirm} />
        )}
        <form
          onSubmit={onSubmit}
          className="m-[0_auto] p-[10px_15px] rounded-[5px] bg-[#eee9f7] shadow-[inset_0_0_50px_0_#e2daf1,0_0_3px_0_#777] max-w-[500px]"
        >
          <FormPasswordBlock
            label="New password"
            id="new-password"
            placeholder={`${storageSettings.passwordLength.min} - ${storageSettings.passwordLength.max} characters`}
            password={formData.newPassword}
            passwordError={formErrors.newPassword}
            action={(value) => setFormData({ ...formData, newPassword: value })}
          />
          <FormPasswordBlock
            label="New password again"
            id="new-password-again"
            placeholder={`${storageSettings.passwordLength.min} - ${storageSettings.passwordLength.max} characters`}
            password={formData.newPasswordAgain}
            passwordError={formErrors.newPasswordAgain}
            action={(value) =>
              setFormData({ ...formData, newPasswordAgain: value })
            }
          />
          <FormPasswordBlock
            label="Current password"
            id="password"
            placeholder="Enter your password"
            password={formData.password}
            passwordError={formErrors.password}
            action={(value) => setFormData({ ...formData, password: value })}
          />
          <FormButtonBlock buttons={buttons} />
        </form>
      </>
    </LayoutProvider>
  );
};

export default ChangePassword;
