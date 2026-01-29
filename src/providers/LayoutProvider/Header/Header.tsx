import { useEffect, useState } from 'react';
import HeaderLogo from './HeaderLogo';
import HeaderMenu from './HeaderMenu';
import HeaderLanguageSelector from './HeaderLanguageSelector';

const Header = () => {
  const initialPosition = 'top-0';
  const [position, setPosition] = useState(initialPosition);

  // header show only at scrolling up
  useEffect(() => {
    const prev = { top: window.scrollY, position: initialPosition };
    const updateScrollDirection = () => {
      const currPosition =
        window.scrollY > prev.top ? 'top-[-100px]' : initialPosition;
      if (prev.position !== currPosition) {
        // scroll direction change
        setPosition(currPosition);
        // current position becomes prev position
        prev.position = currPosition;
      }
      prev.top = window.scrollY;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      // unmount
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, []);

  return (
    <header
      className={`${position} sticky top-0 z-[1000] py-[10px] bg-[#fff] shadow-[inset_0_0_10px_0_#777,0_0_2px_0_#777] border-y border-[#777] transition-all duration-500`}
    >
      <div className="content-positioner flex items-center justify-between gap-[15px]">
        <HeaderLogo />
        <div className="flex flex-wrap items-center gap-[15px] justify-end">
          <HeaderLanguageSelector hide={position !== initialPosition} />
          <HeaderMenu hide={position !== initialPosition} />
        </div>
      </div>
    </header>
  );
};

export default Header;
