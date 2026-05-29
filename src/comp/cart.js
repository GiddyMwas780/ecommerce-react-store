import React, { useState, useEffect, useRef } from 'react';
import './cart.css';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';
import { initiateMpesaPayment } from '../services/mpesa';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


const Cart = ({ cart, setCart }) => {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const [currentCheckoutId, setCurrentCheckoutId] = useState(null);
const [receiptData, setReceiptData] = useState(null);


 const incqnty = (product) => {
  const exist = cart.find((x) => x.id === product.id);
  
  // Check if increasing would exceed stock
  if (exist.qnty >= product.stock_quantity) {
    alert("Cannot add more. Reached maximum available stock.");
    return;
  }

  setCart(
    cart.map((item) => 
      item.id === product.id ? { ...exist, qnty: exist.qnty + 1 } : item
    )
  );
};

  const decqnty = (product) => {
    const exist = cart.find((x) => x.id === product.id);
    if (exist.qnty > 1) {
      setCart(
        cart.map((item) => item.id === product.id ? { ...exist, qnty: exist.qnty - 1 } : item)
      );
    }
  };

  const removeproduct = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

const total = cart.reduce((sum, item) => {
    // This checks for 'price' (from DB) OR 'Price' (from local)
    const itemPrice = Number(item.price || item.Price || 0);
    return sum + (item.qnty * itemPrice);
}, 0);

 // Payment polling function
 // ✅ 1. THE TRIGGER EMAIL FUNCTION (Corrected URL and Error Reporting)
 const emailSentRef = useRef(false);
  const triggerEmail = async (mpesaData) => {
    const itemsHtml = cart.map(item => `
  <tr>
    <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.qnty}</td>
    <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">KSh ${(item.price * item.qnty).toFixed(2)}</td>
  </tr>
`).join('');

    try {
      // ✅ FIXED: Added /M-Pesa/ to the path and changed to brevo_email.php
      const response = await fetch('https://499b-41-89-51-26.ngrok-free.app/M-Pesa/brevo_email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerEmail: user.email,
          customerName: user.name,
          receipt: mpesaData.receipt,
          amount: mpesaData.amount,
          itemsHtml: itemsHtml
        })
      });

      const result = await response.json();
      console.log("🛠️ PHP Debug Response:", result);

      if (result.http_code === 201) {
        console.log("📨 Email successfully sent and logged by Brevo!");
      } else {
        console.error("❌ Email failed at Brevo:", result.brevo_response);
      }
    } catch (error) {
      console.error("❌ Network Error: Could not reach the PHP file. Check your URL/Ngrok.", error);
    }
  };



      const deductStock = async (cartItems) => {
  try {
    const response = await fetch('https://499b-41-89-51-26.ngrok-free.app/M-Pesa/reduce_stock.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cartItems })
    });
    const result = await response.json();
    console.log("📉 Stock Update Response:", result);
  } catch (error) {
    console.error("❌ Failed to deduct stock:", error);
  }
};

  
  // ✅ 2. THE CHECK PAYMENT STATUS FUNCTION
  const checkPaymentStatus = async () => {
    if (!currentCheckoutId) return;
    setPollCount(prev => prev + 1);

    try {
      const res = await fetch(
        `https://499b-41-89-51-26.ngrok-free.app/M-Pesa/check_payment.php?checkout_request_id=${currentCheckoutId}&t=${Date.now()}`,
        {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Accept': 'application/json'
          }
        }
      );

      const data = await res.json();
      const normalizedStatus = data.status ? data.status.toLowerCase().trim() : '';

      if (normalizedStatus === 'success') {
    console.log("🎉 Success detected!");
    setIsChecking(false);
    setPaymentStatus('success');
       
    // 1. Deduct Stock first (while 'cart' still has the items)
    deductStock([...cart]);

    // 🟢 TRIGGER EMAIL ONLY ONCE
    if (!emailSentRef.current) {
        emailSentRef.current = true;
        triggerEmail(data);
    }

   // Save receipt data BEFORE clearing cart
if (!receiptData) {
  setReceiptData({
    receipt: data.receipt,
    amount: total,
    items: [...cart]
  });
}


setCart([]);

alert(`✅ Payment Successful!\nReceipt: ${data.receipt}\n\nCheck your email for confirmation.`);

}
      else if (normalizedStatus === 'failed' || normalizedStatus === 'cancelled') {
        console.log("❌ Failure detected");
        setIsChecking(false);
        setPaymentStatus('failed');
        alert(`❌ Payment Failed: ${data.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Polling error:', err);
    }
  };

// ✅ 3. THE DOWNLOAD RECEIPT FUNCTION
  const downloadReceipt = () => {
  if (!receiptData) return;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text(`Receipt: ${receiptData.receipt}`, 14, 20);

  doc.setFontSize(12);
  doc.text(`Customer: ${user.name}`, 14, 30);
  doc.text(`Email: ${user.email}`, 14, 37);
  doc.text(`Total: KSh ${receiptData.amount}`, 14, 44);

  const tableData = receiptData.items.map(item => [
  item.name, // Changed from item.Name
  item.qnty,
  (item.price * item.qnty).toFixed(2) // Changed from item.Price
]);

  autoTable(doc, {
  head: [['Item', 'Qty', 'Total (KSh)']],
  body: tableData,
  startY: 55,
});

  doc.save(`Receipt_${receiptData.receipt}.pdf`);
};

  // Polling effect
  useEffect(() => {
    let interval;
    let timeout;
    
    if (isChecking && currentCheckoutId) {
      // Run immediately once, then start interval
      checkPaymentStatus();
      interval = setInterval(checkPaymentStatus, 5000);
      
      // Safety timeout: 2 minutes
      timeout = setTimeout(() => {
        if (isChecking) {
          setIsChecking(false);
          setPaymentStatus('timeout');
          alert('⏰ Payment timeout. No response received after 2 minutes.');
        }
      }, 120000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecking, currentCheckoutId]);
  


  // Handle order now
  const handleOrderNow = async () => {
    emailSentRef.current = false;
    setReceiptData(null);

    if (!isAuthenticated) {
      alert('Please log in to place an order');
      loginWithRedirect();
      return;
    }
    
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    let phone = prompt('Enter your M-Pesa phone number (07XXXXXXXX or 2547XXXXXXXX):');
    if (!phone) return;
    
    if (phone.startsWith('07')) {
      phone = '254' + phone.substring(1);
    } else if (phone.startsWith('+254')) {
      phone = phone.substring(1);
    }
    
    if (!/^2547\d{8}$/.test(phone)) {
      alert('❌ Invalid phone number format. Use 07XXXXXXXX or 2547XXXXXXXX');
      return;
    }
    
    const amount = Math.round(total);
    
    if (amount < 1) {
      alert('❌ Amount must be at least KSh 1');
      return;
    }
    
    setPaymentStatus('initiating');
    setIsChecking(false);
    setPollCount(0);
    
    try {
      // ✅ CORRECTED PATH: Removed /callback/
      await fetch('https://499b-41-89-51-26.ngrok-free.app/M-Pesa/reset_payment.php');
    } catch (e) {
      console.log('Pre-reset error:', e);
    }
    
    alert(`📱 Sending M-Pesa request...\n\nPhone: ${phone}\nAmount: KSh ${amount}`);
    
    try {
      const response = await initiateMpesaPayment(phone, amount);
      const idFromSafaricom = response.CheckoutRequestID || response.checkoutRequestID;
      
      if (response.ResponseCode === '0' || response.success === true) {
        alert('✅ STK Push sent! Check your phone and enter M-Pesa PIN.');
        setCurrentCheckoutId(idFromSafaricom);
        setIsChecking(true);
        setPaymentStatus('pending');
      } else {
        alert(`❌ Failed to send STK Push: ${response.error || 'Unknown error'}`);
        setPaymentStatus('failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('❌ Network error. Please check your connection and try again.');
      setPaymentStatus('error');
    }
  };

  return (
    <div className="cart">
      <h3>#cart</h3>
      {cart.length === 0 && (
        <div className="empty_cart">
          <h2>Your shopping cart is empty</h2>
          <Link to="/shop">
            <button>Shop Now</button>
          </Link>
        </div>
      )}
      
     <div className="container">
  {cart.map((item) => (
    <div className="box" key={item.id}>
      <div className="img_box">
        {/* Handles both Local DB images and Static Home images */}
        <img 
          src={item.image || `http://localhost/M-Pesa/images/products/${item.image_path}`} 
          alt={item.name || item.Name} 
        />
      </div>
      <div className="detail">
        <div className="info">
  <h4>{item.category || item.cat}</h4>
  <h3>{item.name}</h3> {/* Always use lowercase now */}
  <p>Price: KSh {item.price.toFixed(2)}</p>
  <p>Total: KSh {(item.price * item.qnty).toFixed(2)}</p>
</div>
        <div className="quantity">
          <button onClick={() => incqnty(item)}>+</button>
          <input type="number" readOnly value={item.qnty} />
          <button onClick={() => decqnty(item)}>-</button>
        </div>
        <div className="icon">
          <li onClick={() => removeproduct(item)}>
            <AiOutlineClose />
          </li>
        </div>
      </div>
    </div>
  ))}
</div>
      
      {(cart.length > 0 || paymentStatus === 'success') && (
        <div className="bottom">
          <div className="Total">
            <h4>
              Sub Total: KSh {(receiptData?.amount ?? total).toFixed(2)}
            </h4>
          </div>
          
          {isAuthenticated ? (
            <div className="user-info">
              <p><strong>Logged in as:</strong> {user?.name}</p>
              
              {paymentStatus === 'initiating' && (
                <p style={{ color: 'blue' }}>🔄 Initializing payment...</p>
              )}
              {paymentStatus === 'pending' && (
                <p style={{ color: 'orange' }}>
                  ⏳ Waiting for payment confirmation... (Polling #{pollCount})
                </p>
              )}
              {paymentStatus === 'success' && (
  <div>
    <p style={{ color: 'green', fontWeight: 'bold' }}>
      ✅ Payment successful! Your order is confirmed.<br/>
      A confirmation E-mail has been sent to you.
    </p>
    <button 
      onClick={downloadReceipt}
      disabled={!receiptData}
      style={{ marginTop: '10px', padding: '8px 16px', background: '#32cd32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      📄 Download Receipt
    </button>
  </div>
)}

              {paymentStatus === 'failed' && (
                <p style={{ color: 'red' }}>❌ Payment failed. Please try again.</p>
              )}
              {paymentStatus === 'error' && (
                <p style={{ color: 'red' }}>❌ Network error. Please check connection.</p>
              )}
              {paymentStatus === 'timeout' && (
                <p style={{ color: 'red' }}>⏰ Payment timeout. Please try again.</p>
              )}
              
              <button 
                className="order-btn" 
                onClick={handleOrderNow}
                disabled={isChecking || paymentStatus === 'pending'}
              >
                {isChecking ? 'Processing Payment...' : 'Order Now'}
              </button>
              
              {isChecking && (
                <button 
                  className="cancel-btn" 
                  onClick={() => {
                    setIsChecking(false);
                    setPaymentStatus(null);
                    alert('Payment check cancelled.');
                  }}
                  style={{ marginTop: '10px', background: '#ccc', cursor: 'pointer' }}
                >
                  Cancel Check
                </button>
              )}
            </div>
          ) : (
            <div className="login-prompt">
              <p style={{ color: 'red', marginBottom: '10px' }}>
                Please log in to place your order.
              </p>
              <button className="login-btn" onClick={loginWithRedirect}>
                Login to Order
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;