import { useContext } from 'react';
import { CustomerContext } from '../../contexts/CustomerContext.jsx';

const Order = ({order}) => {
  const productsInOrder = order.products || [];

  const subtotal = productsInOrder.reduce((sum, p) => sum + (p?.price || 0), 0);
  const gst = subtotal * 0.18;
  const grandTotal = subtotal + gst;

  return (
    <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
      <div className="space-y-4">
        <div className="border-b pb-2">
          <p className="text-sm text-gray-500">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}<br/>
            Order Time: {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <div className="space-y-1 mt-2">
            <p className="font-semibold">Subtotal: ₹{subtotal.toFixed(2)}</p>
            <p className="font-semibold">GST (18%): ₹{gst.toFixed(2)}</p>
            <p className="font-semibold">Grand Total: ₹{grandTotal.toFixed(2)}</p>
            <p className="text-sm text-gray-700 mt-2"><span className="font-semibold">Payment Method:</span> {order.paymentType && order.paymentType.toUpperCase()}</p>
          </div>
          <div className="mt-2">
            <p className="font-semibold mb-1">Delivery Address:</p>
            <div className="text-sm text-gray-700 ml-2">
              <div>{order.deliveryAddress?.fullName}</div>
              <div>{order.deliveryAddress?.phone}</div>
              <div>{order.deliveryAddress?.address}</div>
              <div>{order.deliveryAddress?.city}, {order.deliveryAddress?.state} - {order.deliveryAddress?.pincode}</div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          {productsInOrder.map((product) => (
            <div key={product._id} className="flex items-center space-x-3">
              <img 
                src={product.imageUrl} 
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-600">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order;