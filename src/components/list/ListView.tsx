import { tStorageActionTypes } from '../../app/storage/storageTypes';
import { useAppContext } from '../core/Context';
import { TfiLayoutGrid2, TfiViewList } from 'react-icons/tfi';

function ListView() {
  const { storageState, storageDispatch } = useAppContext();

  return (
    <div className="list-element">
      <button
        className={`icon-button ${
          storageState.view === 'grid' ? 'highlighted' : ''
        }`}
        title="Grid view"
        onClick={() =>
          storageDispatch({
            type: tStorageActionTypes.setView,
            payload: 'grid',
          })
        }
      >
        <TfiLayoutGrid2 />
      </button>
      <button
        className={`icon-button ${
          storageState.view === 'list' ? 'highlighted' : ''
        }`}
        title="List view"
        onClick={() =>
          storageDispatch({
            type: tStorageActionTypes.setView,
            payload: 'list',
          })
        }
      >
        <TfiViewList />
      </button>
    </div>
  );
}

export default ListView;
