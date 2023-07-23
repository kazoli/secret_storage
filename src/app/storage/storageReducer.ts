import {
  tStorageActionTypes,
  tStorageActions,
  tStorageInitialState,
} from './storageTypes';
import { storageInitialState, storageSettings } from './storageInitialStates';
import { setLocalStorage } from '../general/middlewares';
import { v4 as uuidV4 } from 'uuid';
import { storageRepositionDataBlock } from './storageMiddlewares';

// Storage reducer
export const storageReducer = (
  state: tStorageInitialState,
  action: tStorageActions,
) => {
  switch (action.type) {
    // set status
    case tStorageActionTypes.setStatus:
      state = {
        ...state,
        status: action.payload,
      };
      return state;

    // initialize data from file
    case tStorageActionTypes.initializeData:
      state = {
        ...state,
        fileName: action.payload.fileName,
        encodedData: action.payload.encodedData,
      };
      return state;

    // empty encoded data means new password is created so it can log in because no data needs to decode
    case tStorageActionTypes.setData:
      state = {
        ...state,
        status: storageInitialState.status,
        encodedPassword: action.payload.encodedPassword,
        encodedData: action.payload.encodedData,
        decodedData: action.payload.decodedData,
        loggedIn: !action.payload.encodedData,
      };
      return state;

    // encoded data is unnecessary after decoding
    case tStorageActionTypes.logIn:
      state = {
        ...state,
        status: storageInitialState.status,
        encodedData: '',
        decodedData: action.payload.decodedData,
        loggedIn: true,
      };
      return state;

    // set back to initial state
    case tStorageActionTypes.logOut:
      return { ...storageInitialState, view: state.view };

    // set new password data
    case tStorageActionTypes.changePassword:
      state = {
        ...state,
        status: storageInitialState.status,
        exportAvailable: true,
        encodedPassword: action.payload,
      };
      return state;

    // set the custom confirm elements
    case tStorageActionTypes.setCustomConfirm:
      state = {
        ...state,
        customConfirm: action.payload,
      };
      return state;

    // set keywords
    case tStorageActionTypes.setKeywords:
      state = {
        ...state,
        keywords: action.payload,
      };
      return state;

    // set search type
    case tStorageActionTypes.setSearchType:
      state = {
        ...state,
        searchType: action.payload,
      };
      return state;

    // set view
    case tStorageActionTypes.setView:
      setLocalStorage(storageSettings.localStorage.viewKey, action.payload);
      state = {
        ...state,
        view: action.payload,
      };
      return state;

    // set position
    case tStorageActionTypes.setPosition:
      state = {
        ...state,
        exportAvailable: true,
        decodedData: storageRepositionDataBlock(
          state.decodedData,
          action.payload,
        ),
      };
      return state;

    // set the data block editor to show or hide
    case tStorageActionTypes.setDataBlockEditor:
      state = {
        ...state,
        dataBlockEditor: action.payload,
      };
      return state;

    // set a data block
    case tStorageActionTypes.setDataBlock:
      state = {
        ...state,
        status: storageInitialState.status,
        dataBlockEditor: storageInitialState.dataBlockEditor,
        exportAvailable: true,
        decodedData: action.payload.id
          ? state.decodedData.map((data) =>
              data.id === action.payload.id ? action.payload : data,
            )
          : [{ ...action.payload, id: uuidV4() }, ...state.decodedData],
      };
      return state;

    // delete a data block and set delete confirm initial state
    case tStorageActionTypes.deleteDataBlock:
      state = {
        ...state,
        customConfirm: storageInitialState.customConfirm,
        exportAvailable: true,
        decodedData: state.decodedData.filter(
          (data) => data.id !== action.payload,
        ),
      };
      return state;

    // set the export unavailable
    case tStorageActionTypes.setExportUnavailable:
      state = {
        ...state,
        exportAvailable: storageInitialState.exportAvailable,
        customConfirm: storageInitialState.customConfirm,
      };
      return state;

    default:
      return state;
  }
};
