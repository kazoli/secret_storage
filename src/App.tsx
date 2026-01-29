import ContextProvider from './providers/ContextProvider';
import RouterProvider from './providers/RouterProvider';
import TranslationProvider from './providers/TranslationProvider';

const App = () => {
  return (
    <TranslationProvider>
      <ContextProvider>
        <RouterProvider />
      </ContextProvider>
    </TranslationProvider>
  );
};

export default App;
