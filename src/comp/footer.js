import React from 'react'
import './foooter.css'
import { FaPiggyBank, FaShippingFast, FaHeadphones, FaWallet } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
    <div className='footer'>
        <div className='container'>
            <div className='left_box'>
                <div className='box'>
                    <div className='icon_box'>
                        <FaPiggyBank />
                    </div>
                    <div className='detail'>
                        <h3>Great saving</h3>
                        <p>Get the best deals and discounts on your favorite products.</p>
                    </div> 
                </div>                 
                <div className='box'>
                    <div className='icon_box'>
                        <FaShippingFast />
                    </div>
                    <div className='detail'>
                        <h3>Free delivery</h3>
                        <p>Enjoy free delivery around Limuru once you shop with us</p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon_box'>
                        <FaHeadphones />
                    </div>
                    <div className='detail'>
                        <h3>2/7 support</h3>
                        <p>Any question, help or support needed?? Here we are for your service</p>
                    </div>
                </div>
                <div className='box'>
                    <div className='icon_box'>
                        <FaWallet />
                    </div>
                    <div className='detail'>
                        <h3>Money bank</h3>
                        <p>By shopping with us you will save alot and your wallet will never run dry</p>
                    </div>
                </div>             
            </div>
            <div className='right_box'>
               <div className='header'>
                <img src='images\Colorful Print Palace Logo - Made with PosterMyWall (1).png' alt=''></img>
                <p>Get intouch with us for the best services you would wish at any day or any hour.Feel welcomed</p>
                </div> 
                <div className='bottom'>
                    <div className='box'>
                        <h3>Your Account</h3>
                        <ul>
                            <li>About us</li>
                            <li>Account</li>
                            <li>Payment</li>
                            <li>Sales</li>
                        </ul>
                    </div>
                    <div className='box'>
                        <h3>Products</h3>
                        <ul>
                            <li>Delivery</li>
                            <li>Track Order</li>
                            <li>New products</li>
                            <li>old products</li>
                        </ul>
                    </div>
                    <div className='box'>
                        <h3>Contact us</h3>
                        <ul>
                            <li>259, Vitamin-G</li>
                            <li>+254 717773893/ 072079098</li>
                            <li>gideon1mwangi@gmail.com</li>
                        </ul>
                    </div>
                </div>
             </div>
        </div>   
    </div>
    </>
  )
}

export default Footer