import { useEffect, useState } from 'react';
import { tStorageInitialState } from '../../app/storage/storageTypes';
import { storageCategories } from '../../app/storage/storageMiddlewares';
import { useAppContext } from '../core/Context';
import { GiMove } from 'react-icons/gi';

type tProps = {
  visible: boolean;
};

function ListOrderCategoryBlock(props: tProps) {
  const { storageState } = useAppContext();
  const [categories, setCategories] = useState<
    tStorageInitialState['categories']
  >([]);

  useEffect(() => {
    setCategories(storageCategories(storageState.decodedData, false));
  }, [storageState.decodedData]);

  return (
    props.visible && (
      <div className="mt-[15px] grid sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[15px]">
        {categories.map((category) => (
          <span
            key={category.key}
            className="flex items-center gap-[5px] bg-[#fff] border border-[#d0d0d0] rounded-[3px] p-[5px]"
          >
            <GiMove className="icon-button hover" />
            {category.value}
          </span>
        ))}
      </div>
    )
  );
}

export default ListOrderCategoryBlock;
