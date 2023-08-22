import { useState } from 'react';
import { tReposition } from '../../app/general/types';
import { tStorageInitialState } from '../../app/storage/storageTypes';
import { repositionBlocks } from '../../app/general/middlewares';
import ListRepositionButtons from './ListRepositionButtons';

type tProps = {
  visible: boolean;
  categories: tStorageInitialState['categories'];
  setCategories: React.Dispatch<
    React.SetStateAction<tStorageInitialState['categories']>
  >;
};

function ListOrderCategoryBlock(props: tProps) {
  const [selectedId, setSelectedId] = useState<tReposition['id'] | false>(
    false,
  );

  const reposition = (selectedBlock: tReposition) => {
    if (selectedId !== false) {
      props.setCategories(
        repositionBlocks('key', props.categories, selectedId, selectedBlock),
      );
      setSelectedId(false);
    }
  };

  return (
    props.visible && (
      <div className="mt-[15px] grid sm:grid-cols-[repeat(auto-fill,minmax(265px,1fr))] gap-[15px]">
        {props.categories.map((category) => {
          const categoryKey = category.key.toString();
          return (
            <span
              key={categoryKey}
              className="flex items-center gap-[5px] bg-[#fff] border border-[#d0d0d0] rounded-[3px] p-[5px]"
            >
              <ListRepositionButtons
                dataId={categoryKey}
                selectedId={selectedId}
                selectAction={setSelectedId}
                repositionAction={(position) =>
                  reposition({ id: categoryKey, position })
                }
              />
              {category.value}
            </span>
          );
        })}
      </div>
    )
  );
}

export default ListOrderCategoryBlock;
