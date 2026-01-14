import React from 'react';
import './FeaturedCollections.css';
import colRose from '../assets/col-rose.png';
import colGreens from '../assets/col-greens.png';
import colShenandoah from '../assets/col-shenandoah.png';

const FeaturedCollections = () => {
    const collections = [
        {
            id: 1,
            title: "The Capitol Rose",
            description: "Deep reds and creams",
            image: colRose
        },
        {
            id: 2,
            title: "Potomac Greens",
            description: "Eucalyptus and white lilies",
            image: colGreens
        },
        {
            id: 3,
            title: "Shenandoah Wilds",
            description: "Textured, boho-chic faux wildflowers",
            image: colShenandoah
        }
    ];

    return (
        <section className="collections-section" id="collections">
            <div className="collections-container">
                <h2 className="section-title">Featured Collections</h2>

                <div className="collections-grid">
                    {collections.map((col) => (
                        <div key={col.id} className="collection-card">
                            <div className="card-image-container">
                                <img src={col.image} alt={col.title} loading="lazy" />
                            </div>
                            <div className="card-details">
                                <h3 className="card-title">{col.title}</h3>
                                <p className="card-desc">{col.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="shop-all-btn-container">
                    <a href="#shop-all" className="btn-link">Shop All Arrangements →</a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedCollections;
