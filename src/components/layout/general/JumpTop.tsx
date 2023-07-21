import { useEffect, useState } from 'react';
import { scrollToElement } from '../../../app/general/middlewares';
import { AiOutlineUpSquare } from 'react-icons/ai';

function JumpTop() {
  const [jumpTop, setJumpTop] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => setJumpTop(window.scrollY > 20));
  }, []);

  return (
    <>
      {jumpTop && (
        <AiOutlineUpSquare
          className="fixed bottom-[15px] right-[15px] bg-[#909090] hover:bg-[#8563c5] text-[2rem] text-[#ffffff] cursor-pointer transition-custom opacity-50 hover:opacity-100 z-[1000] rounded-[3px]"
          title="Jump top"
          onClick={() => scrollToElement('smooth')}
        />
      )}
    </>
  );
}

export default JumpTop;
