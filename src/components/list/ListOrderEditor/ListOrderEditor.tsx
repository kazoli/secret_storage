import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';

import {
  arrayReorder,
  DEFAULT,
  tDropDownOption,
  tStorageActionTypes,
  tStorageDataBlock,
  tStorageInitialState,
  useAppContext,
} from '../../../utils';
import { defaultMessages } from '../../../providers/TranslationProvider';

import PopUp from '../../general/PopUp';
import CommentBlock from '../../general/CommentBlock';
import FormSelectBlock from '../../form/FormSelectBlock';
import FormButtonBlock from '../../form/FormButtonBlock';

import ListOrderCategoryBlock from '../ListOrderCategoryBlock';

const ListOrderEditor = () => {
  const translate = useIntl().formatMessage;
  const { storageState, storageDispatch } = useAppContext();

  const [order, setOrder] = useState<tDropDownOption['key']>(DEFAULT);
  const [categories, setCategories] = useState<
    tStorageInitialState['categories']
  >([]);

  useEffect(() => {
    // dropping first default category
    setCategories(storageState.categories.slice(1));
  }, [storageState.categories]);

  const options = [
    {
      key: DEFAULT,
      value: translate(defaultMessages.list.orderDefault),
    },
    {
      key: 'title-asc',
      value: translate(defaultMessages.list.orderTitleAsc),
    },
    {
      key: 'title-desc',
      value: translate(defaultMessages.list.orderTitleDesc),
    },
    {
      key: 'category-asc',
      value: translate(defaultMessages.list.orderCategoryAsc),
    },
    {
      key: 'category-desc',
      value: translate(defaultMessages.list.orderCategoryDesc),
    },
    {
      key: 'category-custom',
      value: translate(defaultMessages.list.orderCategoryCustom),
    },
  ];

  const reorderList = () => {
    if (order === DEFAULT) {
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
      text: translate(defaultMessages.list.reorderButton),
      action: reorderList,
    },
    {
      text: translate(defaultMessages.common.cancelButton),
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
        label={translate(defaultMessages.list.orderSelectorTitle)}
        selected={order}
        options={options}
        action={(value) => setOrder(value)}
      />
      {order === 'category-custom' && (
        <ListOrderCategoryBlock
          categories={categories}
          setCategories={setCategories}
        />
      )}
      <CommentBlock
        style="mt-[15px]"
        text={translate(defaultMessages.list.orderComment)}
      />
      <FormButtonBlock buttons={buttons} />
    </PopUp>
  );
};

export default ListOrderEditor;
