import { tCustomConfirm } from '../../app/general/types';
import {
  tStorageActionTypes,
  tStorageDataBlock,
} from '../../app/storage/storageTypes';
import { useAppContext } from '../core/Context';
import { storageConfirmDefaultCancel } from '../../app/storage/storageMiddlewares';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';

type tProps = {
  dataBlock: tStorageDataBlock;
};

function ListBodyElement(props: tProps) {
  const { storageState, storageDispatch } = useAppContext();

  const deleteConfirm: tCustomConfirm = {
    text: `Enter your password to delete "${props.dataBlock.title}" block.`,
    encodedPassword: storageState.encodedPassword,
    setLoading: (value) => {
      storageDispatch({
        type: tStorageActionTypes.setStatus,
        payload: value ? 'loading' : 'idle',
      });
    },
    ok: {
      text: 'Delete',
      action: () => {
        storageDispatch({
          type: tStorageActionTypes.deleteDataBlock,
          payload: props.dataBlock.id,
        });
      },
    },
    cancel: storageConfirmDefaultCancel(storageDispatch),
  };

  return (
    <div className="flex flex-wrap flex-col bg-[#fff] shadow-[0_0_0_1px_#d7d7d7] rounded-[3px]">
      <div className="p-[10px] bg-[#fff] shadow-[inset_0_0_15px_0_#e7e7e7] rounded-[3px_3px_0_0] break-all">
        {props.dataBlock.title}
      </div>
      <div className="p-[10px] flex-[1_1_auto] whitespace-pre-line break-all">
        {props.dataBlock.data}
      </div>
      <div className="flex flex-wrap justify-between gap-[15px] p-[10px] bg-[#f7f7f7] shadow-[inset_0_0_15px_0_#d0d0d0] rounded-[0_0_3px_3px]">
        <div className="flex flex-wrap gap-[15px]">
          <AiOutlineEdit
            className="icon-button hover"
            title="Edit data"
            onClick={() =>
              storageDispatch({
                type: tStorageActionTypes.setDataBlockEditor,
                payload: props.dataBlock,
              })
            }
          />
          <AiOutlineDelete
            className="icon-button hover"
            title="Delete data"
            onClick={() =>
              storageDispatch({
                type: tStorageActionTypes.setCustomConfirm,
                payload: deleteConfirm,
              })
            }
          />
        </div>
        <div className="flex flex-wrap gap-[15px]">
          <AiOutlineMinus
            className="icon-button hover"
            title="Step backward"
            onClick={() =>
              storageDispatch({
                type: tStorageActionTypes.setPosition,
                payload: { direction: 'backward', id: props.dataBlock.id },
              })
            }
          />
          <AiOutlinePlus
            className="icon-button hover"
            title="Step forward"
            onClick={() =>
              storageDispatch({
                type: tStorageActionTypes.setPosition,
                payload: { direction: 'forward', id: props.dataBlock.id },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default ListBodyElement;
