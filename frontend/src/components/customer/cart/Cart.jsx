import { useContext, useEffect } from 'react';
import { CustomerContext } from '../../../contexts/CustomerContext.jsx';
import ErrorMessages from "../../common/ErrorMessages";
import CartProduct from "./CartProduct";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import Spinner from '../../common/Spinner';

const Cart = () => {
  const { products, cart, isLoading, errorMessages, fetchCustomerData } = useContext(CustomerContext);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const productsInCart = products.filter((product) =>
    cart.includes(product._id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Products</h1>
      <ErrorMessages errorMessages={errorMessages} />
      <div className="flex flex-col gap-8">
        <div>
          <CartItems products={productsInCart} />
        </div>
        <div>
          <CartSummary products={productsInCart} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
