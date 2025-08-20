import { TfiLayoutGrid2, TfiViewList } from 'react-icons/tfi';

import { tStorageActionTypes, useAppContext } from '../../../utils';
import IconButton from '../../general/IconButton';

const ListFilterView = () => {
  const { storageState, storageDispatch } = useAppContext();

  return (
    <div className="list-element">
      <IconButton
        style={storageState.view === 'grid' ? 'highlighted' : ''}
        title="Grid view"
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
        title="List view"
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
