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
                        <a href="#insta" className="social-link">Instagram</a>
                        <a href="#pin" className="social-link">Pinterest</a>
                        <a href="#tiktok" className="social-link">TikTok</a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4 className="newsletter-title">The Bloom Report</h4>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Email Address" className="newsletter-input" />
                        <button className="newsletter-btn">→</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
