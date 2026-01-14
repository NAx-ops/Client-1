import React from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav-group left">
                <a href="#shop" className="nav-link">Shop Collections</a>
            </nav>

            <div className="logo-container">
                <img src={logo} alt="Lush Creations by Ylana" className="logo-img" />
            </div>

            <nav className="nav-group right">
                <a href="#story" className="nav-link">Our Story</a>
                <a href="#order" className="btn-consult">Order</a>
            </nav>
        </header>
    );
};

export default Header;
