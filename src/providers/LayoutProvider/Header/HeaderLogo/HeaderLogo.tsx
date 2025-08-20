import { NavLink } from 'react-router-dom';
import { FcDataEncryption } from 'react-icons/fc';

const HeaderLogo = () => {
  return (
    <NavLink to="/" className="flex items-center cursor-pointer">
      <FcDataEncryption className="text-[2rem]" />
      <span className="text-[1.2rem] sm:text-[1.5rem] px-[5px]">
        Secret Storage
      </span>
    </NavLink>
  );
};

export default HeaderLogo;
