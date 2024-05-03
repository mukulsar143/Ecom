import "./cart.css";
import { Link } from "react-router-dom";
import { AiOutlineClose } from 'react-icons/ai';
import { useState } from "react";

export default function Cart({ cart, setCart }) {
  const [total, setTotal] = useState(0);

  // Function to increment item quantity in the cart
  const inccart = (product) => {
    const updatedCart = cart.map(item => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    setCart(updatedCart);
    updateTotal(updatedCart);
  };

  // Function to decrement item quantity in the cart
  const deccart = (product) => {
    const updatedCart = cart.map(item => {
      if (item.id === product.id && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setCart(updatedCart);
    updateTotal(updatedCart);
  };

  // Function to remove item from the cart
  const remcart = (product) => {
    const updatedCart = cart.filter(item => item.id !== product.id);
    setCart(updatedCart);
    updateTotal(updatedCart);
  };

  // Function to calculate total price
  const updateTotal = (cart) => {
    const totalPrice = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    setTotal(totalPrice);
  };

  return (
    <>
      <div className="cart">
        <h3># CART</h3>
        {cart.length === 0 && (
          <>
            <div className="empty_cart">
              <h2>Empty Cart</h2>
              <Link to="/shop">
                <button>Shopping</button>
              </Link>
            </div>
          </>
        )}
        <div className="container">
          {cart.map((pro) => {
            return (
              <div className="box" key={pro.id}>
                <div className="img_box">
                  <img src={pro.image} alt="" />
                </div>
                <div className="details">
                  <div className="info">
                    <h4>{pro.category}</h4>
                    <h3>{pro.name}</h3>
                    <p>Price: ${pro.price}</p>
                    <p>Total: ${pro.price * pro.quantity}</p>
                  </div>
                  <div className="quantity">
                    <button onClick={() => inccart(pro)}>+</button>
                    <input type="number" value={pro.quantity} readOnly />
                    <button onClick={() => deccart(pro)}>-</button>
                  </div>
                  <div className="icon">
                    <button onClick={() => remcart(pro)}>
                      <AiOutlineClose />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bottom">
          {
            cart.length > 0 &&
            <div className="total">
              <h4>Total: ${total}</h4>
              <button>Checkout</button>
            </div>
          }
        </div>
      </div>
    </>
  );
}
