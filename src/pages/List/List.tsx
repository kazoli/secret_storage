import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LayoutProvider from '../../providers/LayoutProvider';
import CustomConfirm from '../../components/general/CustomConfirm';
import ListDataBlockEditor from '../../components/list/ListDataBlockEditor';
import ListOrderEditor from '../../components/list/ListOrderEditor';
import ListExportButton from '../../components/list/ListExportButton';
import ListFilterTopBlock from '../../components/list/ListFilterTopBlock';
import ListBody from '../../components/list/ListBody';
import { useAppContext } from '../../utils';

const List = () => {
  useEffect(() => {
    document.title = 'Secret storage - List';
  }, []);

  const navigate = useNavigate();
  const { storageState } = useAppContext();

  useEffect(() => {
    if (!storageState.loggedIn) {
      navigate('/login');
    }
  }, [storageState.loggedIn, navigate]);

  return (
    <LayoutProvider loading={storageState.status === 'loading'}>
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
    </LayoutProvider>
  );
};

export default List;
