import { useIntl } from 'react-intl';

import { defaultMessages } from '../../../providers/TranslationProvider';
import {
  storageInitialState,
  tDropDownOption,
  tStorageActionTypes,
  tStorageInitialState,
  useAppContext,
} from '../../../utils';

import ListFilterButton from '../ListFilterButton';
import ListFilterSearch from '../ListFilterSearch';
import ListFilterSearchSelect from '../ListFilterSearchSelect';
import ListFilterView from '../ListFilterView';

const ListFilterTopBlock = () => {
  const translate = useIntl().formatMessage;
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
          <ListFilterButton
            text={translate(defaultMessages.list.addNewItemButton)}
            action={setDataBlockEditor}
          />
          <ListFilterButton
            text={translate(defaultMessages.list.reorderListButton)}
            action={setListOrderEditor}
          />
          {listFilterShow && (
            <ListFilterButton
              text={translate(defaultMessages.list.resetListButton)}
              action={resetList}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-[10px]">
          <ListFilterSearchSelect
            selected={storageState.selectedCategory}
            options={storageState.categories}
            action={setSelectedCategory}
          />
          <ListFilterView />
        </div>
      </div>
    </section>
  );
};

export default ListFilterTopBlock;
