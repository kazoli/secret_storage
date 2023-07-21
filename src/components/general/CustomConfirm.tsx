import { useState } from 'react';
import { tCustomConfirm } from '../../app/general/types';
import { storageSettings } from '../../app/storage/storageInitialStates';
import { bcryptCompare } from '../../app/general/middlewares';
import PopUp from './PopUp';
import FormPasswordBlock from '../form/FormPasswordBlock';
import FormButtonBlock from '../form/FormButtonBlock';

type tProps = tCustomConfirm;

function CustomConfirm(props: tProps) {
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
            passwordError: storageSettings.passwordCheckError,
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
    <PopUp extraClass="max-w-[500px]">
      <div className="p-[5px] bg-[#fff] shadow-[inset_0_0_4px_0_#9d81d0,0_0_0_1px_#9d81d0] rounded-[3px]">
        {props.text}
      </div>
      {props.encodedPassword && (
        <FormPasswordBlock
          id="password"
          placeholder="Password"
          password={formData.password}
          passwordError={formData.passwordError}
          action={(value) => setFormData({ ...formData, password: value })}
        />
      )}
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default CustomConfirm;
