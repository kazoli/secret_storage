import { useEffect, useState } from 'react';
import { tCustomConfirm } from '../../app/general/types';
import {
  tStorageActionTypes,
  tStorageDataBlock,
} from '../../app/storage/storageTypes';
import { useAppContext } from '../core/Context';
import { storageConfirmDefaultCancel } from '../../app/storage/storageMiddlewares';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { VscDebugStepBack, VscDebugStepOver } from 'react-icons/vsc';
import IconButton from '../general/IconButton';

type tProps = {
  dataBlock: tStorageDataBlock;
};

function ListBodyElement(props: tProps) {
  const { storageState, storageDispatch } = useAppContext();
  const [buttons, setButtons] = useState<JSX.Element>();

  useEffect(() => {
    if (storageState.listRepositionBlockId) {
      if (storageState.listRepositionBlockId === props.dataBlock.id) {
        setButtons(
          <IconButton
            style="hover px-[5px] uppercase text-[#ff0000]"
            text="cancel"
            title="Cancel"
            action={() =>
              storageDispatch({
                type: tStorageActionTypes.setListRepositionBlockId,
                payload: false,
              })
            }
          />,
        );
      } else {
        setButtons(
          <>
            <IconButton
              style="hover px-[5px] uppercase"
              title="Insert before this"
              leftIcon={<VscDebugStepBack />}
              action={() =>
                storageDispatch({
                  type: tStorageActionTypes.setNewListPosition,
                  payload: { id: props.dataBlock.id, position: 'before' },
                })
              }
            />
            <IconButton
              style="hover px-[5px] uppercase"
              title="Insert after this"
              leftIcon={<VscDebugStepOver />}
              action={() =>
                storageDispatch({
                  type: tStorageActionTypes.setNewListPosition,
                  payload: { id: props.dataBlock.id, position: 'after' },
                })
              }
            />
          </>,
        );
      }
    } else {
      setButtons(
        <IconButton
          style="hover px-[5px] uppercase"
          text="reposition"
          title="Reposition"
          action={() =>
            storageDispatch({
              type: tStorageActionTypes.setListRepositionBlockId,
              payload: props.dataBlock.id,
            })
          }
        />,
      );
    }
  }, [storageState.listRepositionBlockId]);

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

  const selectCategory = () => {
    if (storageState.selectedCategory !== props.dataBlock.category) {
      storageDispatch({
        type: tStorageActionTypes.setSelectedCategory,
        payload: props.dataBlock.category,
      });
    }
  };

  return (
    <div className="flex flex-wrap flex-col bg-[#fff] shadow-[0_0_0_1px_#d7d7d7] rounded-[3px]">
      <div className="flex flex-wrap justify-between p-[10px] bg-[#fff] shadow-[inset_0_0_15px_0_#e7e7e7] rounded-[3px_3px_0_0] w-full">
        <span className="font-[500]">{props.dataBlock.title}</span>
        <span
          title="Category"
          className="text-[#0000ff] hover:underline cursor-pointer"
          onClick={selectCategory}
        >
          {props.dataBlock.category && `#${props.dataBlock.category}#`}
        </span>
      </div>
      <div className="p-[10px] flex-[1_1_auto] whitespace-pre-line w-full">
        {props.dataBlock.data}
      </div>
      <div className="flex flex-wrap justify-between gap-[15px] p-[10px] bg-[#f7f7f7] shadow-[inset_0_0_15px_0_#d0d0d0] rounded-[0_0_3px_3px] w-full">
        <div className="flex flex-wrap gap-[15px]">
          <IconButton
            style="hover"
            title="Edit data"
            leftIcon={<AiOutlineEdit />}
            action={() =>
              storageDispatch({
                type: tStorageActionTypes.setDataBlockEditor,
                payload: props.dataBlock,
              })
            }
          />
          <IconButton
            style="hover"
            title="Edit data"
            leftIcon={<AiOutlineDelete />}
            action={() =>
              storageDispatch({
                type: tStorageActionTypes.setCustomConfirm,
                payload: deleteConfirm,
              })
            }
          />
        </div>
        <div className="flex flex-wrap gap-[15px]">{buttons}</div>
      </div>
    </div>
  );
}

export default ListBodyElement;
