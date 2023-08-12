import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../core/Context';
import DefaultLayout from '../layout/DefaultLayout';
import CustomConfirm from '../general/CustomConfirm';
import ListDataBlockEditor from '../list/ListDataBlockEditor';
import ListOrderEditor from '../list/ListOrderEditor';
import ListExportButton from '../list/ListExportButton';
import ListFilterTopBlock from '../list/ListFilterTopBlock';
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
        {storageState.dataBlockEditor && <ListDataBlockEditor />}
        {storageState.listOrderEditor && <ListOrderEditor />}
        {storageState.exportAvailable && <ListExportButton />}
        <ListFilterTopBlock />
        <ListBody />
      </>
    </DefaultLayout>
  );
}

export default List;
