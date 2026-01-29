import { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from 'react-icons/ai';

import { defaultMessages } from '../../../providers/TranslationProvider';
import {
  repositionBlocks,
  storageConfirmDefaultCancel,
  storageInitialState,
  tCustomConfirm,
  tStorageActionTypes,
  tReposition,
  useAppContext,
} from '../../../utils';

import IconButton from '../../general/IconButton';

import ListRepositionButtons from '../ListRepositionButtons';

import { tProps } from './types';

const ListBodyElement = (props: tProps) => {
  const translate = useIntl().formatMessage;
  const { storageState, storageDispatch } = useAppContext();

  const [show, setShow] = useState(false);

  const deleteConfirm: tCustomConfirm = {
    text: translate(defaultMessages.list.deleteDataConfirmTitle, {
      title: props.dataBlock.title,
    }),
    encodedPassword: storageState.encodedPassword,
    setLoading: (value) => {
      storageDispatch({
        type: tStorageActionTypes.setStatus,
        payload: value ? 'loading' : 'idle',
      });
    },
    ok: {
      text: translate(defaultMessages.list.deleteDataConfirmOk),
      action: () => {
        storageDispatch({
          type: tStorageActionTypes.deleteDataBlock,
          payload: props.dataBlock.id,
        });
      },
    },
    cancel: storageConfirmDefaultCancel(storageDispatch, translate),
  };

  const repositionAction = (position: tReposition['position']) => {
    storageDispatch({
      type: tStorageActionTypes.setReorderedList,
      payload: repositionBlocks(
        'id',
        storageState.decodedData,
        storageState.listRepositionBlockId as tReposition['id'],
        { id: props.dataBlock.id, position: position },
      ),
    });
  };

  return (
    <div className="flex flex-wrap flex-col bg-[#fff] shadow-[0_0_0_1px_#d7d7d7] rounded-[3px]">
      <div className="flex flex-wrap justify-between p-[10px] bg-[#fff] shadow-[inset_0_0_15px_0_#e7e7e7] rounded-[3px_3px_0_0] w-full">
        <span className="font-[500]">{props.dataBlock.title}</span>
        <span
          title={
            storageState.selectedCategory === props.dataBlock.category
              ? translate(defaultMessages.list.removeCategoryFilterLink)
              : translate(defaultMessages.list.categoryFilterLink, {
                  category: props.dataBlock.category,
                })
          }
          className="text-[#0000ff] hover:underline cursor-pointer"
          onClick={() => {
            storageDispatch({
              type: tStorageActionTypes.setSelectedCategory,
              payload:
                storageState.selectedCategory === props.dataBlock.category
                  ? storageInitialState.selectedCategory
                  : props.dataBlock.category,
            });
          }}
        >
          {props.dataBlock.category}
        </span>
      </div>
      <div className="p-[10px] flex-[1_1_auto] whitespace-pre-line w-full">
        {show ? (
          props.dataBlock.data
        ) : (
          <span
            onClick={() => setShow(!show)}
            className="text-[#0000ff] hover:underline cursor-pointer"
          >
            {translate(defaultMessages.list.itemDataShowButton)}
          </span>
        )}
      </div>
      <div className="flex flex-wrap justify-between gap-[15px] p-[10px] bg-[#f7f7f7] shadow-[inset_0_0_15px_0_#d0d0d0] rounded-[0_0_3px_3px] w-full">
        <div className="flex flex-wrap gap-[15px]">
          <IconButton
            style="hover"
            title={
              show
                ? translate(defaultMessages.list.itemDataHideButton)
                : translate(defaultMessages.list.itemDataShowButton)
            }
            leftIcon={show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            action={() => setShow(!show)}
          />
          <IconButton
            style="hover"
            title={translate(defaultMessages.list.itemDataEditButton)}
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
            title={translate(defaultMessages.list.itemDataDeleteButton)}
            leftIcon={<AiOutlineDelete />}
            action={() =>
              storageDispatch({
                type: tStorageActionTypes.setCustomConfirm,
                payload: deleteConfirm,
              })
            }
          />
        </div>
        <div className="flex flex-wrap gap-[15px]">
          <ListRepositionButtons
            dataId={props.dataBlock.id}
            selectedId={storageState.listRepositionBlockId}
            selectAction={(selectedId) =>
              storageDispatch({
                type: tStorageActionTypes.setListRepositionBlockId,
                payload: selectedId,
              })
            }
            repositionAction={repositionAction}
          />
        </div>
      </div>
    </div>
  );
};

export default ListBodyElement;
