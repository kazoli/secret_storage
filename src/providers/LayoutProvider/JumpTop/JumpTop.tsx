import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { AiOutlineUpSquare } from 'react-icons/ai';

import { scrollToElement } from '../../../utils/general/middlewares';
import { defaultMessages } from '../../TranslationProvider';

const JumpTop = () => {
  const translate = useIntl().formatMessage;
  const [jumpTop, setJumpTop] = useState(false);

  useEffect(() => {
    // scroll handling function
    const handleScroll = () => {
      const overLimit = window.scrollY > 200;
      // triggers setJumpTop only when previous value is changing
      overLimit !== jumpTop && setJumpTop(overLimit);
    };
    // event listener
    window.addEventListener('scroll', handleScroll);
    // cleanup function
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jumpTop]);

  return (
    jumpTop && (
      <AiOutlineUpSquare
        className="fixed bottom-[15px] right-[15px] bg-[#909090] hover:bg-[#8563c5] text-[2rem] text-[#ffffff] cursor-pointer transition-custom opacity-50 hover:opacity-100 z-[1000] rounded-[3px]"
        title={translate(defaultMessages.common.jumpTop)}
        onClick={() => scrollToElement('smooth')}
      />
    )
  );
};

export default JumpTop;
