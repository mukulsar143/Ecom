import React from 'react'
import {FaPiggyBank, FaShippingFast, FaWallet, FaHeadphonesAlt} from 'react-icons/fa'
import './footer.css'
import logo from '../../Pictures/logo.png'

export default function Footer() {
  return (
    <>
    <div className="footer">
        <div className="container">
            <div className="left_box">
                <div className="box">
                    <div className="icon_box">
                        <FaPiggyBank/>
                    </div>
                    <div className="details">
                        <h3>Great savings</h3>
                        <p>Lorem ipsum, dolor sit amet.</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon_box">
                        <FaHeadphonesAlt/>
                    </div>
                    <div className="details">
                        <h3>24/7 Support</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon_box">
                        <FaWallet/>
                    </div>
                    <div className="details">
                        <h3>Money Bank</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
                <div className="box">
                    <div className="icon_box">
                        <FaShippingFast/>
                    </div>
                    <div className="details">
                        <h3>Free Delivery</h3>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
            <div className="right_box">
                <div className="header">
                    <img src={logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, facere est. Labore est beatae rem nihil cum possimus excepturi dolores sequi? Laudantium accusamus sequi blanditiis eveniet deserunt aliquam, beatae nostrum!</p>
                </div>
                <div className="bottom">
                    <div className="box">
                        <h3>
                            Your Account
                        </h3>
                        <ul>
                            <li>About Us</li>
                            <li>Account</li>
                            <li>Payment</li>
                            <li>Sales</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h3>
                            Products
                        </h3>
                        <ul>
                            <li>Delivery</li>
                            <li>Track Order</li>
                            <li>New Products</li>
                            <li>Old Products</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h3>
                            Contact Us
                        </h3>
                        <ul>
                            <li>Python Full Stack Developer</li>
                            <li>+(91) 6306659377</li>
                            <li>djangomake143@gmail.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
