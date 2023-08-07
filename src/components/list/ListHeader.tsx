import {
  tStorageActionTypes,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { storageSearchTypes } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import ListAddNew from './ListAddNew';
import ListSearch from './ListSearch';
import ListSelect from './ListSelect';
import ListView from './ListView';

function ListHeader() {
  const { storageState, storageDispatch } = useAppContext();

  return (
    <section className="flex flex-wrap gap-[10px]">
      <ListSearch />
      <div className="flex flex-wrap-reverse gap-[10px] flex-[1_1_auto] justify-between">
        <ListAddNew />
        <div className="flex flex-wrap gap-[10px]">
          <ListSelect
            selected={storageState.searchType}
            options={storageSearchTypes}
            action={(value) =>
              storageDispatch({
                type: tStorageActionTypes.setSearchType,
                payload: value as tStorageInitialState['searchType'],
              })
            }
          />
          <ListSelect
            selected={storageState.selectedCategory}
            options={storageState.categories}
            action={(value) =>
              storageDispatch({
                type: tStorageActionTypes.setSelectedCategory,
                payload: value as tStorageInitialState['selectedCategory'],
              })
            }
          />
          <ListView />
        </div>
      </div>
    </section>
  );
}

export default ListHeader;
