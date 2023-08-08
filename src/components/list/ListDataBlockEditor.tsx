import { useState, useEffect } from 'react';
import {
  tStorageActionTypes,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { storageSettings } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import { storageProcessDataBlock } from '../../app/storage/storageMiddlewares';
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
    category: '',
    title: '',
    data: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    category: '',
    data: '',
    password: '',
  });

  useEffect(() => {
    if (typeof props.listEditorData === 'object') {
      setFormData({
        ...formData,
        id: props.listEditorData.id,
        category: props.listEditorData.category,
        title: props.listEditorData.title,
        data: props.listEditorData.data,
      });
    }
  }, [props.listEditorData]);

  const buttons = [
    {
      text: 'Save data',
      action: () => {
        storageProcessDataBlock(
          formData,
          storageState.encodedPassword,
          storageDispatch,
        ).then((errors) => setFormErrors(errors));
      },
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
      <FormInputBlock
        type="text"
        label="Category"
        id="category"
        placeholder={`Empty or up to ${storageSettings.categoryLength.max} characters length`}
        value={formData.category}
        action={(value) => setFormData({ ...formData, category: value })}
        error={formErrors.category}
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
