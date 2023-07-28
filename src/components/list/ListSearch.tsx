import { useEffect, useState } from 'react';
import { tStorageActionTypes } from '../../app/storage/storageTypes';
import { useAppContext } from '../core/Context';
import { MdClear } from 'react-icons/md';

function ListSearch() {
  const { storageDispatch } = useAppContext();
  const [keywords, setKeywords] = useState('');

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
    <div className="list-element flex-[1_1_100%]">
      <input
        type="text"
        autoComplete="off"
        placeholder="Enter keywords to search"
        className="flex-1 bg-transparent"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <button
        id="list-clear-keywords-button"
        className="icon-button hover"
        title="Clear text"
        onClick={() => setKeywords('')}
      >
        <MdClear />
      </button>
    </div>
  );
}

export default ListSearch;
