import { tCustomConfirm } from '../../app/general/types';
import {
  tStorageActionTypes,
  tStorageDataBlock,
} from '../../app/storage/storageTypes';
import { storageInitialState } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import { storageConfirmDefaultCancel } from '../../app/storage/storageMiddlewares';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';

type tProps = {
  index: number;
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

  const positioning =
    storageState.keywords === storageInitialState.keywords &&
    storageState.selectedCategory === storageInitialState.selectedCategory;

  return (
    <div className="flex flex-wrap flex-col bg-[#fff] shadow-[0_0_0_1px_#d7d7d7] rounded-[3px]">
      <div className="flex flex-wrap justify-between p-[10px] bg-[#fff] shadow-[inset_0_0_15px_0_#e7e7e7] rounded-[3px_3px_0_0] w-full">
        <span className="font-[500]">{props.dataBlock.title}</span>
        <span title="Category" className="text-[#7a54bf]">
          {props.dataBlock.category && `#${props.dataBlock.category}#`}
        </span>
      </div>
      <div className="p-[10px] flex-[1_1_auto] whitespace-pre-line w-full">
        {props.dataBlock.data}
      </div>
      <div className="flex flex-wrap justify-between gap-[15px] p-[10px] bg-[#f7f7f7] shadow-[inset_0_0_15px_0_#d0d0d0] rounded-[0_0_3px_3px] w-full">
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
        {positioning && (
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
            <button
              className="icon-button hover px-[5px]"
              title="Step to exact position"
              onClick={() => console.log('belép')}
            >
              {props.index}
            </button>
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
        )}
      </div>
    </div>
  );
}

export default ListBodyElement;
