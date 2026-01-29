import { IntlShape } from 'react-intl';
import { toast } from 'react-toastify';
import { v4 as uuidV4 } from 'uuid';

import { defaultMessages } from '../../providers/TranslationProvider';

import {
  arrayReorder,
  bcryptCompare,
  bcryptHash,
  tweetNaClDecryptData,
  tweetNaClEncryptData,
  upperCaseFirst,
} from '../general/middlewares';
import { validateInputLength, validatePassword } from '../general/validations';
import { tCustomConfirm, tFileContent } from '../general/types';

import {
  DEFAULT,
  storageInitialState,
  storageSettings,
} from './storageInitialStates';
import {
  tStorageActionTypes,
  tStorageActions,
  tStorageDataBlock,
  tStorageInitialState,
  tStoragePayload,
} from './storageTypes';

// Validate login form data
export const storageLoginValidate = (
  password: string,
  translate: IntlShape['formatMessage'],
) => {
  return validatePassword(
    () => translate(defaultMessages.common.password),
    password,
    storageSettings.passwordLength.min,
    storageSettings.passwordLength.max,
    translate,
  );
};

// Validate set password form data
export const storageChangePasswordValidate = async (
  newPassword: string,
  newPasswordAgain: string,
  password: string,
  encodedPassword: string,
  translate: IntlShape['formatMessage'],
) => {
  const errors = {
    newPassword: '',
    newPasswordAgain: '',
    password: '',
  };
  errors.newPassword = validatePassword(
    () => translate(defaultMessages.changePassword.newPassword),
    newPassword,
    storageSettings.passwordLength.min,
    storageSettings.passwordLength.max,
    translate,
  );
  if (newPassword !== newPasswordAgain) {
    errors.newPasswordAgain = translate(
      defaultMessages.common.passwordMatchError,
    );
  }
  const result = await bcryptCompare(password, encodedPassword);
  if (!result) {
    errors.password = translate(defaultMessages.common.passwordCheckError);
  }
  return errors;
};

// Validate storage block form data
export const storageDataValidate = async (
  title: string,
  category: string,
  data: string,
  password: string,
  encodedPassword: string,
  translate: IntlShape['formatMessage'],
) => {
  const errors = {
    title: '',
    category: '',
    data: '',
    password: '',
  };
  errors.title = validateInputLength(
    () => translate(defaultMessages.list.itemTitle),
    title,
    storageSettings.titleLength.min,
    storageSettings.titleLength.max,
    translate,
  );
  errors.category = validateInputLength(
    () => translate(defaultMessages.list.itemCategory),
    category,
    storageSettings.categoryLength.min,
    storageSettings.categoryLength.max,
    translate,
  );
  errors.data = validateInputLength(
    () => translate(defaultMessages.list.itemData),
    data,
    storageSettings.dataLength.min,
    storageSettings.dataLength.max,
    translate,
  );
  const result = await bcryptCompare(password, encodedPassword);
  if (!result) {
    errors.password = translate(defaultMessages.common.passwordCheckError);
  }
  return errors;
};

// Parse content of opened file
export const storageParseFileContent = (
  fileName: string,
  fileContent: tFileContent,
  storageDispatch: React.Dispatch<tStorageActions>,
  encodedData: tStorageInitialState['encodedData'],
  translate: IntlShape['formatMessage'],
) => {
  // reset previous content
  if (encodedData) {
    storageDispatch({
      type: tStorageActionTypes.initializeData,
      payload: {
        fileName: storageSettings.defaultFileName,
        encodedData: '',
      },
    });
  }
  let fileError = '';
  if (typeof fileContent === 'string') {
    if (fileContent) {
      try {
        const content = JSON.parse(fileContent);
        if (content['encodedData'] !== undefined) {
          storageDispatch({
            type: tStorageActionTypes.initializeData,
            payload: {
              fileName: fileName,
              encodedData: content.encodedData,
            },
          });
        } else {
          fileError = translate(defaultMessages.login.fileErrorWrongStructure);
        }
      } catch (error) {
        console.error(error);
        fileError = translate(defaultMessages.login.fileErrorParsing);
      }
    }
  } else {
    fileError = translate(defaultMessages.login.fileErrorWrongType);
  }
  return fileError;
};

// Decoding storage file content
export const storageProcessFile = async (
  encodedData: tStorageInitialState['encodedData'],
  password: string,
  storageDispatch: React.Dispatch<tStorageActions>,
  translate: IntlShape['formatMessage'],
) => {
  // set loading shows
  storageDispatch({
    type: tStorageActionTypes.setStatus,
    payload: 'loading',
  });
  // error message
  let error = '';
  // data to be dispatched
  const processedData: tStoragePayload[tStorageActionTypes.setData] = {
    encodedPassword: '',
    encodedData: '',
    decodedData: [],
  };
  // there was stored data previously
  if (encodedData) {
    // trying to decode by password
    const results = tweetNaClDecryptData(encodedData, password);
    // resulting the decoded data or an error message if it could not decode
    if (results) {
      // get decoded data from results
      processedData.decodedData = results.map((result) => ({
        id: result.id ?? uuidV4(),
        title: result.title ?? translate(defaultMessages.list.itemMissingTitle),
        data: result.data ?? '',
        category: result.category ?? '',
      }));
    } else {
      error = translate(defaultMessages.common.passwordCheckError);
    }
  } else {
    // no stored data previously so validate a new password
    error = storageLoginValidate(password, translate);
  }
  if (error) {
    // set status to idle
    storageDispatch({
      type: tStorageActionTypes.setStatus,
      payload: 'idle',
    });
  } else {
    // hashing entered password for secure using
    processedData.encodedPassword = await bcryptHash(password);
    // dispatching data
    storageDispatch({
      type: tStorageActionTypes.setData,
      payload: processedData,
    });
  }
  return error;
};

// Get category select data from data list
export const storageCategorySelect = (
  decodedData: tStorageInitialState['decodedData'],
  selectedCategory: tStorageInitialState['selectedCategory'],
  translate: IntlShape['formatMessage'],
) => {
  // create a set with unique categories
  const categorySet = new Set<tStorageDataBlock['category']>();
  // get all blocks of decoded data
  decodedData.forEach((data) => {
    if (data.category) {
      categorySet.add(data.category);
    }
  });
  let categories: tStorageInitialState['categories'] = [];
  // if new categories has at least an element
  if (categorySet.size > 0) {
    // creating categories array from set
    const baseCategories = Array.from(categorySet).map((key) => ({
      key,
      value: key,
    }));
    // sorting categories in ascending order
    categories = arrayReorder(baseCategories, 'key', 'asc');
  }
  // adding initial values to the start of sorted array
  categories = [
    {
      key: DEFAULT,
      value: translate(defaultMessages.list.categoryAll),
    },
    {
      key: '',
      value: translate(defaultMessages.list.categoryNone),
    },
    ...categories,
  ];
  // if selected category is not the default and not inside categories then set default
  if (
    selectedCategory !== storageInitialState.selectedCategory &&
    !categories.find((category) => category.key === selectedCategory)
  ) {
    selectedCategory = storageInitialState.selectedCategory;
  }
  return { selectedCategory, categories };
};

// Processing data block
export const storageProcessDataBlock = async (
  formData: {
    id: string;
    category: string;
    title: string;
    data: string;
    password: string;
  },
  encodedPassword: tStorageInitialState['encodedPassword'],
  storageDispatch: React.Dispatch<tStorageActions>,
  translate: IntlShape['formatMessage'],
) => {
  storageDispatch({
    type: tStorageActionTypes.setStatus,
    payload: 'loading',
  });
  const processed = {
    title: formData.title.trim(),
    category: formData.category.trim(),
    data: formData.data.trim(),
  };
  const errors = await storageDataValidate(
    processed.title,
    processed.category,
    processed.data,
    formData.password,
    encodedPassword,
    translate,
  );
  if (errors.title || errors.category || errors.data || errors.password) {
    storageDispatch({
      type: tStorageActionTypes.setStatus,
      payload: 'idle',
    });
  } else {
    // dispatch newly created data
    storageDispatch({
      type: tStorageActionTypes.setDataBlock,
      payload: {
        id: formData.id,
        category: upperCaseFirst(processed.category),
        title: processed.title,
        data: processed.data,
      },
    });
  }
  return errors;
};

// Filter data in block list
export const storageFilterList = (
  keywords: tStorageInitialState['keywords'],
  searchType: tStorageInitialState['searchType'],
  selectedCategory: tStorageInitialState['selectedCategory'],
  decodedData: tStorageInitialState['decodedData'],
) => {
  let results = decodedData;
  // filter data according to category
  if (selectedCategory !== storageInitialState['selectedCategory']) {
    results = results.filter(
      (dataBlock) => dataBlock.category === selectedCategory,
    );
  }
  // remove white spaces
  keywords = keywords.trim();
  if (/\S/.test(keywords)) {
    const splittedKeywords = keywords.split(' ');
    // filter the array based on the specified filterBy value
    results = results.filter((dataBlock) => {
      // check if the title or data contains any of the search keywords
      const hasAllKeywords = splittedKeywords.every((keyword) => {
        // case insensitive search
        const regex = new RegExp(keyword, 'i');
        // all or a selected type of data
        const data =
          searchType === 'all'
            ? `${dataBlock.title} ${dataBlock.data}`
            : dataBlock[searchType];
        // test data
        return regex.test(data);
      });
      // return true if all keywords can be found
      return hasAllKeywords;
    });
  }
  return results;
};

// Storage confirm default cancel
export const storageConfirmDefaultCancel = (
  storageDispatch: React.Dispatch<tStorageActions>,
  translate: IntlShape['formatMessage'],
) => {
  return {
    text: translate(defaultMessages.common.cancelButton),
    action: () => {
      storageDispatch({
        type: tStorageActionTypes.setCustomConfirm,
        payload: storageInitialState.customConfirm,
      });
    },
  };
};

// Export confirm data to dispatches of export buttons
export const storageExportConfirm = (
  fileName: tStorageInitialState['fileName'],
  decodedData: tStorageInitialState['decodedData'],
  encodedPassword: string,
  storageDispatch: React.Dispatch<tStorageActions>,
  translate: IntlShape['formatMessage'],
): tCustomConfirm => ({
  text: translate(defaultMessages.list.exportDataConfirmTitle),
  encodedPassword: encodedPassword,
  setLoading: (value) => {
    storageDispatch({
      type: tStorageActionTypes.setStatus,
      payload: value ? 'loading' : 'idle',
    });
  },
  ok: {
    text: translate(defaultMessages.list.exportDataConfirmOk),
    action: (password) => {
      storageExportData(fileName, decodedData, password!, translate).then(
        (result) => {
          if (result) {
            storageDispatch({
              type: tStorageActionTypes.setExport,
            });
          }
        },
      );
    },
  },
  cancel: storageConfirmDefaultCancel(storageDispatch, translate),
});

// Encode and export data
export const storageExportData = async (
  fileName: string,
  decodedData: tStorageInitialState['decodedData'],
  password: string,
  translate: IntlShape['formatMessage'],
) => {
  const encodedData = tweetNaClEncryptData(decodedData, password);
  if (encodedData) {
    const data = JSON.stringify({ encodedData: encodedData });
    // create a blob
    const file = new Blob([data], { type: 'application/json' });
    // create a string containing a URL representing the file data given in the parameter
    const url = window.URL.createObjectURL(file);
    // create dynamically a link
    const a = document.createElement('a');
    // add url to href of link
    a.href = url;
    // set default file name at saving
    a.download = fileName;
    // append link to body
    document.body.appendChild(a);
    // dynamically click on the link
    a.click();
    // wait a moment to not trigger instantly
    setTimeout(() => {
      // dynamically remove the appended link
      document.body.removeChild(a);
      // remove object URL which was previously created
      window.URL.revokeObjectURL(url);
    }, 0);
    return true;
  } else {
    toast.error(translate(defaultMessages.list.exportDataError));
    return false;
  }
};
