import { v4 as uuidV4 } from 'uuid';

import { setLocalStorage } from '../general/middlewares';

import { storageInitialState, storageSettings } from './storageInitialStates';
import {
  tStorageActionTypes,
  tStorageActions,
  tStorageInitialState,
} from './storageTypes';

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
        listRepositionBlockId: storageInitialState.listRepositionBlockId,
        keywords: action.payload,
      };
      return state;

    // set selected category
    case tStorageActionTypes.setSelectedCategory:
      state = {
        ...state,
        listRepositionBlockId: storageInitialState.listRepositionBlockId,
        selectedCategory: action.payload,
      };
      return state;

    // set categories
    case tStorageActionTypes.setCategories:
      state = {
        ...state,
        listRepositionBlockId: storageInitialState.listRepositionBlockId,
        updateCategories: false,
        selectedCategory: action.payload.selectedCategory,
        categories: action.payload.categories,
      };
      return state;

    // reset categories
    case tStorageActionTypes.resetCategories:
      state = {
        ...state,
        updateCategories: true,
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

    // set block id to be repositioned in list
    case tStorageActionTypes.setListRepositionBlockId:
      state = {
        ...state,
        listRepositionBlockId: action.payload,
      };
      return state;

    // set list order editor
    case tStorageActionTypes.setListOrderEditor:
      state = {
        ...state,
        listRepositionBlockId: storageInitialState.listRepositionBlockId,
        listOrderEditor: action.payload,
      };
      return state;

    // set block into new list position
    case tStorageActionTypes.setReorderedList:
      state = {
        ...state,
        exportAvailable: true,
        listRepositionBlockId: storageInitialState.listRepositionBlockId,
        listOrderEditor: storageInitialState.listOrderEditor,
        decodedData: action.payload,
      };
      return state;

    // set the data block editor to show or hide
    case tStorageActionTypes.setDataBlockEditor:
      state = {
        ...state,
        listRepositionBlockId: storageInitialState.listRepositionBlockId,
        dataBlockEditor: action.payload,
      };
      return state;

    // set a data block
    case tStorageActionTypes.setDataBlock: {
      const newDecodedData = action.payload.id
        ? state.decodedData.map((data) =>
            data.id === action.payload.id ? action.payload : data,
          )
        : [{ ...action.payload, id: uuidV4() }, ...state.decodedData];
      state = {
        ...state,
        status: storageInitialState.status,
        dataBlockEditor: storageInitialState.dataBlockEditor,
        exportAvailable: true,
        updateCategories: true,
        decodedData: newDecodedData,
      };
      return state;
    }

    // delete a data block and set delete confirm initial state
    case tStorageActionTypes.deleteDataBlock: {
      const remainedDecodedData = state.decodedData.filter(
        (data) => data.id !== action.payload,
      );
      state = {
        ...state,
        customConfirm: storageInitialState.customConfirm,
        exportAvailable: true,
        updateCategories: true,
        decodedData: remainedDecodedData,
      };
      return state;
    }

    // set the export unavailable
    case tStorageActionTypes.setExport:
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
