import React, { useState } from 'react';

const PaymentForm = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:8000/api/stkpush.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone,
        amount
      })
    });

    const data = await res.json();
    setResponse(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Make M-Pesa Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Phone (e.g. 2547XXXXXXXX):</label><br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount:</label><br />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Pay with M-Pesa</button>
      </form>

      {response && (
        <div style={{ marginTop: 20 }}>
          <h4>Response:</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
