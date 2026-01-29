import { NavLink } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FcDataEncryption } from 'react-icons/fc';
import { defaultMessages } from '../../../TranslationProvider';

const HeaderLogo = () => {
  const translate = useIntl().formatMessage;

  return (
    <NavLink
      to="/"
      className="flex flex-[1_1_150px] items-center cursor-pointer text-inherit no-underline"
    >
      <FcDataEncryption className="text-[2rem]" />
      <span className="text-[1.2rem] sm:text-[1.5rem] px-[5px]">
        {translate(defaultMessages.header.logoTitle)}
      </span>
    </NavLink>
  );
};

export default HeaderLogo;
