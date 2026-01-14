import React, { useState, useEffect } from 'react';
import './WhyFaux.css';
import slide1 from '../assets/carousel-slide-1.png';
import slide2 from '../assets/carousel-slide-2.png';
import slide3 from '../assets/carousel-slide-3.png';
import slide4 from '../assets/carousel-slide-4.png';

const WhyFaux = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const slides = [
        { id: 1, image: slide1, alt: "Golden Glitter Roses Bouquet" },
        { id: 2, image: slide2, alt: "Emerald Green Custom Letter Bouquet" },
        { id: 3, image: slide3, alt: "Pink and Red '22' Number Bouquet" },
        { id: 4, image: slide4, alt: "Royal Purple Glitter Roses" }
    ];

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="section why-faux" id="gallery">
            <div className="container">
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>The Art of Faux</h2>
                    <div style={{ width: '60px', height: '2px', background: 'var(--color-secondary)', margin: '0 auto' }}></div>
                    <p style={{ marginTop: '1rem', color: 'var(--color-text-light)' }}>Explore our gallery of everlasting blooms.</p>
                </div>

                <div className="carousel-container">
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {slides.map((slide) => (
                            <div key={slide.id} className="carousel-slide">
                                <img
                                    src={slide.image}
                                    alt={slide.alt}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover', // Ensures seamless fill
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="carousel-nav">
                        <button className="nav-btn" onClick={prevSlide}>&larr;</button>
                        <button className="nav-btn" onClick={nextSlide}>&rarr;</button>
                    </div>

                    <div className="carousel-dots">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                className={`dot ${idx === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(idx)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyFaux;
