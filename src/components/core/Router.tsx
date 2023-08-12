import { HashRouter, Routes, Route } from 'react-router-dom';
import List from '../pages/List';
import LogIn from '../pages/LogIn';
import ChangePassword from '../pages/ChangePassword';
import NotFound from '../pages/NotFound';

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;
