import React from 'react';
import './Hero.css';
import heroBg from '../assets/hero-bg.jpg';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background">
                <img src={heroBg} alt="Hand-tied bouquet in sun-drenched window" />
            </div>
            <div className="hero-overlay"></div>

            <div className="hero-content">
                <h1 className="hero-headline">Timeless Beauty,<br />Rooted in the DMV.</h1>
                <p className="hero-subheadline">
                    Premium Faux Floral Artistry for Homes and Weddings that Last a Lifetime.
                </p>

                <div className="hero-buttons">
                    <button className="btn btn-primary">View the Signature Collection</button>
                    <button className="btn btn-secondary">Inquire for Custom Work</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
