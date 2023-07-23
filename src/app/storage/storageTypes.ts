import { tActionMap, tCustomConfirm } from '../general/types';

// Type of storage data block
export type tStorageDataBlock = {
  id: string;
  title: string;
  data: string;
};

// Type of state of storage
export type tStorageInitialState = {
  status: 'idle' | 'loading';
  loggedIn: boolean;
  encodedPassword: string;
  encodedData: string;
  keywords: string;
  searchType: 'all' | 'title' | 'data';
  view: 'grid' | 'list';
  customConfirm: undefined | tCustomConfirm;
  dataBlockEditor: boolean | tStorageDataBlock;
  exportAvailable: boolean;
  fileName: string;
  decodedData: tStorageDataBlock[];
};

// Types of actions for storage reducer
export enum tStorageActionTypes {
  setStatus = 'setStatus',
  initializeData = 'initializeData',
  setData = 'setData',
  logIn = 'logIn',
  logOut = 'logOut',
  changePassword = 'changePassword',
  setKeywords = 'setKeywords',
  setSearchType = 'setSearchType',
  setView = 'setView',
  setPosition = 'setPosition',
  setDataBlockEditor = 'setDataBlockEditor',
  setDataBlock = 'setDataBlock',
  setCustomConfirm = 'setCustomConfirm',
  deleteDataBlock = 'deleteDataBlock',
  setExportUnavailable = 'setExport',
}

// Types of payloads of storage actions
export type tStoragePayload = {
  [tStorageActionTypes.setStatus]: tStorageInitialState['status'];
  [tStorageActionTypes.initializeData]: {
    encodedData: tStorageInitialState['encodedData'];
    fileName: tStorageInitialState['fileName'];
  };
  [tStorageActionTypes.setData]: {
    encodedPassword: tStorageInitialState['encodedPassword'];
    encodedData: tStorageInitialState['encodedData'];
    decodedData: tStorageInitialState['decodedData'];
  };
  [tStorageActionTypes.logIn]: {
    decodedData: tStorageInitialState['decodedData'];
  };
  [tStorageActionTypes.logOut]: undefined;
  [tStorageActionTypes.changePassword]: tStorageInitialState['encodedPassword'];
  [tStorageActionTypes.setKeywords]: tStorageInitialState['keywords'];
  [tStorageActionTypes.setSearchType]: tStorageInitialState['searchType'];
  [tStorageActionTypes.setView]: tStorageInitialState['view'];
  [tStorageActionTypes.setPosition]: {
    direction: 'backward' | 'forward';
    id: tStorageDataBlock['id'];
  };
  [tStorageActionTypes.setDataBlockEditor]: tStorageInitialState['dataBlockEditor'];
  [tStorageActionTypes.setDataBlock]: tStorageDataBlock;
  [tStorageActionTypes.setCustomConfirm]: tStorageInitialState['customConfirm'];
  [tStorageActionTypes.deleteDataBlock]: tStorageDataBlock['id'];
  [tStorageActionTypes.setExportUnavailable]: undefined;
};

// Types of storage actions
export type tStorageActions =
  tActionMap<tStoragePayload>[keyof tActionMap<tStoragePayload>];
