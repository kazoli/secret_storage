import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storageFilterList } from '../../app/storage/storageMiddlewares';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import CustomConfirm from '../general/CustomConfirm';
import ListDataBlockEditor from '../list/ListDataBlockEditor';
import ListExportButton from '../list/ListExportButton';
import ListHeader from '../list/ListHeader';
import ListBody from '../list/ListBody';
import ListBodyEmpty from '../list/ListBodyEmpty';

function List() {
  useEffect(() => {
    document.title = 'Secret storage - List';
  }, []);

  const navigate = useNavigate();
  const { storageState } = useAppContext();

  useEffect(() => {
    if (!storageState.loggedIn) {
      navigate('/login');
    }
  }, [storageState.loggedIn]);

  const [filteredData, setFilteredData] = useState(storageState.decodedData);

  useEffect(() => {
    setFilteredData(
      storageFilterList(
        storageState.keywords,
        storageState.searchType,
        storageState.decodedData,
      ),
    );
  }, [
    storageState.keywords,
    storageState.searchType,
    storageState.decodedData,
  ]);

  return (
    <DefaultLayout loading={storageState.status === 'loading'}>
      <>
        {storageState.customConfirm && (
          <CustomConfirm {...storageState.customConfirm} />
        )}
        {storageState.exportAvailable && <ListExportButton />}
        {storageState.dataBlockEditor && (
          <ListDataBlockEditor listEditorData={storageState.dataBlockEditor} />
        )}
        <ListHeader />
        {filteredData.length ? (
          <ListBody data={filteredData} view={storageState.view} />
        ) : (
          <ListBodyEmpty />
        )}
      </>
    </DefaultLayout>
  );
}

export default List;
