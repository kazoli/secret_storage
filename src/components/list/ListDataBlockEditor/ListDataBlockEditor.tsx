import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import { defaultMessages } from '../../../providers/TranslationProvider';
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
  const translate = useIntl().formatMessage;
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
      text: translate(defaultMessages.list.saveDataButton),
      action: () => {
        storageProcessDataBlock(
          formData,
          storageState.encodedPassword,
          storageDispatch,
          translate,
        ).then((errors) => setFormErrors(errors));
      },
    },
    {
      text: translate(defaultMessages.common.cancelButton),
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
        id="title"
        type="text"
        label={translate(defaultMessages.list.itemTitle)}
        placeholder={translate(defaultMessages.common.inputLengthText, {
          minLength: storageSettings.titleLength.min,
          maxLength: storageSettings.titleLength.max,
        })}
        value={formData.title}
        action={(value) => setFormData({ ...formData, title: value })}
        error={formErrors.title}
      />
      <FormTextAreaBlock
        id="data"
        label={translate(defaultMessages.list.itemData)}
        placeholder={translate(defaultMessages.common.inputLengthText, {
          minLength: storageSettings.dataLength.min,
          maxLength: storageSettings.dataLength.max,
        })}
        minLength={storageSettings.dataLength.min}
        maxLength={storageSettings.dataLength.max}
        value={formData.data}
        action={(value) => setFormData({ ...formData, data: value })}
        error={formErrors.data}
      />
      <FormInputBlock
        id="category"
        type="text"
        label={translate(defaultMessages.list.itemCategory)}
        placeholder={translate(defaultMessages.list.itemCategoryPlaceholder, {
          minLength: storageSettings.categoryLength.min,
          maxLength: storageSettings.categoryLength.max,
        })}
        value={formData.category}
        action={(value) => setFormData({ ...formData, category: value })}
        error={formErrors.category}
      />
      <FormPasswordBlock
        id="password"
        label={translate(defaultMessages.common.password)}
        placeholder={translate(defaultMessages.common.passwordEnterPlaceholder)}
        password={formData.password}
        passwordError={formErrors.password}
        action={(value) => setFormData({ ...formData, password: value })}
      />
      {warningMessage && (
        <WarningBlock
          text={translate(defaultMessages.list.hiddenDataWarning)}
          style="mt-[15px]"
        />
      )}
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default ListDataBlockEditor;
