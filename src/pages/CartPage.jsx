import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();

  // State initialization directly from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  });

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, qty: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-[75vh]">
      <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-10 text-center">
          <p className="text-neutral-400 text-sm mb-6">Your shopping cart is empty.</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-lime-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-lime-300 transition-all"
          >
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 flex items-center justify-between gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl bg-neutral-950"
                />
                
                <div className="flex-1">
                  <h3 className="text-white font-bold text-sm mb-1">{item.name}</h3>
                  <p className="text-lime-400 font-extrabold text-sm">${item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-1.5">
                  <button
                    onClick={() => updateQuantity(item._id, item.qty - 1)}
                    className="text-neutral-400 hover:text-white font-bold"
                  >
                    -
                  </button>
                  <span className="text-white text-xs font-bold w-4 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.qty + 1)}
                    className="text-neutral-400 hover:text-white font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-400 hover:text-red-300 text-xs font-semibold px-2 py-1"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary Box */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 h-fit space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight border-b border-neutral-800 pb-4">
              Order Summary
            </h2>

            <div className="flex justify-between text-neutral-400 text-sm">
              <span>Subtotal</span>
              <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-neutral-400 text-sm">
              <span>Shipping</span>
              <span className="text-white font-bold">{subtotal > 1000 ? 'Free' : '$150.00'}</span>
            </div>

            <div className="border-t border-neutral-800 pt-4 flex justify-between text-white font-black text-lg">
              <span>Total</span>
              <span className="text-lime-400">${(subtotal + (subtotal > 1000 ? 0 : 150)).toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-lime-400/20"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}