import { useState } from 'react';

export default function SellForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, desc, price });
    // later: send this data to backend via fetch() or axios
  };

  return (
    <div>
      <h2>Sell Your Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
          required
        />
        <button type="submit">Post Product</button>
      </form>
    </div>
  );
}
