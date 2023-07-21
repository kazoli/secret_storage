import { ContextProvider } from './Context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from './Router';

function App() {
  return (
    <ContextProvider>
      <Router />
      <ToastContainer autoClose={5000} className="whitespace-pre-line" />
    </ContextProvider>
  );
}

export default App;
