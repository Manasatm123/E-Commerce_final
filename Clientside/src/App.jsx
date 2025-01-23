import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ForgotPwd from "./components/ForgotPwd";
import Resetpwd from "./components/Resetpwd";
import Profile from "./components/Profile";
import Sellerprofile from "./components/Sellerprofile";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import Category from './components/Category'
import Cart from './components/Cart'
import MyOrder from './components/MyOrder'
import ProductDetailsPage from "./components/productDetailsPage";
import SellerOrder from './components/SellerOrder'

import Wishlist from './components/Wishlist'

function App() {
   const[name,setName]=useState("")
  return (
    <>
      <Router>
        <NavBar setName={setName}/>
        <Routes>
          <Route path="/" element={<Home name={name}/>}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/forgotpwd" element={<ForgotPwd/>}/>
          <Route path="/resetpwd" element={<Resetpwd/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/sellerprofile" element={<Sellerprofile/>}/>
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/productdetails/:productId" element={<ProductDetails/>}/>
          <Route path="/category/:category" element={<Category/>}/>
          <Route  path="/cart" element={<Cart/>}/>
          <Route path="/MyOrder" element={<MyOrder/>}/>
          <Route path="/productdetailspage/:productId" element={<ProductDetailsPage/>}/>
          <Route path="/sellerorder" element={<SellerOrder/>}/>

          <Route path="/wishlist" element={<Wishlist/>}/>

          
        </Routes>
      </Router>
    </>
  );
}
export default App;
