import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });

      const data = response.data;

      // Ensure token exists regardless of API response structure
      const userObj = {
        _id: data._id || data.user?._id,
        name: data.name || data.user?.name,
        email: data.email || data.user?.email,
        token: data.token || data.user?.token || data.accessToken,
      };

      if (!userObj.token) {
        throw new Error('Login successful but no token received from backend.');
      }

      // Save user session
      localStorage.setItem('userInfo', JSON.stringify(userObj));

      // Force navigate to checkout or home page
      if (redirect === 'checkout') {
        navigate('/checkout', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        err.response?.data?.message || err.message || 'Invalid email or password'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-lime-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-black text-white tracking-tight inline-block mb-3">
            odoo <span className="text-lime-400 text-sm font-normal italic">store</span>
          </Link>
          <h2 className="text-2xl font-black text-white tracking-tight">Welcome Back</h2>
          <p className="text-neutral-400 text-xs mt-1">
            {redirect === 'checkout'
              ? 'Please sign in to complete your checkout'
              : 'Sign in to continue to your account'}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-lime-400/20 mt-2 disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-neutral-400">
          Don't have an account?{' '}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
            className="text-lime-400 font-bold hover:underline ml-1"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}