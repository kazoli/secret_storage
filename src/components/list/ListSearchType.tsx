import { useMemo } from 'react';
import { tDropDownOption } from '../../app/general/types';
import {
  tStorageActionTypes,
  tStorageInitialState,
} from '../../app/storage/storageTypes';
import { storageSearchTypes } from '../../app/storage/storageInitialStates';
import { useAppContext } from '../core/Context';
import DropDownMenu from '../general/DropDownMenu';
import DropDownSelector from '../general/DropDownSelector';

type tDropDown = { selected: string | JSX.Element; options: tDropDownOption[] };

function ListSearchType() {
  const { storageState, storageDispatch } = useAppContext();

  const dropDown: tDropDown = useMemo(() => {
    const dropDown: tDropDown = { selected: '', options: [] };
    storageSearchTypes.forEach((searchType) => {
      if (searchType.key === storageState.searchType) {
        dropDown.selected = <DropDownSelector selected={searchType.value} />;
      } else {
        dropDown.options = [...dropDown.options, searchType];
      }
    });
    if (!dropDown.selected) {
      // select first option if empty or wrong default value
      dropDown.selected = (
        <DropDownSelector selected={storageSearchTypes[0].value} />
      );
      // drop the first option from list
      dropDown.options.shift();
    }
    return dropDown;
  }, [storageState.searchType]);

  return (
    <DropDownMenu
      selector={dropDown.selected}
      classContainer="list-element items-start"
      classList="left-0 mt-[35px] whitespace-nowrap"
      classElement="transition-custom block cursor-pointer mt-[5px] p-[10px] bg-[#fff] shadow-[inset_0_0_5px_0_#fff,0_0_0_1px_#d0d0d0] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] rounded-[3px]"
      options={dropDown.options}
      action={(value) =>
        storageDispatch({
          type: tStorageActionTypes.setSearchType,
          payload: value as tStorageInitialState['searchType'],
        })
      }
    />
  );
}

export default ListSearchType;
