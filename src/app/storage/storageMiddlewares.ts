import { tCustomConfirm } from '../general/types';
import {
  tStorageActionTypes,
  tStorageActions,
  tStorageInitialState,
  tStoragePayload,
} from './storageTypes';
import { storageInitialState, storageSettings } from './storageInitialStates';
import {
  bcryptCompare,
  tweetNaClEncryptData,
  queryManager,
} from '../general/middlewares';
import { validateInput, validatePassword } from '../general/validations';
import { errorHandler } from '../general/error';
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
  data: string,
  password: string,
  encodedPassword: string,
) => {
  const errors = {
    title: '',
    data: '',
    password: '',
  };
  errors.title = validateInput(
    'Title',
    title,
    storageSettings.titleLength.min,
    storageSettings.titleLength.max,
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

// Repostioning a storage data block
export const storageRepositionDataBlock = (
  decodedData: tStorageInitialState['decodedData'],
  payload: tStoragePayload['setPosition'],
) => {
  const decodedDataLength = decodedData.length;
  let mainIndex = 0;
  let ignoreNext = false;
  const reorderedData = decodedData.reduce(
    (result: tStorageInitialState['decodedData'], block, index) => {
      if (payload.id === block.id) {
        if (payload.direction === 'backward') {
          const prevIndex = index - 1;
          if (prevIndex < 0) {
            // main index staying 0 that next block will be pushed to the begining
            // it was the first element in the array and step backward to the last position
            result[decodedDataLength - 1] = block;
          } else {
            // put previous block into current position
            result[index] = result[prevIndex];
            // put current block into previous position
            result[prevIndex] = block;
            // increase main index to equal current index in next round
            mainIndex++;
          }
        } else {
          const nextIndex = index + 1;
          if (nextIndex > decodedDataLength - 1) {
            // it was the last block in the array and step forward to the first position
            result.unshift(block);
          } else {
            // put next block into current position
            result[index] = decodedData[nextIndex];
            // put current block into next position
            result[nextIndex] = block;
            // increase main index to equal current index in next round
            mainIndex++;
            // set to ignore next block becuse that has been pushed already into array
            ignoreNext = true;
          }
        }
      } else {
        if (ignoreNext) {
          ignoreNext = false;
        } else {
          result[mainIndex] = block;
        }
        // increase main index to equal current index in next round
        mainIndex++;
      }
      return result;
    },
    [],
  );
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
      storageExportData(decodedData, password!).then((result) => {
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
  decodedData: tStorageInitialState['decodedData'],
  password: string,
) => {
  const encodedData = tweetNaClEncryptData(decodedData, password);
  if (encodedData) {
    try {
      await queryManager('put', '/api/storage', {
        encodedData: encodedData,
      });
      toast.success('Successful export');
      return true;
    } catch (error) {
      errorHandler(error);
      return false;
    }
  } else {
    toast.error('Encryption failed, please try to export again');
    return false;
  }
};
