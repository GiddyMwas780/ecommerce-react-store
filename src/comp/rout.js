import React from 'react';
import { Routes, Route } from 'react-router';
import Home from './home';
import Shop from './shop';
import Cart from './cart';
import Contact from './contact';
import AdminOrders from './AdminOrders';
import AdminAddProduct from "./AdminAddProduct";

const Rout = ({ shop, filter, allcatefilter, addtocart, cart, setCart, categories, maxPrice, handlePriceChange }) => {
  return (
    <Routes>
      {/* 1. Home Page */}
      <Route path='/' element={<Home addtocart={addtocart} />} />
      
      {/* 2. Cart Page */}
      <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
      
      {/* 3. Shop Page (With Category & Price Props) */}
      <Route path='/shop' element={
        <Shop 
          shop={shop} 
          categories={categories} 
          filter={filter} 
          allcatefilter={allcatefilter} 
          addtocart={addtocart} 
          maxPrice={maxPrice}
          handlePriceChange={handlePriceChange}
        />
      } />
      
      {/* 4. Contact Page (Restored) */}
      <Route path='/contact' element={<Contact />} />      
      
      {/* 5. Admin Pages (Restored) */}
      <Route path='/admin/orders' element={<AdminOrders />} />
      <Route path="/admin/add-product" element={<AdminAddProduct />} />
    </Routes>
  );
};

export default Rout;