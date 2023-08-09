import { useState, useEffect } from 'react';
import { storageFilterList } from '../../app/storage/storageMiddlewares';
import { useAppContext } from '../core/Context';
import ListBodyElement from './ListBodyElement';

function ListBody() {
  const { storageState } = useAppContext();
  const [filteredData, setFilteredData] = useState(storageState.decodedData);
  const [viewStyle, setViewStyle] = useState('');

  useEffect(() => {
    setFilteredData(
      storageFilterList(
        storageState.keywords,
        storageState.searchType,
        storageState.selectedCategory,
        storageState.decodedData,
      ),
    );
  }, [
    storageState.keywords,
    storageState.searchType,
    storageState.selectedCategory,
    storageState.decodedData,
  ]);

  useEffect(() => {
    setViewStyle(
      storageState.view === 'list'
        ? ''
        : 'sm:grid-cols-[repeat(auto-fill,minmax(375px,1fr))]',
    );
  }, [storageState.view]);

  return filteredData.length ? (
    <section className={`mt-[20px] grid gap-[10px] ${viewStyle}`}>
      {filteredData.map((dataBlock) => (
        <ListBodyElement key={dataBlock.id} dataBlock={dataBlock} />
      ))}
    </section>
  ) : (
    <section className="mt-[15px] p-[10px] bg-[#fff] shadow-[inset_0_0_3px_1px_#8563c5] text-[#7a54bf] rounded-[3px]">
      No data can be found
    </section>
  );
}

export default ListBody;
