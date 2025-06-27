import { useContext, useEffect } from 'react'
import { SellerContext } from '../../contexts/SellerContext.jsx';
import ErrorMessages from '../common/ErrorMessages';
import SellerProduct from './SellerProduct';
import Spinner from '../common/Spinner';

const SellerHome = () => {

  const { products, isLoading, errorMessages, fetchSellerProducts, deleteProduct } = useContext(SellerContext);
  
  useEffect(() => {
    fetchSellerProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
  };

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-primary">My Products</h1>
      <ErrorMessages errorMessages={errorMessages} />
      {!products || products.length === 0 ? (
        <p>No products found. Start by adding some products.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <SellerProduct key={product._id} product={product} handleDeleteProduct={handleDeleteProduct} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SellerHome