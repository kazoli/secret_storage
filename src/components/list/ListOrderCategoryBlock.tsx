import { useEffect, useState } from 'react';
import { tReposition } from '../../app/general/types';
import { tStorageInitialState } from '../../app/storage/storageTypes';
import { repositionBlocks } from '../../app/general/middlewares';
import { storageCategories } from '../../app/storage/storageMiddlewares';
import { useAppContext } from '../core/Context';
import ListRepositionButtons from './ListRepositionButtons';

type tProps = {
  visible: boolean;
};

function ListOrderCategoryBlock(props: tProps) {
  const { storageState } = useAppContext();
  const [categories, setCategories] = useState<
    tStorageInitialState['categories']
  >([]);
  const [selectedId, setSelectedId] = useState<tReposition['id'] | false>(
    false,
  );

  useEffect(() => {
    setCategories(storageCategories(storageState.decodedData, false));
  }, [storageState.decodedData]);

  const reposition = (selectedBlock: tReposition) => {
    if (selectedId !== false) {
      setCategories(
        repositionBlocks('key', categories, selectedId, selectedBlock),
      );
      setSelectedId(false);
    }
  };

  return (
    props.visible && (
      <div className="mt-[15px] grid sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[15px]">
        {categories.map((category) => (
          <span
            key={category.key}
            className="flex items-center gap-[5px] bg-[#fff] border border-[#d0d0d0] rounded-[3px] p-[5px]"
          >
            <ListRepositionButtons
              dataId={`${category.key}`}
              selectedId={selectedId}
              selectAction={setSelectedId}
              repositionAction={(position) =>
                reposition({ id: `${category.key}`, position })
              }
            />
            {category.value}
          </span>
        ))}
      </div>
    )
  );
}

export default ListOrderCategoryBlock;
