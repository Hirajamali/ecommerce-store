import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-sm pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <Link to="/" className="text-2xl font-black text-white tracking-tight block">
            odoo <span className="text-lime-400 text-sm font-normal italic">store</span>
          </Link>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Next generation eCommerce solution providing top quality tech gadgets with full reliability.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Quick Links</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/" className="hover:text-lime-400 transition-colors">Home</Link></li>
            <li><a href="#products" className="hover:text-lime-400 transition-colors">Products</a></li>
            <li><a href="#features" className="hover:text-lime-400 transition-colors">Why Choose Us</a></li>
            <li><Link to="/cart" className="hover:text-lime-400 transition-colors">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Account</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link to="/login" className="hover:text-lime-400 transition-colors">Sign In</Link></li>
            <li><Link to="/register" className="hover:text-lime-400 transition-colors">Register</Link></li>
            <li><Link to="/checkout" className="hover:text-lime-400 transition-colors">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Contact Us</h4>
          <ul className="space-y-2.5 text-xs text-neutral-400">
            <li>📍 123 Tech Avenue, Store City</li>
            <li>📞 +1 (800) 123-4567</li>
            <li>✉️ support@odoostore.com</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} Odoo Store. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-lime-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-lime-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}