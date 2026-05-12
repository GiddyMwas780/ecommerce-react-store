import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <p>{product.desc}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><em>Posted by:</em> {product.seller}</p>
      <p><small>{new Date(product.createdAt).toLocaleString()}</small></p>
    </div>
  );
}
