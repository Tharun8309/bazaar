import { useEffect, useContext } from 'react'
import { CustomerContext } from '../../contexts/CustomerContext.jsx';
import CustomerProduct from './CustomerProduct';
import Spinner from '../common/Spinner';
import ErrorMessages from '../common/ErrorMessages';

const CustomerHome = () => {
  const { products, isLoading, errorMessages, fetchCustomerData } = useContext(CustomerContext);

  useEffect(() => {
    fetchCustomerData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">Browse Products</h1>
      <ErrorMessages errorMessages={errorMessages} />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <CustomerProduct key={product._id} product={product} cart={[]} />
            ))
          ) : (
            <p className="col-span-full text-center">No products found.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default CustomerHome;