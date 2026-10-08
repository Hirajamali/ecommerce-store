import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-white tracking-tight flex items-center gap-1">
          odoo <span className="text-lime-400 text-sm font-normal italic">store</span>
        </Link>

        <nav className="flex items-center gap-8 text-sm font-semibold tracking-wide text-neutral-300">
          <Link to="/" className="hover:text-lime-400 transition-colors border-b-2 border-lime-400 pb-1">
            home
          </Link>
          <Link to="/login" className="hover:text-lime-400 transition-colors">
            login
          </Link>
          <Link to="/register" className="hover:text-lime-400 transition-colors">
            register
          </Link>
          <Link
            to="/cart"
            className="px-5 py-2 rounded-full border border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-neutral-950 font-bold transition-all"
          >
            cart 🛒
          </Link>
        </nav>
      </div>
    </header>
  );
}