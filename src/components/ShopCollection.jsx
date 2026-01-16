import React from 'react';
import { useCart } from '../context/CartContext';
import './ShopCollection.css';

// Importing new product images
import productWhiteGold from '../assets/products/product-white-gold.jpg';
import productPinkGlitter from '../assets/products/product-pink-glitter.jpg';
import productGreenGlitter from '../assets/products/product-green-glitter.jpg';
import productLilies from '../assets/products/product-lilies.jpg';
import productRedPink22 from '../assets/products/product-red-pink-22.jpg';
import productGoldOrange from '../assets/products/product-gold-orange.jpg';
import productPurpleGlitter from '../assets/products/product-purple-glitter.jpg';
import productButterflyMix from '../assets/products/product-butterfly-mix.jpg';

const ShopCollection = () => {
    const { addToCart } = useCart();

    const products = [
        {
            id: 2,
            name: "Pink Glitter Senior Night",
            price: "$37.00",
            image: productPinkGlitter,
            tag: "New"
        },
        {
            id: 3,
            name: "Emerald Luxury Initial",
            price: "$47.00",
            image: productGreenGlitter,
            tag: null
        },
        {
            id: 4,
            name: "Radiant Lilies",
            price: "$29.00",
            image: productLilies,
            tag: null
        },
        {
            id: 5,
            name: "Beautiful 22",
            price: "$87.00",
            image: productRedPink22,
            tag: "Custom Favorite"
        },
        {
            id: 6,
            name: "Golden Hour Glow",
            price: "$65.00",
            image: productGoldOrange,
            tag: "Trending"
        },
        {
            id: 7,
            name: "Midnight Purple Glitter",
            price: "$30.00",
            image: productPurpleGlitter,
            tag: null
        },
        {
            id: 8,
            name: "Butterfly Garden Mix",
            price: "$43.00",
            image: productButterflyMix,
            tag: "Limited Edition"
        }
    ];

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    return (
        <section className="shop-section" id="shop">
            <div className="shop-container">
                <div className="shop-header">
                    <h2 className="section-title">Shop Our Collection</h2>
                    <p className="section-subtitle">Handcrafted faux arrangements that look and feel real.</p>
                </div>

                <div className="product-grid">
                    {products.map((product) => (
                        <div key={product.id} className="product-card">
                            <div className="product-image-wrapper">
                                <img src={product.image} alt={product.name} loading="lazy" />
                                {product.tag && <span className="product-tag">{product.tag}</span>}
                                <button
                                    className="add-to-cart-btn"
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-price">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ShopCollection;
