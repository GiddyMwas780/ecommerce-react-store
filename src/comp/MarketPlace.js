import React, { useState } from 'react';

export default function SellForm({ onNewProduct }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc]     = useState('');
  const [price, setPrice]   = useState('');
  const [seller, setSeller] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = { title, desc, price, seller, createdAt: Date.now() };

    // Notify parent
    onNewProduct(product);

    // Clear the form fields
    setTitle('');
    setDesc('');
    setPrice('');
    setSeller('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title}
             onChange={(e) => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={desc}
                onChange={(e) => setDesc(e.target.value)} required />
      <input type="number" placeholder="Price" value={price}
             onChange={(e) => setPrice(e.target.value)} required />
      <input type="text" placeholder="Your Name" value={seller}
             onChange={(e) => setSeller(e.target.value)} required />
      <button type="submit">Post Product</button>
    </form>
  );
}
