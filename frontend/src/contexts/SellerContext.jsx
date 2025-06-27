import React, { createContext, useReducer } from 'react';
import toast from 'react-hot-toast';

const initialState = {
  products: [],
  isLoading: false,
  errorMessages: [],
};

function sellerReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, isLoading: true, errorMessages: [] };
    case 'FETCH_SUCCESS':
      return { ...state, isLoading: false, products: action.payload };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false, errorMessages: [action.payload] };
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'DELETE_PRODUCT':
      return { ...state, products: state.products.filter(p => p._id !== action.payload) };
    default:
      return state;
  }
}

export const SellerContext = createContext();

export const SellerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sellerReducer, initialState);

  const fetchSellerProducts = async () => {
    dispatch({ type: 'FETCH_START' });
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/seller/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await response.json();
      if (response.status === 200) {
        dispatch({ type: 'FETCH_SUCCESS', payload: body });
      } else {
        dispatch({ type: 'FETCH_ERROR', payload: body.error });
        toast.error(body.error || 'Failed to fetch products');
      }
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
      toast.error('Network error. Please check your connection.');
    }
  };

  const addProduct = (product) => {
    dispatch({ type: 'ADD_PRODUCT', payload: product });
    toast.success('Product added successfully!');
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3000/api/seller/products/${productId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        dispatch({ type: 'DELETE_PRODUCT', payload: productId });
        toast.success('Product deleted successfully!');
      } else {
        const body = await response.json();
        dispatch({ type: 'FETCH_ERROR', payload: body.error });
        toast.error(body.error || 'Failed to delete product');
      }
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message });
      toast.error('Network error. Please check your connection.');
    }
  };

  return (
    <SellerContext.Provider
      value={{ ...state, fetchSellerProducts, addProduct, deleteProduct }}
    >
      {children}
    </SellerContext.Provider>
  );
}; 