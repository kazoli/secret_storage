import { useState, useEffect } from 'react';
import {
  tStorageActionTypes,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { storageSettings } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import { storageDataValidate } from '../../app/storage/storageMiddlewares';
import PopUp from '../general/PopUp';
import FormInputBlock from '../form/FormInputBlock';
import FormTextAreaBlock from '../form/FormTextAreaBlock';
import FormPasswordBlock from '../form/FormPasswordBlock';
import FormButtonBlock from '../form/FormButtonBlock';

type tProps = {
  listEditorData: tStorageInitialState['dataBlockEditor'];
};

function ListDataBlockEditor(props: tProps) {
  const { storageState, storageDispatch } = useAppContext();
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    data: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    data: '',
    password: '',
  });

  useEffect(() => {
    if (typeof props.listEditorData === 'object') {
      setFormData({
        ...formData,
        id: props.listEditorData.id,
        title: props.listEditorData.title,
        data: props.listEditorData.data,
      });
    }
  }, [props.listEditorData]);

  const onSubmit = () => {
    storageDispatch({
      type: tStorageActionTypes.setStatus,
      payload: 'loading',
    });
    const processed = {
      title: formData.title.trim(),
      data: formData.data.trim(),
    };
    storageDataValidate(
      processed.title,
      processed.data,
      formData.password,
      storageState.encodedPassword,
    ).then((errors) => {
      if (errors.title || errors.data || errors.password) {
        setFormErrors(errors);
        storageDispatch({
          type: tStorageActionTypes.setStatus,
          payload: 'idle',
        });
      } else {
        // emptying keywords to avoid new element does not appear that caused by list filtering
        const listClearKeywordsButton = document.getElementById(
          'list-clear-keywords-button',
        );
        listClearKeywordsButton && listClearKeywordsButton.click();
        // dispatch newly created data
        storageDispatch({
          type: tStorageActionTypes.setDataBlock,
          payload: {
            id: formData.id,
            title: processed.title,
            data: processed.data,
          },
        });
      }
    });
  };
  const buttons = [
    {
      text: 'Save data',
      action: onSubmit,
    },
    {
      text: 'Cancel',
      action: () =>
        storageDispatch({
          type: tStorageActionTypes.setDataBlockEditor,
          payload: false,
        }),
    },
  ];

  return (
    <PopUp>
      <FormInputBlock
        type="text"
        label="Title"
        id="title"
        placeholder={`${storageSettings.titleLength.min} - ${storageSettings.titleLength.max} characters length`}
        value={formData.title}
        action={(value) => setFormData({ ...formData, title: value })}
        error={formErrors.title}
      />
      <FormTextAreaBlock
        label="Data"
        id="title"
        placeholder={`${storageSettings.dataLength.min} - ${storageSettings.dataLength.max} characters length`}
        minLength={storageSettings.dataLength.min}
        maxLength={storageSettings.dataLength.max}
        value={formData.data}
        action={(value) => setFormData({ ...formData, data: value })}
        error={formErrors.data}
      />
      <FormPasswordBlock
        label="Password"
        id="password"
        placeholder="Enter your password"
        password={formData.password}
        passwordError={formErrors.password}
        action={(value) => setFormData({ ...formData, password: value })}
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default ListDataBlockEditor;
