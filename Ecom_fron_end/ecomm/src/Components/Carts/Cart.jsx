// src/components/Cart.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai';
import {
  fetchCart,
  updateCartItem,
  removeFromCart,
} from '../../redux/actions/cartActions';
import './cart.css';  

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const inccart = (product) => {
    const item = cart.find((item) => item.product.id === product.id);
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    dispatch(updateCartItem(updatedItem));
  };

  const deccart = (product) => {
    const item = cart.find((item) => item.product.id === product.id);
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      dispatch(updateCartItem(updatedItem));
    }
  };

  const remcart = (product) => {
    const item = cart.find((item) => item.product.id === product.id);
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart">
      <h3># CART</h3>
      {cart.length === 0 ? (
        <div className="empty_cart">
          <h2>Empty Cart</h2>
          <Link to="/shop">
            <button>Shopping</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="container">
            {cart.map((item) => (
              <div className="box" key={item.id}>
                <div className="img_box">
                  <img src={`http://127.0.0.1:8000/${item.product.image}/`} alt={item.product.name} />
                </div>
                <div className="details">
                  <div className="info">
                    <h4>{item.product.category}</h4>
                    <h3>{item.product.name}</h3>
                    <p>Price: ${item.product.price}</p>
                    <p>Total: ${item.product.price * item.quantity}</p>
                  </div>
                  <div className="quantity">
                    <button onClick={() => inccart(item.product)}>+</button>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => deccart(item.product)}>-</button>
                  </div>
                  <div className="icon">
                    <button onClick={() => remcart(item.product)}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bottom">
            <div className="total">
              <h4>Total: ${total}</h4>
              <Link to="/checkout">
                <button>Checkout</button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
