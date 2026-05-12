import React, { useState, useEffect } from 'react';
import './shop.css';
import { AiFillHeart, AiFillEye, AiOutlineClose, AiFillEdit } from 'react-icons/ai';
import { useAuth0 } from '@auth0/auth0-react';

// Props updated to include search/filter data from App.js
const Shop = ({ shop, categories, filter, allcatefilter, addtocart, maxPrice, handlePriceChange }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [detail, setDetail] = useState(null);

  const { user, isAuthenticated } = useAuth0();
  const adminEmail = 'gideon1mwangi@gmail.com';
  const isAdmin = isAuthenticated && user?.email === adminEmail;

  const detailpage = (product) => {
    setDetail(product);
    setShowDetail(true);
  };

  const closedetail = () => setShowDetail(false);

  const handleEdit = (id) => {
    window.location.href = `http://localhost/M-Pesa/api/admin_manage_products.php?edit=${id}`;
  };

  return (
    <>
      {/* Product Detail Modal */}
      {showDetail && detail && (
        <div className="product_detail">
          <button className="close_btn" onClick={closedetail}>
            <AiOutlineClose />
          </button>
          <div className="container">
            <div className="img_box">
              <img
                src={detail.image_url || '/images/default.png'}
                alt={detail.name}
              />
            </div>
            <div className="info">
              <h4># {detail.category || detail.cat}</h4>
              <h2>{detail.name}</h2>
              <p><b>Availability:</b> {detail.stock_quantity} units remaining</p>
              <p className="product_description" style={{
                marginTop: '15px',
                color: '#666',
                fontSize: '15px',
                lineHeight: '1.6',
                maxHeight: '120px',
                overflowY: 'auto'
              }}>
                {detail.description || "No description available for this item."}
              </p>
              <h3>KSh {detail.price}</h3>
              <button 
                onClick={() => addtocart(detail)}
                disabled={detail.stock_quantity <= 0}
              >
                {detail.stock_quantity <= 0 ? 'Out of Stock' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shop Layout */}
      <div className="shop">
        <h2># Shop</h2>
        <p>Home . Shop</p>

        <div className="container">
          {/* Left Sidebar */}
          <div className="left_box">
            <div className="category">
              <div className="header"><h3>Categories</h3></div>
              <div className="box">
                <ul>
                  {/* DYNAMIC CATEGORIES FROM DB/PROPS */}
                  {(categories || []).map((cat, index) => (
                    <li key={index} onClick={() => cat === "All" ? allcatefilter() : filter(cat)}>
                      # {cat}
                    </li>
                  ))}
                </ul>
              </div>
              
              

<div className="filter_price">
  <h3>Filter by Price</h3>
  <div className="price_input_container">
    <p>Max Price: <b>KSh {maxPrice}</b></p>
    <input 
      type="number" 
      placeholder="Enter max price..." 
      value={maxPrice} 
      onChange={handlePriceChange}
      className="manual_price_input"
      style={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginTop: '10px'
      }}
    />
  </div>
 
</div>
              {/* INSTANT PRICE FILTER SLIDER */}
              <div className="header" style={{marginTop: '20px'}}><h3>Price Range</h3></div>
              <div className="box">
                <input 
                  type="range" min="0" max="10000" step="50"
                  value={maxPrice} 
                  onChange={handlePriceChange}
                  style={{width: '100%'}}
                />
                <p>Under: KSh {maxPrice}</p>
              </div>
            </div>

            <div className="banner">
              <div className="img_box">
                <img src="/images/Mini-Banner-1.jpg" alt="Mini Banner" />
              </div>
            </div>
          </div>

          {/* Right Main */}
          <div className="right_box">
            <div className="banner">
              <div className="img_box">
                <img src="/images/shopbanner1.png" alt="Shop Banner" />
              </div>
            </div>

            <div className="product_box">
              <h2>Shop Products</h2>
              <div className="product_container">
                {/* USE shop FROM PROPS (The filtered list) */}
                {shop.map((p) => (
                  <div className="box" key={p.id}>
                    <div className="img_box">
                      <img
                        src={p.image_url || '/images/default.png'}
                        alt={p.name}
                        onError={(e) => { e.target.src = '/images/default.png'; }}
                      />
                      <div className="icon">
                        <li><AiFillHeart /></li>
                        <li onClick={() => detailpage(p)}><AiFillEye /></li>
                        {isAdmin && (
                          <li onClick={() => handleEdit(p.id)} style={{ background: '#32cd32', color: '#fff' }}>
                            <AiFillEdit />
                          </li>
                        )}
                      </div>
                    </div>
                    <div className="detail">
                      <h3>{p.name}</h3>
                      <p>KSh {Number(p.price || 0).toFixed(2)}</p>
                      <p style={{ 
                        color: p.stock_quantity <= 0 ? 'red' : p.stock_quantity < 5 ? 'orange' : 'green',
                        fontWeight: 'bold',
                        fontSize: '14px'
                      }}>
                        {p.stock_quantity <= 0 ? 'Out of Stock' : `In Stock: ${p.stock_quantity}`}
                      </p>
                      <button 
                        onClick={() => addtocart(p)} 
                        disabled={p.stock_quantity <= 0}
                        style={{ 
                          cursor: p.stock_quantity <= 0 ? 'not-allowed' : 'pointer',
                          opacity: p.stock_quantity <= 0 ? 0.6 : 1
                        }}
                      >
                        {p.stock_quantity <= 0 ? 'Out of Stock' : 'Add To Cart'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;