import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CheckoutPage() {
  const navigate = useNavigate();

  // Initial state mein hi localStorage se savedUser load kar lein
  const [userInfo] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Synchronous state update ki zaroorat nahi padegi, sirf redirect handle karein
  useEffect(() => {
    if (!userInfo || !userInfo.token) {
      navigate('/login?redirect=checkout');
    }
  }, [userInfo, navigate]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!userInfo) return;

    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    if (cartItems.length === 0) {
      setError('Aapki cart khali hai. Pehle products add karein.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const orderData = {
        orderItems: cartItems,
        shippingAddress: { address, city, postalCode, country: 'Pakistan' },
        paymentMethod,
      };

      await axios.post('http://localhost:5000/api/orders', orderData, config);
      
      localStorage.removeItem('cartItems');
      alert('Order Placed Successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) {
    return null;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-2xl font-black text-white text-center mb-2">Checkout & Shipping</h2>

        <div className="mb-6 p-4 bg-neutral-950 border border-neutral-800 rounded-xl text-xs">
          <span className="text-neutral-400 block mb-1">Ordering as:</span>
          <div className="text-lime-400 font-bold text-sm">{userInfo.name}</div>
          <div className="text-neutral-400">{userInfo.email}</div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-neutral-300 mb-1">Street Address</label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-lime-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-lime-400"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-300 mb-1">Postal Code</label>
              <input
                type="text"
                required
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm focus:outline-none focus:border-lime-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-black text-xs uppercase rounded-xl mt-4 transition-colors"
          >
            {loading ? 'Processing Order...' : 'Place Order Now'}
          </button>
        </form>
      </div>
    </div>
  );
}