import React from 'react';
import './SocialProof.css';

const SocialProof = () => {
    return (
        <section className="social-proof-section" id="social-proof">
            <div className="testimonial-container">
                <div className="testimonial-star">★★★★★</div>
                <p className="testimonial-text">
                    "Perfect gift for my girlfriend."
                </p>
                <p className="testimonial-author">— Kevin A., Bowie, MD</p>
            </div>

            <div className="as-seen-banner">
                <p className="banner-title">Perfect</p>
                <div className="scrolling-wrapper">
                    {/* Double the track for seamless loop */}
                    <div className="logo-track">
                        <span className="logo-item">Romantic gifts</span>
                        <span className="logo-item">Room Decor</span>
                        <span className="logo-item">Offices</span>
                        <span className="logo-item">Instagram Accessory</span>
                        <span className="logo-item">Hypoallergenic environment</span>

                        {/* Duplicate */}
                        <span className="logo-item">Romantic gifts</span>
                        <span className="logo-item">Room Decor</span>
                        <span className="logo-item">Offices</span>
                        <span className="logo-item">Instagram Accessory</span>
                        <span className="logo-item">Hypoallergenic environment</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
