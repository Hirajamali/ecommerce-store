import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-neutral-900 border-b border-neutral-800 py-20 sm:py-28 px-6">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <span className="inline-block px-3.5 py-1.5 bg-lime-400/10 text-lime-400 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-lime-400/20">
              ⚡ Next-Gen Shopping
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              We build your <span className="underline decoration-lime-400 decoration-4 underline-offset-8">eCommerce</span> store
            </h1>
            <p className="text-neutral-400 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
              Discover top-tier tech essentials built for modern speed, aesthetics, and high performance.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="px-8 py-4 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-black text-sm tracking-wide uppercase rounded-full transition-all shadow-lg shadow-lime-400/20"
              >
                Explore Products
              </a>
              <a
                href="#features"
                className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-sm tracking-wide uppercase rounded-full transition-all border border-neutral-700"
              >
                Why Choose Us
              </a>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-3xl blur-md opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative bg-neutral-950 rounded-3xl p-4 border border-neutral-800 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=1000&auto=format&fit=crop"
                alt="Featured Product Showcase"
                className="w-full h-[380px] object-cover rounded-2xl group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-neutral-500">
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll Down</span>
          <div className="w-5 h-9 border-2 border-neutral-700 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-lime-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* 2. Value Features Grid Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-lime-400 font-bold text-xs uppercase tracking-widest block mb-2">Our Guarantees</span>
          <h2 className="text-3xl font-black text-white tracking-tight">Built for Seamless Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: '🚀', title: 'Fast Shipping', desc: 'Guaranteed delivery within 48 hours for all prime orders.' },
            { icon: '🛡️', title: 'Secure Payment', desc: '256-bit encrypted checkout with full fraud protection.' },
            { icon: '🔄', title: 'Easy Returns', desc: '30-day hassle-free money back return policy.' },
            { icon: '💬', title: '24/7 Support', desc: 'Dedicated customer care available around the clock.' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl hover:border-lime-400/40 transition-all duration-300"
            >
              <span className="text-4xl mb-4 block">{item.icon}</span>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section id="products" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <div className="flex items-center justify-between mb-10 pb-4 border-b border-neutral-800">
          <div>
            <span className="text-lime-400 text-xs font-bold uppercase tracking-widest block mb-1">Catalog</span>
            <h2 className="text-2xl font-black text-white tracking-wide">Featured Collection</h2>
          </div>
          <span className="text-xs font-bold text-lime-400 bg-lime-400/10 border border-lime-400/20 px-4 py-1.5 rounded-full">
            {products.length} Products
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-lime-400/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative bg-neutral-950 aspect-4/3 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <span className="absolute top-3 right-3 bg-neutral-900/90 border border-neutral-700 text-lime-400 px-3.5 py-1 rounded-full text-xs font-extrabold backdrop-blur-md">
                    ${product.price}
                  </span>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-bold text-lime-400/80 uppercase tracking-widest block mb-1">
                    {product.category || 'Tech'}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors line-clamp-1 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-neutral-400 text-sm line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/product/${product._id}`}
                  className="w-full block text-center py-3 bg-neutral-800 hover:bg-lime-400 hover:text-neutral-950 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-neutral-700 hover:border-lime-400"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Promotional CTA Banner */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-lime-950 border border-neutral-800 p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-lime-400 font-bold text-xs uppercase tracking-widest block mb-2">Limited Offer</span>
            <h2 className="text-3xl font-black text-white mb-4">Get 20% Off Your First Order</h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Subscribe to our store newsletter and stay updated with exclusive deals, drop dates, and special coupons.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Subscribed successfully!');
              setEmail('');
            }}
            className="flex w-full lg:w-auto gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3.5 bg-neutral-950 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-lime-400 w-full sm:w-80"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-lime-400 hover:bg-lime-300 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}