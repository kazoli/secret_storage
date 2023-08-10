import { tDropDownOption } from '../../app/general/types';
import {
  tStorageActionTypes,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { storageInitialState } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import ListButton from './ListButton';
import ListSearch from './ListSearch';
import ListSelect from './ListSelect';
import ListView from './ListView';

function ListHeader() {
  const { storageState, storageDispatch } = useAppContext();

  const setDataBlockEditor = () => {
    storageDispatch({
      type: tStorageActionTypes.setDataBlockEditor,
      payload: true,
    });
  };

  const resetList = () => {
    // reset keywords if differs from initial state
    if (storageState.keywords !== storageInitialState.keywords) {
      // reset local value too by clearing search field with clear button
      const listClearKeywordsButton = document.getElementById(
        'list-clear-keywords-button',
      );
      listClearKeywordsButton && listClearKeywordsButton.click();
    }
    // reset search type if differs from initial state
    if (storageState.searchType !== storageInitialState.searchType) {
      storageDispatch({
        type: tStorageActionTypes.setSearchType,
        payload: storageInitialState.searchType,
      });
    }
    // reset selected category if differs from initial state
    storageState.selectedCategory !== storageInitialState.selectedCategory &&
      setSelectedCategory(storageInitialState.selectedCategory);
  };

  const setSelectedCategory = (value: tDropDownOption['key']) => {
    storageDispatch({
      type: tStorageActionTypes.setSelectedCategory,
      payload: value as tStorageInitialState['selectedCategory'],
    });
  };

  return (
    <section className="flex flex-wrap gap-[10px]">
      <ListSearch />
      <div className="flex flex-wrap-reverse gap-[10px] flex-[1_1_100%] justify-between">
        <div className="flex flex-wrap gap-[10px]">
          <ListButton text="Add new item" action={setDataBlockEditor} />
          <ListButton text="Reset list" action={resetList} />
        </div>
        <div className="flex flex-wrap gap-[10px]">
          <ListSelect
            selected={storageState.selectedCategory}
            options={storageState.categories}
            action={setSelectedCategory}
          />
          <ListView />
        </div>
      </div>
    </section>
  );
}

export default ListHeader;
