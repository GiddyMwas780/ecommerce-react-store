import React, { useState } from 'react';
import './AdminAddProduct.css';
import { AiOutlineCloudUpload, AiOutlinePlusCircle } from 'react-icons/ai';

const AdminAddProduct = () => {
  // Logic from Version 1: Simple state for form and image
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    type: '',
    stock: '',
    description: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // Just for the UI look
  const [message, setMessage] = useState('');

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file)); 
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('Processing...');

    // Functioning logic from Version 1: FormData object
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost/M-Pesa/api/add_product.php', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      
      // Handle response simply
      if (data.success || data.message.includes('successfully')) {
        setMessage('✅ Product added successfully');
        // Clear form after success
        setForm({ name: '', price: '', category: '', type: '', stock: '' });
        setPreview(null);
        setImage(null);
      } else {
        setMessage('❌ ' + (data.message || 'Failed to add product'));
      }
    } catch (err) {
      setMessage('❌ Failed to connect to server');
    }
  };

  return (
    <div className="admin_page_wrapper">
      <div className="admin_form_container">
        {/* Header from Version 2 */}
        <div className="form_header">
          <AiOutlinePlusCircle className="header_icon" />
          <h2>Add New Product</h2>
          <p>Fill in the details below to update your inventory</p>
        </div>

        <form onSubmit={handleSubmit} className="modern_form">
          <div className="form_grid">
            
            {/* Left Column: Details (Styled Inputs) */}
            <div className="input_section">
              <div className="input_group">
                <label>Product Name</label>
                <input 
                  name="name" 
                  value={form.name} 
                  placeholder="e.g. Fresh Mangoes" 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="row_inputs">
                <div className="input_group">
                  <label>Price (KSh)</label>
                  <input 
                    name="price" 
                    type="number" 
                    value={form.price} 
                    placeholder="0.00" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="input_group">
                  <label>Stock Qty</label>
                  <input 
                    name="stock" 
                    type="number" 
                    value={form.stock} 
                    placeholder="10" 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div className="input_group">
                <label>Category</label>
                <input 
                   name="category" 
                   value={form.category} 
                   placeholder="e.g. Fruits" 
                   onChange={handleChange} 
                   required 
                />
              </div>

              <div className="input_group">
                <label>Product Type</label>
                <input 
                  name="type" 
                  value={form.type} 
                  placeholder="featured / new" 
                  onChange={handleChange} 
                />
              </div>
              <div className="input_group">
                <label>Product Description</label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  placeholder="Enter detailed product information..." 
                  onChange={handleChange}
                  rows="4"
                  style={{ 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    border: '1px solid #ddd',
                    resize: 'vertical' 
                  }}
                />
              </div>
            </div>

            {/* Right Column: Styled Image Upload */}
            <div className="upload_section">
              <label>Product Image</label>
              <div className={`upload_box ${preview ? 'has_image' : ''}`}>
                {preview ? (
                  <img src={preview} alt="Preview" className="img_preview" />
                ) : (
                  <div className="upload_placeholder">
                    <AiOutlineCloudUpload className="upload_icon" />
                    <p>Click to upload image</p>
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  required 
                />
              </div>
            </div>
          </div>

          <button type="submit" className="submit_btn">
             Add Product to Shop
          </button>
        </form>

        {/* Dynamic Status Message */}
        {message && (
          <div className={`status_msg ${message.includes('❌') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAddProduct;