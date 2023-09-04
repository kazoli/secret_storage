import { useEffect, useState } from 'react';
import {
  tStorageActionTypes,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { useAppContext } from '../core/Context';
import { MdClear } from 'react-icons/md';
import { storageSearchTypes } from '../../app/storage/storageInitialStates';
import { tDropDownOption } from '../../app/general/types';
import ListFilterSelect from './ListFilterSelect';
import IconButton from '../general/IconButton';

function ListFilterSearch() {
  const { storageState, storageDispatch } = useAppContext();
  const [keywords, setKeywords] = useState('');

  useEffect(() => {
    setKeywords(storageState.keywords);
  }, [storageState.keywords]);

  useEffect(() => {
    // delay 500 ms during typing
    const timerId = setTimeout(
      () =>
        storageDispatch({
          type: tStorageActionTypes.setKeywords,
          payload: keywords.trim(), // remove whitespaces
        }),
      keywords.length ? 500 : 0,
    );
    return () => clearTimeout(timerId);
  }, [keywords]);

  return (
    <>
      <div className="list-element flex-[10000_10000_300px]">
        <input
          type="text"
          autoComplete="off"
          placeholder="Enter keywords to search"
          className="flex-1 bg-transparent"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <IconButton
          style="hover"
          title="Clear text"
          leftIcon={<MdClear />}
          action={() => setKeywords('')}
        />
      </div>
      <ListFilterSelect
        selected={storageState.searchType}
        options={storageSearchTypes}
        action={(value: tDropDownOption['key']) =>
          storageDispatch({
            type: tStorageActionTypes.setSearchType,
            payload: value as tStorageInitialState['searchType'],
          })
        }
      />
    </>
  );
}

export default ListFilterSearch;
