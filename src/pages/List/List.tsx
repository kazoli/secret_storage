import { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import LayoutProvider from '../../providers/LayoutProvider';
import CustomConfirm from '../../components/general/CustomConfirm';
import ListDataBlockEditor from '../../components/list/ListDataBlockEditor';
import ListOrderEditor from '../../components/list/ListOrderEditor';
import ListExportButton from '../../components/list/ListExportButton';
import ListFilterTopBlock from '../../components/list/ListFilterTopBlock';
import ListBody from '../../components/list/ListBody';
import {
  defaultMessages,
  useTranslationContext,
} from '../../providers/TranslationProvider';
import {
  storageCategorySelect,
  tRouteNames,
  tStorageActionTypes,
  useAppContext,
} from '../../utils';

const List = () => {
  const navigate = useNavigate();
  const translate = useIntl().formatMessage;
  const { locale } = useTranslationContext();
  const { storageState, storageDispatch } = useAppContext();

  useEffect(() => {
    document.title = translate(defaultMessages.list.documentTitle);
    storageDispatch({ type: tStorageActionTypes.resetCategories });
  }, [locale, translate]);

  useEffect(() => {
    if (storageState.loggedIn) {
      if (storageState.updateCategories) {
        storageDispatch({
          type: tStorageActionTypes.setCategories,
          payload: storageCategorySelect(
            storageState.decodedData,
            storageState.selectedCategory,
            translate,
          ),
        });
      }
    } else {
      navigate(tRouteNames.LOGIN);
    }
  }, [
    storageState.loggedIn,
    storageState.updateCategories,
    storageState.decodedData,
    storageState.selectedCategory,
    translate,
    storageDispatch,
    navigate,
  ]);

  if (!storageState.loggedIn) {
    return null;
  }

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
