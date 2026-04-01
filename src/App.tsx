/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import HowItWorks from './pages/HowItWorks';
import Catering from './pages/Catering';
import About from './pages/About';
import Contact from './pages/Contact';
import CustomOrders from './pages/CustomOrders';
import Reviews from './pages/Reviews';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="how-it-works" element={<HowItWorks />} />
            <Route path="catering" element={<Catering />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="custom-orders" element={<CustomOrders />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="terms" element={<Terms />} />
            <Route path="refund" element={<Refund />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
