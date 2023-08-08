import { useEffect, useMemo } from 'react';
import { tDropDownOption, tSelect } from './types';
import { useAppContext } from '../../components/core/Context';

// Hook to not loose data if leave page without exporting
export function useBeforeUnloadConfirm() {
  const { storageState } = useAppContext();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (storageState.exportAvailable) {
        event.preventDefault();
        event.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [storageState.exportAvailable]);
}

// Hook to select-like drop-down data processing
export function useSelectData(
  options: tDropDownOption[],
  selected: tDropDownOption['key'],
) {
  const selectData = useMemo(() => {
    const selectData: tSelect = { selected: '', options: [] };
    options.forEach((option) => {
      if (option.key === selected) {
        // add selected element value
        selectData.selected = option.value;
      } else {
        // push unselected option to options
        selectData.options.push(option);
      }
    });
    if (!selectData.selected) {
      // select first option if empty or wrong selected value was sent
      selectData.selected = options[0].value;
      // drop the first option from list
      selectData.options.shift();
    }
    return selectData;
  }, [options, selected]);
  return selectData;
}
