import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Homeproduct from './home_product';
import { FaEye, FaHeart } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiLogoFacebook, BiLogoInstagram, BiLogoTwitter, BiLogoYoutube } from "react-icons/bi";
const Home = ({addtocart}) => {
    // Product category
    const [newProduct, setNewProduct] = useState([]);
    const [featuredProduct, setFeaturedProduct] = useState([]);
    const [topProduct, setTopProduct] = useState([]);
    // Trending product
    const [trendingProduct, setTrendingProduct] = useState(Homeproduct);

    // Filter trending product
    const filtercate = (x) => {
        const filterproduct = Homeproduct.filter((curElm) => curElm.type === x);
        setTrendingProduct(filterproduct);
    };

    // Show all trending products
    const allTrendingProduct = () => {
        setTrendingProduct(Homeproduct);
    };

    // Filter new products
    const productcategory = () => {
        //New products
        const newcategory = Homeproduct.filter((x) => x.type === 'new');
        setNewProduct(newcategory);

        // Featured products
        const featuredcategory = Homeproduct.filter((x) => 
        {
            return x.type === 'featured';
        })
        setFeaturedProduct(featuredcategory);

        // Top selling products
        const topcategory = Homeproduct.filter((x) => x.type === 'top');
        setTopProduct(topcategory);
    };
    useEffect(() => {
        productcategory();
    }, []);

    return (
        <>
            <div className='home'>
                <div className='top_banner'>
                    <div className='contant'>
                        <h3>Fresh products</h3>
                        <h2>VEGETABLES AND FRUITS</h2>
                        <p>10% off at your first order</p>
                        <Link to='/shop' className='link'>Shop now</Link>
                    </div>
                </div>

                <div className='trending'>
                    <div className='container'>
                        <div className='left_box'>
                            <div className='header'>
                                <div className='heading'>
                                    <h2 onClick={allTrendingProduct}>Trending Products</h2>
                                </div>
                                <div className='cate'>
                                    <h3 onClick={() => filtercate('Vegetables')}>Vegetables</h3>
                                    <h3 onClick={() => filtercate('Fruits')}>Fruits</h3>
                                    <h3 onClick={() => filtercate('Spices')}>Spices</h3>
                                    <h3 onClick={() => filtercate('Eggs')}>Eggs</h3>
                                </div>
                            </div>

                            <div className='products'>
                                <div className='container'>
                                    {trendingProduct.map((curElm, index) => (
                                        <div className='box' key={index}>
                                            <div className='img_box'>
                                                <img src={curElm.image} alt='' />
                                                <div className='icon'>
                                                    <div className='icon_box'><FaEye /></div>
                                                    <div className='icon_box'><FaHeart /></div>
                                                </div>
                                            </div>
                                            <div className='info'>
                                                <h3>{curElm.Name}</h3>
                                                <p>KSh {curElm.Price}</p>
                                                <button className='btn' onClick={() => addtocart (curElm)} >Add To Cart</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/shop">
                                   <button>Show More</button>
                                </Link>
                            </div>
                        </div>

                        <div className='right_box'>
                            <div className='right_container'>
                                <div className='testimonial'>
                                    <div className='head'>
                                        <h3>Our Testimonial</h3>
                                    </div>
                                    <div className='detail'>
                                        <div className='img_box'>
                                            <img src='images/T1.jpg' alt='' />
                                        </div>
                                        <div className='info'>
                                            <h3>Giddy Geonix</h3>
                                            <h4>Chef</h4>
                                            <p>One thing I have come to love about vitamin-G groceries is that they are fast and always delivering fresh products.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className='newsletter'>
                                    <div className='head'><h3>Newsletter</h3></div>
                                    <div className='form'>
                                        <p>Join our mailing list</p>
                                        <input type='email' placeholder='E-mail' />
                                        <button>Subscribe</button>
                                        <div className='icon_box'>
                                             <a href='https://facebook.com/Giddy Njugush' target='_blank' rel='noopener noreferrer' className='icon'>
                                               <BiLogoFacebook />
                                             </a>
                                             <a href='https://twitter.com/Giddy Njugush' target='_blank' rel='noopener noreferrer' className='icon'>
                                               <BiLogoTwitter />
                                                                                        </a>
                                             <a href='https://instagram.com/giddy.i/' target='_blank' rel='noopener noreferrer' className='icon'>
                                               <BiLogoInstagram />
                                             </a>
  <                                           a href='https://youtube.com/Giddy Njugush' target='_blank' rel='noopener noreferrer' className='icon'>
                                               <BiLogoYoutube />
                                             </a>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='banners'>
                    <img src='images\Pink Orange Modern Promo Furniture Banner (1).png' alt='banner'></img>
                    {/* <div className='container'>
                        <div className='left_box'>
                             <div className='box'>
                                <img src='images/Multi-Banner-1.png' alt='banner' />
                            </div>
                            <div className='box'>
                                <img src='images/Mini-Banner-1.jpg' alt='banner' />
                            </div>
                        </div>
                        <div className='right_box'>
                            <div className='top'>
                                <img src='images/image.png' alt='banner' />
                                <img src='images/Multi-Banner-1.png' alt='banner' />
                            </div>
                             <div className='bottom'>
                                <img src='images/Mini-Banner-1.jpg' alt='banner' />
                            </div> 
                        </div> 
                    </div> */}
                </div>

                <div className='product_type'>
                    <div className='container'>
                        <div className='box'>
                            <div className='header'>
                                <h2>Vegetables</h2>
                            </div>
                            {newProduct.map((curElm, index) => (
                                <div className='productbox' key={index}>
                                    <div className='img-box'>
                                        <img src={curElm.image} alt='' />
                                    </div>
                                    <div className='detail'>
                                        <h3>{curElm.Name}</h3>
                                        <p>KSh{curElm.Price}</p>
                                        <div className='icon'>
                                            <button><FaEye /></button>
                                            <button><FaHeart /></button>
                                            <button onClick={() => addtocart (curElm)} ><AiOutlineShoppingCart /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='box'>
                            <div className='header'>
                                <h2>Fruits</h2>
                            </div>
                            {featuredProduct.map((curElm, index) => (
                                <div className='productbox' key={index}>
                                    <div className='img-box'>
                                        <img src={curElm.image} alt='' />
                                    </div>
                                    <div className='detail'>
                                        <h3>{curElm.Name}</h3>
                                        <p>KSh{curElm.Price}</p>
                                        <div className='icon'>
                                            <button><FaEye /></button>
                                            <button><FaHeart /></button>
                                            <button onClick={() => addtocart (curElm)}><AiOutlineShoppingCart /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='box'>
                            <div className='header'>
                                <h2>Spices</h2>
                            </div>
                            {topProduct.map((curElm, index) => (
                                <div className='productbox' key={index}>
                                    <div className='img-box'>
                                        <img src={curElm.image} alt='' />
                                    </div>
                                    <div className='detail'>
                                        <h3>{curElm.Name}</h3>
                                        <p>KSh{curElm.Price}</p>
                                        <div className='icon'>
                                            <button><FaEye /></button>
                                            <button><FaHeart /></button>
                                            <button onClick={() => addtocart (curElm)}><AiOutlineShoppingCart /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
