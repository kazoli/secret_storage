import { useState } from 'react';
import { tDropDownOption } from '../../app/general/types';
import { tStorageActionTypes } from '../../app/storage/storageTypes';
import { useAppContext } from '../core/Context';
import PopUp from '../general/PopUp';
import FormSelectBlock from '../form/FormSelectBlock';
import ListOrderCategoryBlock from './ListOrderCategoryBlock';
import CommentBlock from '../general/CommentBlock';
import FormButtonBlock from '../form/FormButtonBlock';

function ListOrderEditor() {
  const { storageDispatch } = useAppContext();
  const [order, setOrder] = useState<tDropDownOption['key']>('');

  const options = [
    {
      key: '',
      value: 'Current order',
    },
    {
      key: 'titleAsc',
      value: 'Title (A-Z)',
    },
    {
      key: 'titleDesc',
      value: 'Title (Z-A)',
    },
    {
      key: 'categoryAsc',
      value: 'Category (A-Z)',
    },
    {
      key: 'categoryDesc',
      value: 'Category (Z-A)',
    },
    {
      key: 'categoryCustom',
      value: 'Category (My own order)',
    },
  ];

  const buttons = [
    {
      text: 'Reorder list',
      action: () => {
        console.log('reorder list action'); // TODO
      },
    },
    {
      text: 'Cancel',
      action: () =>
        storageDispatch({
          type: tStorageActionTypes.setListOrderEditor,
          payload: false,
        }),
    },
  ];

  return (
    <PopUp>
      <FormSelectBlock
        label="List order"
        selected={order}
        options={options}
        action={(value) => setOrder(value)}
      />
      <ListOrderCategoryBlock visible={order === 'categoryCustom'} />
      <CommentBlock
        style="mt-[15px]"
        text="You need to export data to keep the new order. If you would like the category order primarily and the title order inside a category, then first reorder accoring to title and after according to category."
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
}

export default ListOrderEditor;
