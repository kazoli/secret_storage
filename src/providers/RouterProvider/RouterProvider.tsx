import { BrowserRouter as HashRouter, Routes, Route } from 'react-router-dom';

import List from '../../pages/List';
import Login from '../../pages/Login';
import ChangePassword from '../../pages/ChangePassword';
import NotFound from '../../pages/NotFound';

import { tRouteNames } from './types';

const RouterProvider = () => {
  return (
    <HashRouter>
      <Routes>
        <Route index path={tRouteNames.LOGIN} element={<Login />} />
        <Route path={tRouteNames.HOME} element={<List />} />
        <Route
          path={tRouteNames.CHANGE_PASSWORD}
          element={<ChangePassword />}
        />
        <Route path={tRouteNames.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterProvider;
