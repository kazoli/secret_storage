import { useIntl } from 'react-intl';
import { defaultMessages } from '../../../providers/TranslationProvider';
import {
  storageExportConfirm,
  tStorageActionTypes,
  useAppContext,
} from '../../../utils';

const ListExportButton = () => {
  const translate = useIntl().formatMessage;
  const { storageState, storageDispatch } = useAppContext();

  return (
    <button
      onClick={() =>
        storageDispatch({
          type: tStorageActionTypes.setCustomConfirm,
          payload: storageExportConfirm(
            storageState.fileName,
            storageState.decodedData,
            storageState.encodedPassword,
            storageDispatch,
            translate,
          ),
        })
      }
      className="fixed flex content-center p-[0_10px] h-[2rem] bottom-[15px] right-[65px] bg-[#909090] hover:bg-[#8563c5] shadow-[inset_0_0_0_2px_#fff] border-[3.5px] border-[#909090] hover:border-[#8563c5] text-[#ffffff] cursor-pointer transition-custom opacity-50 hover:opacity-100 z-[1000] rounded-[3px]"
    >
      {translate(defaultMessages.list.exportDataButton)}
    </button>
  );
};

export default ListExportButton;
