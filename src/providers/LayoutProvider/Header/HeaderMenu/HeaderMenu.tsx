import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { HiOutlineMenu } from 'react-icons/hi';

import {
  storageConfirmDefaultCancel,
  storageExportConfirm,
  tCustomConfirm,
  tDropDownOption,
  tRouteNames,
  tStorageActionTypes,
  useAppContext,
} from '../../../../utils';
import DropDownMenu from '../../../../components/general/DropDownMenu';

import { defaultMessages } from '../../../TranslationProvider';

import { tProps } from './types';

const HeaderMenu = (props: tProps) => {
  const translate = useIntl().formatMessage;
  const navigate = useNavigate();
  const { storageState, storageDispatch } = useAppContext();

  const options = storageState.loggedIn
    ? [
        {
          key: 'list',
          value: translate(defaultMessages.header.menuList),
        },
        {
          key: 'changePassword',
          value: translate(defaultMessages.header.menuChangePassword),
        },
        {
          key: 'exportAvailable',
          value: translate(defaultMessages.header.menuExportData),
        },
        {
          key: 'logOut',
          value: translate(defaultMessages.header.menuLogOut),
        },
      ]
    : [
        {
          key: 'logIn',
          value: translate(defaultMessages.header.menuLogIn),
        },
      ];

  const logOutConfirm: tCustomConfirm = {
    text: translate(defaultMessages.header.logOutConfirmTitle),
    ok: {
      text: translate(defaultMessages.header.logOutConfirmOk),
      action: () => {
        storageDispatch({ type: tStorageActionTypes.logOut });
      },
    },
    cancel: storageConfirmDefaultCancel(storageDispatch, translate),
  };

  const action = (value: tDropDownOption['key']) => {
    switch (value) {
      case 'logIn':
        navigate(tRouteNames.LOGIN);
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
        navigate(tRouteNames.CHANGE_PASSWORD);
        break;
      case 'exportAvailable':
        storageDispatch({
          type: tStorageActionTypes.setCustomConfirm,
          payload: storageExportConfirm(
            storageState.fileName,
            storageState.decodedData,
            storageState.encodedPassword,
            storageDispatch,
            translate,
          ),
        });
        break;
      default:
        navigate(tRouteNames.HOME);
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
};

export default HeaderMenu;
