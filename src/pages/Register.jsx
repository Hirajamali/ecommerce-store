import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // URL search parameter se redirect URL detect karein (e.g., ?redirect=checkout)
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });

      // User session info localStorage mein save karein
      localStorage.setItem('userInfo', JSON.stringify(data));

      // Agar user checkout se bhej gaya tha, toh seedha checkout par le jayein
      if (redirect === 'checkout') {
        navigate('/checkout');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Title Header */}
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-black text-white tracking-tight inline-block mb-3">
            odoo <span className="text-lime-400 text-sm font-normal italic">store</span>
          </Link>
          <h2 className="text-2xl font-black text-white tracking-tight">Create Account</h2>
          <p className="text-neutral-400 text-xs mt-1">
            {redirect === 'checkout'
              ? 'Register to complete your purchase'
              : 'Join us and start shopping today'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-lime-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-lime-400/20 mt-2"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-neutral-400">
          Already have an account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className="text-lime-400 font-bold hover:underline ml-1"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}