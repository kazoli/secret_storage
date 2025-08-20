import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextProvider from './providers/ContextProvider';
import RouterProvider from './providers/RouterProvider';

const App = () => {
  return (
    <ContextProvider>
      <RouterProvider />
      <ToastContainer autoClose={5000} className="whitespace-pre-line" />
    </ContextProvider>
  );
};

export default App;
