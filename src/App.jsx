import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import ProductList from './ProductList';
import CartItem from './CartItem';
import AboutUs from './AboutUs';
import { useSelector } from 'react-redux';
import './App.css';
import './ProductList.css'; // For navbar styles

function App() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    setShowCart(true);
  };
  
  const handleContinueShopping = () => {
    setShowCart(false);
  }

  // Landing Page Component
  const LandingPage = () => (
    <div className="landing-page">
      <div className="background-image"></div>
      <div className="content">
        <div className="landing_content">
          <h1>Welcome To Paradise Nursery</h1>
          <div className="divider"></div>
          <p>Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={() => navigate('/products')}>
            Get Started
          </button>
        </div>
        <div className="aboutus_container">
          <AboutUs/>
        </div>
      </div>
    </div>
  );
  
  // Main Layout for pages with Navbar
  const MainLayout = ({ children }) => (
    <div>
        <div className="navbar" style={{
            backgroundColor: '#4CAF50',
            color: '#fff!important',
            padding: '15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '20px',
        }}>
            <div className="tag">
                <div className="luxury">
                    <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="logo" />
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div>
                            <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                            <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                        </div>
                    </Link>
                </div>
            </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <Link to="/products" style={{ color: 'white', fontSize: '30px', textDecoration: 'none' }}>Plants</Link>
                <div onClick={handleCartClick} style={{ cursor: 'pointer', position: 'relative' }}>
                    <h1 className='cart'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                            <rect width="156" height="156" fill="none"></rect>
                            <circle cx="80" cy="216" r="12"></circle>
                            <circle cx="184" cy="216" r="12"></circle>
                            <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12"></path>
                        </svg>
                        {totalQuantity > 0 && <span className="cart-item-count">{totalQuantity}</span>}
                    </h1>
                </div>
            </div>
        </div>
        
        {showCart ? <CartItem onContinueShopping={handleContinueShopping} /> : children}
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/products" element={<MainLayout><ProductList /></MainLayout>} />
    </Routes>
  );
}

export default App;