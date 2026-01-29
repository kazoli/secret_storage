import { useIntl } from 'react-intl';
import { TfiLayoutGrid2, TfiViewList } from 'react-icons/tfi';

import { defaultMessages } from '../../../providers/TranslationProvider';
import { tStorageActionTypes, useAppContext } from '../../../utils';

import IconButton from '../../general/IconButton';

const ListFilterView = () => {
  const translate = useIntl().formatMessage;
  const { storageState, storageDispatch } = useAppContext();

  return (
    <div className="list-element">
      <IconButton
        style={storageState.view === 'grid' ? 'highlighted' : ''}
        title={translate(defaultMessages.list.gridViewButton)}
        leftIcon={<TfiLayoutGrid2 />}
        action={() =>
          storageDispatch({
            type: tStorageActionTypes.setView,
            payload: 'grid',
          })
        }
      />
      <IconButton
        style={storageState.view === 'list' ? 'highlighted' : ''}
        title={translate(defaultMessages.list.listViewButton)}
        leftIcon={<TfiViewList />}
        action={() =>
          storageDispatch({
            type: tStorageActionTypes.setView,
            payload: 'list',
          })
        }
      />
    </div>
  );
};

export default ListFilterView;
