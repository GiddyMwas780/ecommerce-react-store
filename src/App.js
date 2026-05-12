import React, { useState, useEffect } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';

const App = () => {
  const [products, setProducts] = useState([]); // Original DB data
  const [shop, setShop] = useState([]);         // Displayed (filtered) data
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(10000);

  // 🟢 1. Initialize cart from LocalStorage (or empty array if nothing found)
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('localCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 🟢 2. Save cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('localCart', JSON.stringify(cart));
  }, [cart]);

  // 3. Fetch from DB on Load
  useEffect(() => {
    fetch("http://localhost/M-Pesa/api/get_products.php")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setShop(data);
        // Generate unique categories for the sidebar
        const cats = ["All", ...new Set(data.map(p => p.category || p.cat))];
        setCategories(cats);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // 4. Category Filter
  const filterCategory = (x) => {
    const catefilter = products.filter((product) => (product.category || product.cat) === x);
    setShop(catefilter);
  };

  const allcatefilter = () => {
    setShop(products);
  };

  // 5. Search Logic
  const searchproduct = () => {
    if (search.length === 0) {
      alert("Please search something!");
      setShop(products);
    } else {
      const searchfilter = products.filter((x) => 
        x.name.toLowerCase().includes(search.toLowerCase()) || 
        (x.category || x.cat).toLowerCase() === search.toLowerCase()
      );
      setShop(searchfilter);
    }
  };

  // 6. Price Logic (Updated to handle manual input)
  const handlePriceChange = (e) => {
    const price = e.target.value; // Get value from input field
    setMaxPrice(price);
    if (price === "") {
      setShop(products);
    } else {
      const filtered = products.filter(p => Number(p.price) <= Number(price));
      setShop(filtered);
    }
  };

  // 7. Advanced Add to Cart (Your original logic)
  const addtocart = (product) => {
    const exist = cart.find((x) => x.id === product.id);

    if (product.stock_quantity <= 0) {
      alert("This item is currently out of stock.");
      return;
    }

    if (exist) {
      if (exist.qnty >= product.stock_quantity) {
        alert(`Sorry, we only have ${product.stock_quantity} pieces in stock.`);
      } else {
        alert("Product already in cart");
      }
    } else {
      const standardizedItem = {
        ...product,
        qnty: 1,
        price: parseFloat(product.price || 0),
        name: product.name || "Product"
      };
      setCart([...cart, standardizedItem]);
      alert("Product added to cart");
    }
  };

  return (
    <BrowserRouter>
      <Nav search={search} setSearch={setSearch} searchproduct={searchproduct} />
      <Rout 
        setCart={setCart} 
        cart={cart} 
        shop={shop} 
        categories={categories}
        filter={filterCategory} 
        allcatefilter={allcatefilter} 
        addtocart={addtocart}
        maxPrice={maxPrice}
        handlePriceChange={handlePriceChange}
      />
      <Footer />
    </BrowserRouter>
  );
};

export default App;