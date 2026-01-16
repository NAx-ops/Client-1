import React from 'react';
import { useCart } from '../context/CartContext';
import './Header.css';
import logo from '../assets/logo.png';

const Header = ({ onNavigateHome, onNavigateCustom }) => {
    const { toggleCart, cartItems } = useCart();
    const itemCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const handleHomeClick = (e, anchorId) => {
        setIsMenuOpen(false); // Close menu on nav
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
        setIsMenuOpen(false);
        if (onNavigateCustom) {
            onNavigateCustom();
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img
                    src={logo}
                    alt="Lush Creations by Ylana"
                    className="logo-img"
                    onClick={() => handleHomeClick()}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            {/* Mobile Actions (Cart + Menu Toggle) */}
            <div className="mobile-actions">
                <button className="cart-btn mobile-cart-btn" onClick={toggleCart}>
                    Cart ({itemCount})
                </button>
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Menu">
                    {isMenuOpen ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    )}
                </button>
            </div>

            {/* Navigation Overlay */}
            <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="nav-group left">
                    <a href="#shop" onClick={(e) => handleHomeClick(e, '#shop')} className="nav-link">Shop Collections</a>
                </div>

                <div className="nav-group right">
                    <a href="#story" onClick={(e) => handleHomeClick(e, '#story')} className="nav-link">Our Story</a>
                    <a href="#" onClick={handleOrderClick} className="btn-consult">Order</a>
                    {/* Desktop Cart Button */}
                    <button className="cart-btn desktop-cart-btn" onClick={toggleCart}>
                        Cart ({itemCount})
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
