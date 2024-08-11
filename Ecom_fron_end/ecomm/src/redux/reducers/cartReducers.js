// src/redux/reducers/cartReducer.js
const initialState = {
    products: [],
    items: [],
    total: 0,
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS':
        return { ...state, products: action.payload };
      case 'FETCH_CART':
        const total = action.payload.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        return { ...state, items: action.payload, total };
      case 'ADD_TO_CART':
        const updatedAddCart = [...state.items, action.payload];
        const newTotalAdd = updatedAddCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        return { ...state, items: updatedAddCart, total: newTotalAdd };
      case 'UPDATE_CART_ITEM':
        const updatedCart = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
        const newTotalUpdate = updatedCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        return { ...state, items: updatedCart, total: newTotalUpdate };
      case 'REMOVE_FROM_CART':
        const filteredCart = state.items.filter((item) => item.id !== action.payload);
        const newTotalRemove = filteredCart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        return { ...state, items: filteredCart, total: newTotalRemove };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  