import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Eroute from "./Components/Route/Eroute";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";

function App() {
  const [products, setproduct] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);

  // Function to fetch all trending products
  const allTrendingProducts = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/products/");
      const json = await res.json();
      setproduct(json);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Function to search for products
  const searchProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/?search=${search}`);
      const json = await res.json();
      setproduct(json);
    } catch (error) {
      console.error("Error searching products:", error);
    }
  };

  // Function to add item to the cart
  const addToCart = (product) => {
    // Check if the user is logged in
    if (localStorage.getItem("token")) {
      const updatedCart = [...cart];
      const foundItem = updatedCart.find(item => item.id === product.id);

      if (foundItem) {
        foundItem.quantity++;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }

      setCart(updatedCart);
      updateTotal(updatedCart);
    } else {
      alert("Please log in to add items to the cart");
    }
  };

  // Function to calculate total price
  const updateTotal = (cart) => {
    const totalPrice = cart.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
    // You can perform any other operations related to the total price here
  };

  return (
    <>
      <BrowserRouter>
        <Navbar setSearch={setSearch} search={search} searchProduct={searchProduct} />
        <Eroute allTrendingProducts={allTrendingProducts} cart={cart} setCart={setCart} products={products} addToCart={addToCart} setproduct={setproduct} />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
