import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useBeforeUnloadConfirm } from '../../utils/general/hooks';
import { scrollToElement } from '../../utils/general/middlewares';

import Loading from './Loading';
import Header from './Header';
import Footer from './Footer';
import JumpTop from './JumpTop';
import { tProps } from './types';

const LayoutProvider = (props: tProps) => {
  useEffect(() => {
    // scroll top in case of page change
    scrollToElement();
  }, []);

  // if user try to leave page without exporting modifications
  useBeforeUnloadConfirm();

  return (
    <>
      {props.loading && <Loading />}
      <Header />
      <main className="content-positioner py-[20px] sm:py-[50px] min-h-[100vh]">
        {props.children}
      </main>
      <Footer />
      <JumpTop />
      <ToastContainer autoClose={5000} className="whitespace-pre-line" />
    </>
  );
};

export default LayoutProvider;
