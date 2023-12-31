import { useNavigate } from 'react-router-dom';
import { tCustomConfirm, tDropDownOption } from '../../../app/general/types';
import { tStorageActionTypes } from '../../../app/storage/storageTypes';
import {
  storageConfirmDefaultCancel,
  storageExportConfirm,
} from '../../../app/storage/storageMiddlewares';
import { useAppContext } from '../../core/Context';
import { HiOutlineMenu } from 'react-icons/hi';
import DropDownMenu from '../../general/DropDownMenu';

type tProps = {
  hide: boolean;
};

function HeaderMenu(props: tProps) {
  const navigate = useNavigate();
  const { storageState, storageDispatch } = useAppContext();

  const options = storageState.loggedIn
    ? [
        { key: 'list', value: 'Data list' },
        { key: 'changePassword', value: 'Change password' },
        { key: 'exportAvailable', value: 'Export data' },
        { key: 'logOut', value: 'Log out' },
      ]
    : [{ key: 'logIn', value: 'Log in' }];

  const logOutConfirm: tCustomConfirm = {
    text: 'You have changed data in the list and it has not been exported. Are you sure to continue to log out without exporting your data?',
    ok: {
      text: 'Continue',
      action: () => {
        storageDispatch({ type: tStorageActionTypes.logOut });
      },
    },
    cancel: storageConfirmDefaultCancel(storageDispatch),
  };

  const action = (value: tDropDownOption['key']) => {
    switch (value) {
      case 'logIn':
        navigate('/login');
        break;
      case 'logOut':
        if (storageState.exportAvailable) {
          storageDispatch({
            type: tStorageActionTypes.setCustomConfirm,
            payload: logOutConfirm,
          });
        } else {
          storageDispatch({ type: tStorageActionTypes.logOut });
        }
        break;
      case 'changePassword':
        navigate('/change-password');
        break;
      case 'exportAvailable':
        storageDispatch({
          type: tStorageActionTypes.setCustomConfirm,
          payload: storageExportConfirm(
            storageState.fileName,
            storageState.decodedData,
            storageState.encodedPassword,
            storageDispatch,
          ),
        });
        break;
      default:
        navigate('/');
    }
  };

  return (
    <DropDownMenu
      selected={
        <HiOutlineMenu className="text-[2rem] cursor-pointer outline-none" />
      }
      classContainer="relative"
      classTrigger=""
      classList={`${props.hide ? '!hidden' : ''} right-0 w-[max-content]`}
      classElement="transition-custom block cursor-pointer mt-[5px] p-[5px_10px] bg-[#ffffff] shadow-[inset_0_0_5px_0_#777] hover:shadow-[inset_0_0_3px_1px_#8563c5] hover:text-[#7a54bf] border border-[#777] hover:border-[#8563c5] rounded-[3px]"
      options={options}
      action={action}
    />
  );
}

export default HeaderMenu;
