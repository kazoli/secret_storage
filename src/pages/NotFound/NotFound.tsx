import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import LayoutProvider from '../../providers/LayoutProvider';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Not found';
  }, []);

  return (
    <LayoutProvider>
      <div className="flex flex-wrap">
        <h1 className="w-full text-[2rem]">Requested page is not found!</h1>
        <Link to="/" className="text-[#0000ff] text-[1.25rem] hover:underline">
          Go back to main page
        </Link>
      </div>
    </LayoutProvider>
  );
};

export default NotFound;
