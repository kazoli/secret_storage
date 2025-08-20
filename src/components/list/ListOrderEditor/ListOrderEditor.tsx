import { useState, useEffect } from 'react';

import {
  arrayReorder,
  storageCategories,
  tDropDownOption,
  tStorageActionTypes,
  tStorageDataBlock,
  tStorageInitialState,
  useAppContext,
} from '../../../utils';

import PopUp from '../../general/PopUp';
import FormSelectBlock from '../../form/FormSelectBlock';
import CommentBlock from '../../general/CommentBlock';
import FormButtonBlock from '../../form/FormButtonBlock';

import ListOrderCategoryBlock from '../ListOrderCategoryBlock';

const ListOrderEditor = () => {
  const { storageState, storageDispatch } = useAppContext();
  const [order, setOrder] = useState<tDropDownOption['key']>('default');
  const [categories, setCategories] = useState<
    tStorageInitialState['categories']
  >([]);

  useEffect(() => {
    setCategories(storageCategories(storageState.decodedData, false));
  }, [storageState.decodedData]);

  const options = [
    {
      key: 'default',
      value: 'Current order',
    },
    {
      key: 'title-asc',
      value: 'Title (A-Z)',
    },
    {
      key: 'title-desc',
      value: 'Title (Z-A)',
    },
    {
      key: 'category-asc',
      value: 'Category (A-Z)',
    },
    {
      key: 'category-desc',
      value: 'Category (Z-A)',
    },
    {
      key: 'category-custom',
      value: 'Category (My own order)',
    },
  ];

  const reorderList = () => {
    if (order === 'default') {
      storageDispatch({
        type: tStorageActionTypes.setListOrderEditor,
        payload: false,
      });
    } else {
      const orderParts = order.toString().split('-');
      let ordering = orderParts[1] as string | tDropDownOption['key'][];
      if (orderParts[0] === 'category' && orderParts[1] === 'custom') {
        ordering = categories.map((category) => category.key);
      }
      storageDispatch({
        type: tStorageActionTypes.setReorderedList,
        payload: arrayReorder(
          storageState.decodedData,
          orderParts[0] as keyof tStorageDataBlock,
          ordering,
        ),
      });
    }
  };

  const buttons = [
    {
      text: 'Reorder list',
      action: reorderList,
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
      <ListOrderCategoryBlock
        visible={order === 'category-custom'}
        categories={categories}
        setCategories={setCategories}
      />
      <CommentBlock
        style="mt-[15px]"
        text="You need to export data to keep the new order. If you would like the category order primarily and the title order inside a category, then first reorder by title and next by category."
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default ListOrderEditor;
