import { tStorageActionTypes } from '../../app/storage/storageTypes';
import { useAppContext } from '../core/Context';

function ListAddNewButton() {
  const { storageDispatch } = useAppContext();

  return (
    <button
      className="list-element button"
      onClick={() =>
        storageDispatch({
          type: tStorageActionTypes.setDataBlockEditor,
          payload: true,
        })
      }
    >
      Add new item
    </button>
  );
}

export default ListAddNewButton;
