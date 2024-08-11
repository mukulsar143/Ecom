import React, { useState } from 'react';
import './checkout.css'; // Import the CSS file

function Checkout() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(form);
    alert('Order placed successfully!');
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <h2>Shipping Information</h2>
        <label>
          Name:
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={form.address} onChange={handleChange} required />
        </label>
        <label>
          City:
          <input type="text" name="city" value={form.city} onChange={handleChange} required />
        </label>
        <label>
          State:
          <input type="text" name="state" value={form.state} onChange={handleChange} required />
        </label>
        <label>
          ZIP Code:
          <input type="text" name="zip" value={form.zip} onChange={handleChange} required />
        </label>

        <h2>Payment Information</h2>
        <label>
          Card Number:
          <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} required />
        </label>
        <label>
          Expiry Date:
          <input type="text" name="expiryDate" value={form.expiryDate} onChange={handleChange} required />
        </label>
        <label>
          CVV:
          <input type="text" name="cvv" value={form.cvv} onChange={handleChange} required />
        </label>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default Checkout;
