import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import LayoutProvider from '../../providers/LayoutProvider';
import CustomConfirm from '../../components/general/CustomConfirm';
import FormPasswordBlock from '../../components/form/FormPasswordBlock';
import FormButtonBlock from '../../components/form/FormButtonBlock';
import {
  defaultMessages,
  useTranslationContext,
} from '../../providers/TranslationProvider';
import {
  bcryptHash,
  storageChangePasswordValidate,
  storageSettings,
  tRouteNames,
  tStorageActionTypes,
  useAppContext,
} from '../../utils';

const ChangePassword = () => {
  const navigate = useNavigate();
  const translate = useIntl().formatMessage;
  const { locale } = useTranslationContext();
  const { storageState, storageDispatch } = useAppContext();

  useEffect(() => {
    document.title = translate(defaultMessages.changePassword.documentTitle);
  }, [locale, translate]);

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
      translate,
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
    {
      text: translate(defaultMessages.changePassword.changePasswordButton),
      action: onSubmit,
    },
    {
      text: translate(defaultMessages.common.cancelButton),
      action: onCancel,
    },
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
            id="new-password"
            label={translate(defaultMessages.changePassword.newPassword)}
            placeholder={translate(defaultMessages.common.inputLengthText, {
              minLength: storageSettings.passwordLength.min,
              maxLength: storageSettings.passwordLength.max,
            })}
            password={formData.newPassword}
            passwordError={formErrors.newPassword}
            action={(value) => setFormData({ ...formData, newPassword: value })}
          />
          <FormPasswordBlock
            id="new-password-again"
            label={translate(defaultMessages.changePassword.newPasswordAgain)}
            placeholder={translate(defaultMessages.common.inputLengthText, {
              minLength: storageSettings.passwordLength.min,
              maxLength: storageSettings.passwordLength.max,
            })}
            password={formData.newPasswordAgain}
            passwordError={formErrors.newPasswordAgain}
            action={(value) =>
              setFormData({ ...formData, newPasswordAgain: value })
            }
          />
          <FormPasswordBlock
            id="password"
            label={translate(defaultMessages.changePassword.currentPassword)}
            placeholder={translate(
              defaultMessages.common.passwordEnterPlaceholder,
            )}
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
