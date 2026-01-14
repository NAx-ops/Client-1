import React from 'react';
import './SocialProof.css';

const SocialProof = () => {
    return (
        <section className="social-proof-section" id="social-proof">
            <div className="testimonial-container">
                <div className="testimonial-star">★★★★★</div>
                <p className="testimonial-text">
                    "I wanted my wedding bouquet to be a keepsake. Ylana created a masterpiece
                    that sits in my living room today, looking just as perfect as the day I walked down the aisle."
                </p>
                <p className="testimonial-author">— Sarah M., Arlington, VA</p>
            </div>

            <div className="as-seen-banner">
                <p className="banner-title">As Seen In</p>
                <div className="scrolling-wrapper">
                    {/* Double the track for seamless loop */}
                    <div className="logo-track">
                        <span className="logo-item">Washingtonian Weddings</span>
                        <span className="logo-item">The Knot</span>
                        <span className="logo-item">District Brides</span>
                        <span className="logo-item">Style Me Pretty</span>
                        <span className="logo-item">Vogue Living</span>

                        {/* Duplicate */}
                        <span className="logo-item">Washingtonian Weddings</span>
                        <span className="logo-item">The Knot</span>
                        <span className="logo-item">District Brides</span>
                        <span className="logo-item">Style Me Pretty</span>
                        <span className="logo-item">Vogue Living</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
