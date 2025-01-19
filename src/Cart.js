import React from 'react';
import { useCart } from './CartProvider';
import Navbar from './Navbar';

function Cart() {
  const { cart, totalPrice } = useCart();

  return (
    <div className="container">
      <Navbar />
      <h1 className="mt-4 mb-4 text-center">Your Cart</h1>
      
      {cart.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item) => (
              <li
                className="list-group-item d-flex align-items-center justify-content-between"
                key={item.id}
              >
                {/* Product Image */}
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '15px' }} 
                />
                
                {/* Product Title */}
                <span className="mr-2 font-weight-bold">{item.title}</span>
                
                {/* Product Price and Quantity */}
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="d-flex justify-content-between font-weight-bold">
            <span>Total Price:</span>
            <span>${totalPrice}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
