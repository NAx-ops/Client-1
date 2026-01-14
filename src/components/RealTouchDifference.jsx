import React from 'react';
import './RealTouchDifference.css';
import realTouchImg from '../assets/real-touch.png';

const RealTouchDifference = () => {
    return (
        <section className="real-touch-section" id="real-touch">
            <div className="rt-image-col">
                <img src={realTouchImg} alt="Close up of real-touch flower texture" loading="lazy" />
            </div>

            <div className="rt-content-col">
                <div className="rt-content-wrapper">
                    <div className="rt-quote-icon">“</div>
                    <p className="rt-text">
                        If you didn't know, you'd reach for the watering can.
                    </p>
                    <div style={{ height: '2px', width: '40px', background: 'var(--color-secondary)', margin: '1.5rem 0' }}></div>
                    <p className="rt-desc">
                        We source only the highest grade 'Real-Touch' materials that mimic the cellular texture of live flowers.
                        It’s not just a bouquet; it’s a permanent piece of art.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default RealTouchDifference;
