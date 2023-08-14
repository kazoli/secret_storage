import { useState, useEffect } from 'react';
import { tStorageActionTypes } from '../../app/storage/storageTypes';
import {
  storageInitialState,
  storageSettings,
} from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import { storageProcessDataBlock } from '../../app/storage/storageMiddlewares';
import PopUp from '../general/PopUp';
import FormInputBlock from '../form/FormInputBlock';
import FormTextAreaBlock from '../form/FormTextAreaBlock';
import FormPasswordBlock from '../form/FormPasswordBlock';
import FormButtonBlock from '../form/FormButtonBlock';
import WarningBlock from '../general/WarningBlock';

function ListDataBlockEditor() {
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
    if (typeof storageState.dataBlockEditor === 'object') {
      setFormData({
        ...formData,
        id: storageState.dataBlockEditor.id,
        category: storageState.dataBlockEditor.category,
        title: storageState.dataBlockEditor.title,
        data: storageState.dataBlockEditor.data,
      });
    }
  }, [storageState.dataBlockEditor]);

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

  const warningMessage =
    storageState.keywords !== storageInitialState.keywords ||
    storageState.selectedCategory !== storageInitialState.selectedCategory ||
    storageState.searchType !== storageInitialState.searchType;

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
      {warningMessage && (
        <WarningBlock
          text={
            'This data block may not appear in list after saving data because some list filters are in effect.'
          }
          style="mt-[15px]"
        />
      )}
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default ListDataBlockEditor;
