import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ItemDetails from './pages/ItemDetails';
import Wishlist from './pages/Wishlist';
import FiltersPage from './pages/FiltersPage';
import RatingPage from './pages/RatingPage';
import CartPage from './pages/CartPage';

// 🔴 YEH IMPORT MISSING THA:
import ShippingPage from './pages/ShippingPage'; 

import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/item-details/:id" element={<ItemDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/filters" element={<FiltersPage />} />
            <Route path="/rating" element={<RatingPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;