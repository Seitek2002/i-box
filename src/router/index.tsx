import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Cart from 'pages/Cart';
import Home from 'pages/Home';
import Order from 'pages/Order';
import Scan from 'pages/Scan';
import ProtectedRoute from 'components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Scan />} />
        <Route path='/I/:venue' element={<Home />} />
        <Route path='/I/:venue/:venueId/:id' element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='/orders/:id' element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
