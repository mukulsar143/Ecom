import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from '../Home/Home';
import Shop from '../Shops/Shop';
import Cart from '../Carts/Cart';
import Contact from '../Contact/Contact';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Checkout from '../Checkout/Checkout';


export default function Eroute({allTrendingProducts, products, setproduct, addToCart, total, setTotal ,  cart, setCart}) {
  return (
    <>
    <Routes>
        <Route exact path='/' element={<Home addToCart = {addToCart} products = {products} setproduct = {setproduct} />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/checkout' element={<Checkout />}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='/cart' element={<Cart cart = {cart} setCart = {setCart} total = {total} setTotal = {setTotal} />}></Route>
        <Route exact path='/shop' element={<Shop allTrendingProducts={allTrendingProducts} addToCart = {addToCart} products = {products} setproduct = {setproduct}/>}></Route>
        <Route exact path='/contact' element = {<Contact/>}></Route>
    </Routes>
    </>

  )
}
