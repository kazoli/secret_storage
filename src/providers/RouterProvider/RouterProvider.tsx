import { BrowserRouter, Routes, Route } from 'react-router-dom';

import List from '../../pages/List';
import Login from '../../pages/Login';
import ChangePassword from '../../pages/ChangePassword';
import NotFound from '../../pages/NotFound';

import { tRouteNames } from './types';

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={tRouteNames.HOME} element={<List />} />
        <Route path={tRouteNames.LOGIN} element={<Login />} />
        <Route
          path={tRouteNames.CHANGE_PASSWORD}
          element={<ChangePassword />}
        />
        <Route path={tRouteNames.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
