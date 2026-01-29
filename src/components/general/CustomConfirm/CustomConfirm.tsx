import { useState } from 'react';
import { useIntl } from 'react-intl';

import { defaultMessages } from '../../../providers/TranslationProvider';
import { bcryptCompare, tCustomConfirm } from '../../../utils';

import FormPasswordBlock from '../../form/FormPasswordBlock';
import FormButtonBlock from '../../form/FormButtonBlock';

import PopUp from '../PopUp';
import CommentBlock from '../CommentBlock';

const CustomConfirm = (props: tCustomConfirm) => {
  const translate = useIntl().formatMessage;

  const [formData, setFormData] = useState({
    password: '',
    passwordError: '',
  });

  const okAction = () => {
    if (props.encodedPassword) {
      props.setLoading && props.setLoading(true);
      bcryptCompare(formData.password, props.encodedPassword).then((result) => {
        if (result) {
          props.ok.action(formData.password);
        } else {
          setFormData({
            ...formData,
            passwordError: translate(defaultMessages.common.passwordCheckError),
          });
        }
        props.setLoading && props.setLoading(false);
      });
    } else {
      props.ok.action();
    }
  };

  const buttons = [
    {
      text: props.ok.text,
      action: okAction,
    },
    {
      text: props.cancel.text,
      action: props.cancel.action,
    },
  ];

  return (
    <PopUp style="max-w-[500px]">
      <CommentBlock text={props.text} />
      {props.encodedPassword && (
        <FormPasswordBlock
          id="password"
          placeholder={translate(defaultMessages.common.password)}
          password={formData.password}
          passwordError={formData.passwordError}
          action={(value) => setFormData({ ...formData, password: value })}
        />
      )}
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default CustomConfirm;
