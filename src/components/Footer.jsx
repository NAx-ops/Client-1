import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-col">
                    <div className="footer-logo">LUSH CREATIONS</div>
                    <p className="footer-year">© 2026 Lush Creations by Ylana.<br />All rights reserved.</p>
                </div>

                <div className="footer-col" style={{ textAlign: 'center' }}>
                    <div className="social-links">
                        <a href="https://www.instagram.com/lushcreationsby_ylana/#" target="_blank" rel="noopener noreferrer" className="social-link">Instagram</a>
                        <a href="https://www.pinterest.com/lushcreationsbyylana/" target="_blank" rel="noopener noreferrer" className="social-link">Pinterest</a>
                    </div>
                </div>

                <div className="footer-col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    {/* Newsletter removed */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
