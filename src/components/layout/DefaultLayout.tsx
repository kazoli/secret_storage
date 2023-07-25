import { useEffect } from 'react';
import { useBeforeUnloadConfirm } from '../../app/general/hooks';
import { scrollToElement } from '../../app/general/middlewares';
import Loading from './general/Loading';
import Header from './header/Header';
import Footer from './footer/Footer';
import JumpTop from './general/JumpTop';

type tProps = {
  children: JSX.Element;
  loading?: boolean;
};

function DefaultLayout(props: tProps) {
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
      <main className="content-positioner py-[20px] sm:py-[50px]">
        {props.children}
      </main>
      <Footer />
      <JumpTop />
    </>
  );
}

export default DefaultLayout;
