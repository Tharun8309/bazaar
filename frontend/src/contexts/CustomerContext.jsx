import React, { createContext, useReducer } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext.jsx';

const initialState = {
  products: [],
  cart: [],
  orders: [],
  isLoading: false,
  errorMessages: [],
};

function customerReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, errorMessages: [] };
    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    case 'FETCH_CUSTOMER_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        cart: action.payload.cart,
        orders: action.payload.orders,
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, errorMessages: [action.payload] };
    case 'UPDATE_CART':
      return { ...state, cart: action.payload };
    case 'PLACE_ORDER':
      return { ...state, orders: [...state.orders, action.payload], cart: [] };
    default:
      return state;
  }
}

export const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(customerReducer, initialState);
  const authCtx = React.useContext(AuthContext);

  const fetchCustomerData = async () => {
    dispatch({ type: 'FETCH_START' });
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://bazaar-uutz.onrender.com/api/customer/data', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await response.json();
      if (response.status === 200) {
        dispatch({ type: 'FETCH_CUSTOMER_DATA_SUCCESS', payload: body });
      } else if (response.status === 404 && body.error === 'User not found') {
        toast.error('Your account was not found. You have been logged out.');
        authCtx.logout();
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: body.error });
        toast.error(body.error || 'Failed to fetch data');
      }
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
      toast.error('Network error. Please check your connection.');
    }
  };

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://bazaar-uutz.onrender.com/api/customer/cart/${productId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await response.json();
      if (response.status === 200) {
        dispatch({ type: 'UPDATE_CART', payload: body });
        toast.success('Item added to cart!');
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: body.error });
        toast.error(body.error || 'Failed to add item to cart');
      }
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
      toast.error('Network error. Please check your connection.');
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`https://bazaar-uutz.onrender.com/api/customer/cart/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await response.json();
      if (response.status === 200) {
        dispatch({ type: 'UPDATE_CART', payload: body });
        toast.success('Item removed from cart!');
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: body.error });
        toast.error(body.error || 'Failed to remove item from cart');
      }
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
      toast.error('Network error. Please check your connection.');
    }
  };

  const placeOrder = async (deliveryAddress, paymentType) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('https://bazaar-uutz.onrender.com/api/customer/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ deliveryAddress, paymentType })
      });
      const body = await response.json();
      if (response.status === 200) {
        dispatch({ type: 'PLACE_ORDER', payload: body });
        toast.success('Order placed successfully!');
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: body.error });
        toast.error(body.error || 'Failed to place order');
      }
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
      toast.error('Network error. Please check your connection.');
    }
  };

  return (
    <CustomerContext.Provider
      value={{ ...state, fetchCustomerData, addToCart, removeFromCart, placeOrder }}
    >
      {children}
    </CustomerContext.Provider>
  );
}; 