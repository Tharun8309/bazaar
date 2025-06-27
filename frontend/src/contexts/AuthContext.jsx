import React, { createContext, useReducer } from 'react';

const initialState = {
  isLoggedIn: !!localStorage.getItem('token'),
  token: localStorage.getItem('token') || null,
  userType: localStorage.getItem('userType') || null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('userType', action.payload.userType);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        userType: action.payload.userType,
      };
    case 'LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('userType');
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        userType: null,
      };
    default:
      return state;
  }
}

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data) => {
    dispatch({ type: 'LOGIN', payload: data });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 