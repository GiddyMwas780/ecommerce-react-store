import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Link } from 'react-router-dom';
import './adminorders.css';

const AdminOrders = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminEmail = 'gideon1mwangi@gmail.com';

  useEffect(() => {
    if (!isAuthenticated) return;

    fetch('http://localhost/M-Pesa/api/get_orders.php')
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load orders');
        setLoading(false);
      });
  }, [isAuthenticated]);

  const updateOrderStatus = async (orderId, status) => {
    await fetch('http://localhost/M-Pesa/api/update_order_status.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, status })
    });

    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status } : o))
    );
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/" />;
  if (user.email !== adminEmail) return <h2 className="admin-only">Admin Only</h2>;

  return (
    <div className="admin-orders-container">
      <div className="admin-header">
        <h2>📦 Admin Orders</h2>
        <Link to="/admin/add-product" className="add-product-btn">
          ➕ Add Product
        </Link>
      </div>

      {loading && <p>Loading orders...</p>}
      {error && <p className="error">{error}</p>}

      <div className="orders-grid">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h4>Order #{order.id}</h4>
            <p><strong>Name:</strong> {order.customer_name}</p>
            <p><strong>Email:</strong> {order.user_email}</p>
            <p><strong>Total:</strong> KSh {order.total}</p>

            <select
              value={order.status}
              onChange={e => updateOrderStatus(order.id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;