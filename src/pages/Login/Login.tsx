import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

import LayoutProvider from '../../providers/LayoutProvider';
import FormFileBlock from '../../components/form/FormFileBlock';
import FormPasswordBlock from '../../components/form/FormPasswordBlock';
import FormButtonBlock from '../../components/form/FormButtonBlock';
import {
  defaultMessages,
  useTranslationContext,
} from '../../providers/TranslationProvider';
import {
  storageParseFileContent,
  storageProcessFile,
  storageSettings,
  tFileContent,
  tRouteNames,
  useAppContext,
} from '../../utils';

const Login = () => {
  const navigate = useNavigate();
  const translate = useIntl().formatMessage;
  const { locale } = useTranslationContext();
  const { storageState, storageDispatch } = useAppContext();

  useEffect(() => {
    document.title = translate(defaultMessages.login.documentTitle);
  }, [locale, translate]);

  useEffect(() => {
    if (storageState.loggedIn) {
      navigate(tRouteNames.HOME);
    }
  }, [storageState.loggedIn, navigate]);

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
      translate,
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
      translate,
    );
    setFormErrors({ ...formErrors, password: error });
  };

  const buttons = [
    { text: translate(defaultMessages.login.loginButton), action: onSubmit },
  ];

  return (
    <LayoutProvider loading={storageState.status === 'loading'}>
      <form
        onSubmit={onSubmit}
        className="m-[0_auto] p-[10px_15px] rounded-[5px] bg-[#eee9f7] shadow-[inset_0_0_50px_0_#e2daf1,0_0_3px_0_#777] max-w-[500px]"
      >
        <FormFileBlock
          accept="application/json"
          contentAction={getStorageFileContent}
          error={formErrors.file}
        />
        <FormPasswordBlock
          label={translate(defaultMessages.common.password)}
          id="password"
          placeholder={translate(defaultMessages.common.inputLengthText, {
            minLength: storageSettings.passwordLength.min,
            maxLength: storageSettings.passwordLength.max,
          })}
          password={formData.password}
          passwordError={formErrors.password}
          action={(value) => setFormData({ ...formData, password: value })}
        />
        <FormButtonBlock buttons={buttons} />
      </form>
    </LayoutProvider>
  );
};

export default Login;
