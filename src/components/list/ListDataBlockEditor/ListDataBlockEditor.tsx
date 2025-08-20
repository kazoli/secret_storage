import { useState, useEffect } from 'react';

import {
  storageInitialState,
  storageProcessDataBlock,
  storageSettings,
  tStorageActionTypes,
  useAppContext,
} from '../../../utils';

import FormInputBlock from '../../form/FormInputBlock';
import FormTextAreaBlock from '../../form/FormTextAreaBlock';
import FormPasswordBlock from '../../form/FormPasswordBlock';
import FormButtonBlock from '../../form/FormButtonBlock';
import PopUp from '../../general/PopUp';
import WarningBlock from '../../general/WarningBlock';

const ListDataBlockEditor = () => {
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
    if (
      typeof storageState.dataBlockEditor === 'object' &&
      'id' in storageState.dataBlockEditor &&
      'category' in storageState.dataBlockEditor &&
      'title' in storageState.dataBlockEditor &&
      'data' in storageState.dataBlockEditor
    ) {
      const initialData = storageState.dataBlockEditor;
      setFormData((prevState) => ({
        ...prevState,
        id: initialData.id,
        category: initialData.category,
        title: initialData.title,
        data: initialData.data,
      }));
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
};

export default ListDataBlockEditor;
