import { tCustomConfirm, tFileContent, tStringObject } from '../general/types';
import {
  tStorageActionTypes,
  tStorageActions,
  tStorageDataBlock,
  tStorageInitialState,
  tStoragePayload,
} from './storageTypes';
import { storageInitialState, storageSettings } from './storageInitialStates';
import {
  arrayReorder,
  bcryptCompare,
  bcryptHash,
  tweetNaClDecryptData,
  tweetNaClEncryptData,
  upperCaseFirst,
} from '../general/middlewares';
import { validateInput, validatePassword } from '../general/validations';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-toastify';

// Initialize categories to a drop down menu form from original object
export const storageInitializeCategories = () => {
  const categories: tStorageInitialState['categories'] = [];
  for (const key in storageSettings.categoryInitialList) {
    categories.push({
      key: key,
      value:
        storageSettings.categoryInitialList[
          key as keyof typeof storageSettings.categoryInitialList
        ],
    });
  }
  return categories;
};

// Validate login form data
export const storageLoginValidate = async (password: string) => {
  return validatePassword(
    'Password',
    password,
    storageSettings.passwordLength.min,
    storageSettings.passwordLength.max,
  );
};

// Validate set password form data
export const storageChangePasswordValidate = async (
  newPassword: string,
  newPasswordAgain: string,
  password: string,
  encodedPassword: string,
) => {
  const errors = {
    newPassword: '',
    newPasswordAgain: '',
    password: '',
  };
  errors.newPassword = validatePassword(
    'New password',
    newPassword,
    storageSettings.passwordLength.min,
    storageSettings.passwordLength.max,
  );
  if (newPassword !== newPasswordAgain) {
    errors.newPasswordAgain = 'New passwords do not match';
  }
  const result = await bcryptCompare(password, encodedPassword);
  if (!result) {
    errors.password = storageSettings.passwordCheckError;
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
) => {
  const errors = {
    title: '',
    category: '',
    data: '',
    password: '',
  };
  errors.title = validateInput(
    'Title',
    title,
    storageSettings.titleLength.min,
    storageSettings.titleLength.max,
  );
  errors.category = validateInput(
    'Category',
    category,
    storageSettings.categoryLength.min,
    storageSettings.categoryLength.max,
  );
  errors.data = validateInput(
    'Data',
    data,
    storageSettings.dataLength.min,
    storageSettings.dataLength.max,
  );
  const result = await bcryptCompare(password, encodedPassword);
  if (!result) {
    errors.password = storageSettings.passwordCheckError;
  }
  return errors;
};

// Parse content of opened file
export const storageParseFileContent = (
  fileName: string,
  fileContent: tFileContent,
  storageDispatch: React.Dispatch<tStorageActions>,
  encodedData: tStorageInitialState['encodedData'],
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
          fileError = 'Wrong structure of the file content';
        }
      } catch (error) {
        console.error(error);
        fileError = 'Selected file content cannot be parsed';
      }
    }
  } else {
    fileError = 'File has wrong type or no content';
  }
  return fileError;
};

// Decoding storage file content
export const storageProcessFile = async (
  encodedData: tStorageInitialState['encodedData'],
  password: string,
  storageDispatch: React.Dispatch<tStorageActions>,
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
    categories: storageInitialState.categories,
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
        title: result.title ?? 'Missing title',
        data: result.data ?? '',
        category: result.category ?? '',
      }));
      // get categories from decoded data
      processedData.categories = storageCategorySelect(
        results,
        storageInitialState.selectedCategory,
      ).categories;
    } else {
      error = storageSettings.passwordCheckError;
    }
  } else {
    // no stored data previously so validate a new password
    error = await storageLoginValidate(password);
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

// Get the category object array in original order
export const storageCategories = (
  decodedData: tStorageInitialState['decodedData'],
  ignoreEmpty = true,
) => {
  // create a set with unique categories
  const categorySet = new Set<tStorageDataBlock['category']>();
  // get all blocks of decoded data
  decodedData.forEach((data) => {
    if (!ignoreEmpty || data.category) {
      categorySet.add(data.category);
    }
  });
  // return the array from category set
  return Array.from(categorySet).map((key) => ({
    key,
    value: key || storageSettings.categoryInitialList[''],
  }));
};

// Get category select data from data list
export const storageCategorySelect = (
  decodedData: tStorageInitialState['decodedData'],
  selectedCategory: tStorageInitialState['selectedCategory'],
) => {
  // get categories in proper form
  let categories: tStorageInitialState['categories'] =
    storageCategories(decodedData);
  // if new categories has at least an element
  if (categories.length) {
    // sorting categories in ascending order
    categories = arrayReorder(
      categories as tStringObject[],
      'key',
      'asc',
    ) as tStorageInitialState['categories'];
  }
  // adding initial values to the start of sorted array
  categories = [...storageInitialState.categories, ...categories];
  // if selected category is not the default and not inside categories then set default
  if (
    selectedCategory !== storageInitialState.selectedCategory &&
    !categories.find((category) => category.key === selectedCategory)
  ) {
    selectedCategory = storageInitialState.selectedCategory;
  }
  return { categories: categories, selectedCategory: selectedCategory };
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
) => {
  return {
    text: 'Cancel',
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
): tCustomConfirm => ({
  text: 'Enter your password to encode and export all data into a file.',
  encodedPassword: encodedPassword,
  setLoading: (value) => {
    storageDispatch({
      type: tStorageActionTypes.setStatus,
      payload: value ? 'loading' : 'idle',
    });
  },
  ok: {
    text: 'Export data into file',
    action: (password) => {
      storageExportData(fileName, decodedData, password!).then((result) => {
        if (result) {
          storageDispatch({
            type: tStorageActionTypes.setExportUnavailable,
          });
        }
      });
    },
  },
  cancel: storageConfirmDefaultCancel(storageDispatch),
});

// Encode and export data
export const storageExportData = async (
  fileName: string,
  decodedData: tStorageInitialState['decodedData'],
  password: string,
) => {
  const encodedData = tweetNaClEncryptData(decodedData, password);
  if (encodedData) {
    const data = JSON.stringify({ encodedData: encodedData });
    // create a blob
    const file = new Blob([data], { type: 'application/json' });
    // create a string containing a URL representing the file data given in the parameter
    const url = window.URL.createObjectURL(file);
    // create dinamically a link
    const a = document.createElement('a');
    // add url to href of link
    a.href = url;
    // set default file name at saving
    a.download = fileName;
    // append link to body
    document.body.appendChild(a);
    // dinamically click on the link
    a.click();
    // wait a moment to not trigger instantly
    setTimeout(function () {
      // dinamically remove the appended link
      document.body.removeChild(a);
      // remove object URL which was previously created
      window.URL.revokeObjectURL(url);
    }, 0);
    return true;
  } else {
    toast.error('Encryption failed, please try to export again');
    return false;
  }
};
