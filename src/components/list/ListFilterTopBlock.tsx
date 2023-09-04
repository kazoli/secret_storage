import { tDropDownOption } from '../../app/general/types';
import {
  tStorageActionTypes,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { storageInitialState } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import ListFilterButton from './ListFilterButton';
import ListFilterSearch from './ListFilterSearch';
import ListFilterSelect from './ListFilterSelect';
import ListFilterView from './ListFilterView';

function ListFilterTopBlock() {
  const { storageState, storageDispatch } = useAppContext();
  const listFilterShow =
    storageState.keywords !== storageInitialState.keywords ||
    storageState.searchType !== storageInitialState.searchType ||
    storageState.selectedCategory !== storageInitialState.selectedCategory;

  const setDataBlockEditor = () => {
    storageDispatch({
      type: tStorageActionTypes.setDataBlockEditor,
      payload: true,
    });
  };

  const setListOrderEditor = () => {
    storageDispatch({
      type: tStorageActionTypes.setListOrderEditor,
      payload: true,
    });
  };

  const resetList = () => {
    // reset keywords if differs from initial state
    if (storageState.keywords !== storageInitialState.keywords) {
      storageDispatch({
        type: tStorageActionTypes.setKeywords,
        payload: storageInitialState.keywords,
      });
    }
    // reset search type if differs from initial state
    if (storageState.searchType !== storageInitialState.searchType) {
      storageDispatch({
        type: tStorageActionTypes.setSearchType,
        payload: storageInitialState.searchType,
      });
    }
    // reset selected category if differs from initial state
    if (
      storageState.selectedCategory !== storageInitialState.selectedCategory
    ) {
      setSelectedCategory(storageInitialState.selectedCategory);
    }
  };

  const setSelectedCategory = (value: tDropDownOption['key']) => {
    storageDispatch({
      type: tStorageActionTypes.setSelectedCategory,
      payload: value as tStorageInitialState['selectedCategory'],
    });
  };

  return (
    <section className="flex flex-wrap gap-[10px]">
      <ListFilterSearch />
      <div className="flex flex-wrap-reverse gap-[10px] flex-[1_1_100%] justify-between">
        <div className="flex flex-wrap gap-[10px]">
          <ListFilterButton text="Add new item" action={setDataBlockEditor} />
          <ListFilterButton text="Reorder list" action={setListOrderEditor} />
          {listFilterShow && (
            <ListFilterButton text="Reset list" action={resetList} />
          )}
        </div>
        <div className="flex flex-wrap gap-[10px]">
          <ListFilterSelect
            selected={storageState.selectedCategory}
            options={storageState.categories}
            action={setSelectedCategory}
          />
          <ListFilterView />
        </div>
      </div>
    </section>
  );
}

export default ListFilterTopBlock;
