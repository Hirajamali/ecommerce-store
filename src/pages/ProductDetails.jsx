import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const existItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existItem = existItems.find((item) => item._id === product._id);

    let updatedCart;
    if (existItem) {
      updatedCart = existItems.map((item) =>
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...existItems, { ...product, qty: 1 }];
    }

    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    navigate('/cart');
  };

  if (!product) return <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>Loading product details...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#2563eb', fontWeight: 'bold' }}>← Back to Products</Link>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '20px', backgroundColor: '#fff', padding: '24px', borderRadius: '12px' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
        <div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '12px', color: '#111827' }}>{product.name}</h1>
          <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '20px' }}>{product.description}</p>
          <h2 style={{ fontSize: '2rem', color: '#059669', marginBottom: '20px' }}>${product.price}</h2>
          <p style={{ marginBottom: '20px', fontWeight: '500', color: '#374151' }}>
            Status: {product.countInStock > 0 ? <span style={{ color: 'green' }}>In Stock</span> : <span style={{ color: 'red' }}>Out of Stock</span>}
          </p>
          <button
            onClick={handleAddToCart}
            disabled={product.countInStock === 0}
            style={{
              padding: '12px 24px',
              backgroundColor: product.countInStock > 0 ? '#059669' : '#9ca3af',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: product.countInStock > 0 ? 'pointer' : 'not-allowed',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}