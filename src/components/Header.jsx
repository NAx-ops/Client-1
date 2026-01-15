import React from 'react';
import { useCart } from '../context/CartContext';
import './Header.css';
import logo from '../assets/logo.png';

const Header = ({ onNavigateHome, onNavigateCustom }) => {
    const { toggleCart, cartItems } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const handleHomeClick = (e, anchorId) => {
        // If onNavigateHome is passed (meaning we might be on custom page), call it
        if (onNavigateHome) {
            onNavigateHome();
            // If anchorId is provided, we might need to handle scroll after nav?
            // simpler approach: just go home.
        }
        // Normal anchor behavior handles the rest if on same page
    };

    const handleOrderClick = (e) => {
        e.preventDefault();
        if (onNavigateCustom) {
            onNavigateCustom();
        }
    };

    return (
        <header className="header">
            <nav className="nav-group left">
                <a href="#shop" onClick={(e) => handleHomeClick(e, '#shop')} className="nav-link">Shop Collections</a>
            </nav>

            <div className="logo-container">
                <img
                    src={logo}
                    alt="Lush Creations by Ylana"
                    className="logo-img"
                    onClick={() => handleHomeClick()}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            <nav className="nav-group right">
                <a href="#story" onClick={(e) => handleHomeClick(e, '#story')} className="nav-link">Our Story</a>
                <a href="#" onClick={handleOrderClick} className="btn-consult">Order</a>
                <button className="cart-btn" onClick={toggleCart}>
                    Cart ({itemCount})
                </button>
            </nav>
        </header>
    );
};

export default Header;
