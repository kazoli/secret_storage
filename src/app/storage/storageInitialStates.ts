import { tDropDownOption } from '../general/types';
import { tStorageInitialState } from './storageTypes';
import { getLocalStorage } from '../general/middlewares';

export const storageSettings = {
  localStorage: { viewKey: 'secretStorageView' },
  defaultFileName: 'secret-storage.json',
  fileUploadText: 'New file',
  passwordCheckError: 'Password is not correct',
  passwordLength: { min: 8, max: 30 },
  titleLength: { min: 3, max: 200 },
  dataLength: { min: 5, max: 10000 },
};

// Base state of limits of artwork pages
export const storageSearchTypes: tDropDownOption[] = [
  { key: 'all', value: 'Search in: all' },
  { key: 'title', value: 'Search in: title' },
  { key: 'data', value: 'Search in: data' },
];

// Initial state of storage
export const storageInitialState: tStorageInitialState = {
  status: 'idle',
  loggedIn: false,
  encodedPassword: '',
  encodedData: '',
  keywords: '',
  searchType: 'all',
  view: getLocalStorage(storageSettings.localStorage.viewKey) ?? 'grid',
  customConfirm: undefined,
  dataBlockEditor: false,
  exportAvailable: false,
  fileName: storageSettings.defaultFileName,
  decodedData: [],
};
