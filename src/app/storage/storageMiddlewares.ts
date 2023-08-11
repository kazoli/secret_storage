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
  alphabetReorder,
  bcryptCompare,
  bcryptHash,
  tweetNaClDecryptData,
  tweetNaClEncryptData,
  upperCaseFirst,
} from '../general/middlewares';
import { validateInput, validatePassword } from '../general/validations';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-toastify';

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
      processedData.categories = storageGetCategories(
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

// Get categories from data list
export const storageGetCategories = (
  decodedData: tStorageInitialState['decodedData'],
  selectedCategory: tStorageInitialState['selectedCategory'],
) => {
  // category map for the most efficient way to get unique categories
  let categoryMap: { [key: string]: true } = {};
  // looping through all resulted data
  decodedData.forEach((data) => {
    // pushing category if not empty
    if (data.category) {
      // adding to category map if it does not even contain
      !categoryMap[data.category] && (categoryMap[data.category] = true);
    }
  });
  const categoryKeys = Object.keys(categoryMap);
  let newCategories: tStorageInitialState['categories'] = [];
  if (categoryKeys.length) {
    // convert category map keys into the form of drop down
    newCategories = categoryKeys.map((key) => ({
      key,
      value: key,
    }));
    // unsetting categoryMap
    categoryMap = {};
    // sorting categories in ascending order
    newCategories = alphabetReorder(
      newCategories as tStringObject[],
      'key',
    ) as tStorageInitialState['categories'];
  }
  // adding initial values to the start of sorted array
  newCategories = [...storageInitialState.categories, ...newCategories];
  // if selected category is not the default and not inside categories then set default
  if (
    selectedCategory !== storageInitialState.selectedCategory &&
    !newCategories.find((category) => category.key === selectedCategory)
  ) {
    selectedCategory = storageInitialState.selectedCategory;
  }
  return { categories: newCategories, selectedCategory: selectedCategory };
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

// Repostioning a storage data block
export const storageRepositionDataBlock = (
  decodedData: tStorageInitialState['decodedData'],
  repositionedBlockId: tStorageInitialState['listRepositionBlockId'],
  selectedBlock: tStoragePayload['setNewListPosition'],
) => {
  let index = 0;
  const repositionedBlock = { index: 0, data: {} as tStorageDataBlock };
  const reorderedData = [];
  decodedData.forEach((block) => {
    // store data of repositioned block
    if (block.id === repositionedBlockId) {
      repositionedBlock.data = block;
    } else {
      // repositioned block will be pushed after the selected block
      if (selectedBlock.position === 'after') {
        reorderedData.push(block);
        // increase index to show the next position of reordered data array
        index++;
      }
      // the selected block before or after which the other will be inserted
      if (block.id === selectedBlock.id) {
        // push an empty block into the new position
        reorderedData.push({} as tStorageDataBlock);
        // store current index of reordered data array
        repositionedBlock.index = index;
        // increase index to show the next position of reordered data array
        index++;
      }
      // repositioned block will be pushed before the selected block
      if (selectedBlock.position === 'before') {
        reorderedData.push(block);
        // increase index to show the next position of reordered data array
        index++;
      }
    }
  });
  // insert the repositioned block at its new position
  reorderedData[repositionedBlock.index] = repositionedBlock.data;
  return reorderedData;
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
