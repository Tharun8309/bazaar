import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import CustomerHome from "./components/customer/CustomerHome";
import AddProduct from "./components/seller/AddProduct";
import SellerHome from "./components/seller/SellerHome";
import NavBar from "./nav/NavBar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cart from "./components/customer/cart/Cart";
import Orders from "./components/customer/Orders";
import ForgotPassword from "./components/auth/ForgotPassword.jsx"
import LandingPage from "./components/LandingPage";

function App() {
  const { userType, isLoggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <div>
          <NavBar />
          <Routes>
            <Route 
              path="/" 
              element={
                !isLoggedIn ? (
                  <LandingPage />
                ) : userType === 'customer' ? (
                  <Navigate to="/customer" replace />
                ) : userType === 'seller' ? (
                  <Navigate to="/seller" replace />
                ) : (
                  <LandingPage />
                )
              }
            />
            <Route 
              path="/customer" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : userType !== "customer" ? (
                  <Navigate to="/" replace />
                ) : (
                  <CustomerHome />
                )
              }
            />
            <Route 
              path="/add-product" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : userType !== "seller" ? (
                  <Navigate to="/" replace />
                ) : (
                  <AddProduct />
                )
              } 
            />
            <Route path="/login" element={
              isLoggedIn ? (
                userType === 'customer' ? <Navigate to="/customer" replace /> : <Navigate to="/seller" replace />
              ) : (
                <Login />
              )
            } />
            <Route path="/signup" element={
              isLoggedIn ? (
                userType === 'customer' ? <Navigate to="/customer" replace /> : <Navigate to="/seller" replace />
              ) : (
                <Signup />
              )
            } />
            <Route 
              path="/cart" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : userType !== "customer" ? (
                  <Navigate to="/" replace />
                ) : (
                  <Cart />
                )
              } 
            />
            <Route 
              path="/orders" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : userType !== "customer" ? (
                  <Navigate to="/" replace />
                ) : (
                  <Orders />
                )
              } 
            />
            <Route 
              path="/seller" 
              element={
                !isLoggedIn ? (
                  <Navigate to="/login" replace />
                ) : userType === "seller" ? (
                  <SellerHome />
                ) : (
                  <CustomerHome />
                )
              }
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
