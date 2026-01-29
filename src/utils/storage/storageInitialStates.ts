import { getLocalStorage } from '../general/middlewares';
import { tStorageInitialState } from './storageTypes';

// Default values for various storage elements
export const DEFAULT = 'default';

// Storage default settings
export const storageSettings = {
  localStorage: { viewKey: 'secretStorageView' },
  defaultFileName: 'secret-storage.json',
  passwordLength: { min: 8, max: 30 },
  titleLength: { min: 3, max: 200 },
  categoryLength: { min: 0, max: 25 },
  dataLength: { min: 5, max: 10000 },
};

// Initial state of storage
export const storageInitialState: tStorageInitialState = {
  status: 'idle',
  loggedIn: false,
  encodedPassword: '',
  encodedData: '',
  updateCategories: false,
  categories: [],
  selectedCategory: DEFAULT,
  keywords: '',
  searchType: 'all',
  view: getLocalStorage(storageSettings.localStorage.viewKey) ?? 'grid',
  customConfirm: undefined,
  dataBlockEditor: false,
  listOrderEditor: false,
  listRepositionBlockId: false,
  exportAvailable: false,
  fileName: storageSettings.defaultFileName,
  decodedData: [],
};
