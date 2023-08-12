import { useEffect } from 'react';

type tProps = {
  children: React.ReactNode;
  style?: string;
};

function PopUp(props: tProps) {
  useEffect(() => {
    // stop scrolling of body
    document.body.setAttribute('style', 'overflow: hidden');
    // set back scrolling of body
    return () => document.body.removeAttribute('style');
  }, []);

  return (
    <div className="fixed inset-0 h-[100vh] overflow-auto bg-black/70 z-[5000] flex justify-center items-center">
      <div
        className={`p-[10px] h-[fit-content] m-[auto_15px] w-[1200px] bg-[#fff] shadow-[0_0_10px_1px_#000,inset_0_0_2px_0_#000] rounded-[3px] ${
          props.style ?? ''
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default PopUp;
