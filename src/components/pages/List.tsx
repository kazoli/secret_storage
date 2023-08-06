import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import CustomConfirm from '../general/CustomConfirm';
import ListDataBlockEditor from '../list/ListDataBlockEditor';
import ListExportButton from '../list/ListExportButton';
import ListHeader from '../list/ListHeader';
import ListBody from '../list/ListBody';

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
        <ListBody />
      </>
    </DefaultLayout>
  );
}

export default List;
