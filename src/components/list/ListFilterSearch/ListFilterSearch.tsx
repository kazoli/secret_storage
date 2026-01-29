import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { MdClear } from 'react-icons/md';

import { defaultMessages } from '../../../providers/TranslationProvider';
import {
  tDropDownOption,
  tStorageActionTypes,
  tStorageInitialState,
  useAppContext,
} from '../../../utils';

import IconButton from '../../general/IconButton';

import ListFilterSelect from '../ListFilterSearchSelect';

const ListFilterSearch = () => {
  const translate = useIntl().formatMessage;
  const { storageState, storageDispatch } = useAppContext();

  const [keywords, setKeywords] = useState('');

  const storageSearchTypes = [
    { key: 'all', value: translate(defaultMessages.list.searchTypeAll) },
    { key: 'title', value: translate(defaultMessages.list.searchTypeTitle) },
    { key: 'data', value: translate(defaultMessages.list.searchTypeData) },
  ];

  useEffect(() => {
    setKeywords(storageState.keywords);
  }, [storageState.keywords]);

  useEffect(() => {
    // delay 500 ms during typing to filter list
    const timerId = setTimeout(
      () =>
        storageDispatch({
          type: tStorageActionTypes.setKeywords,
          payload: keywords,
        }),
      keywords.length ? 500 : 0,
    );
    return () => clearTimeout(timerId);
  }, [keywords, storageDispatch]);

  const setSearchSelectType = (value: tDropDownOption['key']) => {
    storageDispatch({
      type: tStorageActionTypes.setSearchType,
      payload: value as tStorageInitialState['searchType'],
    });
  };

  return (
    <>
      <div className="list-element flex-[10000_10000_300px]">
        <input
          type="text"
          autoComplete="off"
          placeholder={translate(defaultMessages.list.searchPlaceholder)}
          className="flex-1 bg-transparent"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <IconButton
          style="hover"
          title={translate(defaultMessages.list.clearSearchButton)}
          leftIcon={<MdClear />}
          action={() => setKeywords('')}
        />
      </div>
      <ListFilterSelect
        selected={storageState.searchType}
        options={storageSearchTypes}
        action={setSearchSelectType}
      />
    </>
  );
};

export default ListFilterSearch;
