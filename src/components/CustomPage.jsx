import React, { useState, useEffect } from 'react';
import './CustomPage.css';
import { useCart } from '../context/CartContext';

const CustomPage = ({ onNavigateHome, initialData = null }) => {
    const { addToCart, updateItem } = useCart();
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        size: '',
        flowerTypes: [],
        colors: [],
        addOns: []
    });

    const prices = {
        size: {
            "Dozen (12)": 24,
            "Pentadeca (15)": 30,
            "Viginti (20)": 40,
            "Triaconta (30)": 60,
            "Tetraconta (40)": 80,
            "Pentaconta (50)": 100
        },
        addOns: {
            "Bow": 5,
            "Letter Centerpiece": 7,
            "Word Centerpiece": 7,
            "Ribbon Centerpiece": 7,
            "3D Butterflies": 3
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (initialData) {
            setSelections(initialData.selectedOptions);
            setStep(1);
        }
    }, [initialData]);

    const handleOptionSelect = (category, value) => {
        if (category === 'flowerTypes' || category === 'colors' || category === 'addOns') {
            setSelections(prev => {
                const list = prev[category] || [];
                if (list.includes(value)) {
                    return { ...prev, [category]: list.filter(item => item !== value) };
                } else {
                    return { ...prev, [category]: [...list, value] };
                }
            });
        } else {
            setSelections(prev => ({ ...prev, [category]: value }));
        }
    };

    const nextStep = () => setStep(prev => prev + 1);
    const prevStep = () => setStep(prev => prev - 1);

    const calculateTotal = () => {
        let total = 0;
        // Size Price
        const sizeName = selections.size;
        if (sizeName && prices.size[sizeName]) {
            total += prices.size[sizeName];
        }

        // Add-ons Price
        (selections.addOns || []).forEach(addOn => {
            if (prices.addOns[addOn]) {
                total += prices.addOns[addOn];
            }
        });

        return total;
    };

    const handleFinish = () => {
        const calculatePriceString = () => {
            return `$${calculateTotal()}`;
        };

        const item = {
            id: initialData ? initialData.id : `custom-${Date.now()}`,
            cartItemId: initialData ? initialData.cartItemId : undefined,
            name: "Custom Arrangement",
            price: calculatePriceString(),
            isCustom: true,
            selectedOptions: selections,
            image: null
        };

        if (initialData) {
            updateItem(initialData.cartItemId, item);
        } else {
            addToCart(item);
        }
        onNavigateHome();
    };

    return (
        <div className="custom-page">
            <div className="custom-page-container">
                <button className="back-btn" onClick={onNavigateHome}>&larr; Return to Shop</button>

                <div className="custom-header">
                    <h1>{initialData ? 'Edit Your Arrangement' : 'Build Your Own Arrangement'}</h1>
                    <div className="progress-bar-container">
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                        </div>
                        <div className="steps-indicator">
                            <span className={step >= 1 ? 'active' : ''}>Size</span>
                            <span className={step >= 2 ? 'active' : ''}>Flowers</span>
                            <span className={step >= 3 ? 'active' : ''}>Add-ons</span>
                            <span className={step >= 4 ? 'active' : ''}>Review</span>
                        </div>
                    </div>
                </div>

                <div className="custom-content">
                    {step === 1 && (
                        <div className="step-section fade-in">
                            <h2>Step 1: Choose Size & Budget</h2>
                            <div className="options-grid large">
                                {Object.keys(prices.size).map(opt => (
                                    <button
                                        key={opt}
                                        className={`option-card ${selections.size === opt ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect('size', opt)}
                                    >
                                        <div className="card-check"></div>
                                        {opt} - ${prices.size[opt]}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-section fade-in">
                            <h2>Step 2: Flowers & Colors</h2>

                            <div className="sub-section">
                                <h3>Flower Types</h3>
                                <div className="tags-cloud">
                                    {['Roses', 'Lilies', 'Hydrangeas', 'Peonies', 'Sunflowers', 'Tulips', 'Orchids'].map(opt => (
                                        <button
                                            key={opt}
                                            className={`pill-btn ${selections.flowerTypes.includes(opt) ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('flowerTypes', opt)}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="sub-section">
                                <h3>Color Palette</h3>
                                <div className="color-grid">
                                    {[
                                        { name: 'Red', hex: '#d32f2f' },
                                        { name: 'White', hex: '#f5f5f5' },
                                        { name: 'Pink', hex: '#f48fb1' },
                                        { name: 'Yellow', hex: '#fbc02d' },
                                        { name: 'Purple', hex: '#7b1fa2' },
                                        { name: 'Orange', hex: '#f57c00' },
                                        { name: 'Green', hex: '#388e3c' }
                                    ].map(color => (
                                        <button
                                            key={color.name}
                                            className={`color-btn ${selections.colors.includes(color.name) ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('colors', color.name)}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        >
                                            {selections.colors.includes(color.name) && <span className="check-mark">✓</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-section fade-in">
                            <h2>Step 3: Add-ons</h2>
                            <div className="options-grid">
                                {Object.keys(prices.addOns).map(opt => (
                                    <button
                                        key={opt}
                                        className={`option-card ${selections.addOns.includes(opt) ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect('addOns', opt)}
                                    >
                                        <div className="card-check"></div>
                                        {opt} (+${prices.addOns[opt]})
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-section fade-in">
                            <h2>Step 4: Review Your Creation</h2>
                            <div className="summary-card">
                                <div className="summary-row">
                                    <span className="label">Size:</span>
                                    <span className="value">{selections.size || 'Not selected'}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="label">Flowers:</span>
                                    <span className="value">{selections.flowerTypes.join(', ') || 'Any'}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="label">Colors:</span>
                                    <span className="value">{selections.colors.join(', ') || 'Any'}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="label">Add-ons:</span>
                                    <span className="value">{selections.addOns.join(', ') || 'None'}</span>
                                </div>
                                <div className="summary-row total">
                                    <span className="label">Total Price:</span>
                                    <span className="value price">${calculateTotal()}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="custom-footer">
                    <div className="footer-content">
                        <div className="running-total">
                            Total: <span>${calculateTotal()}</span>
                        </div>

                        <div className="nav-buttons">
                            {step > 1 && (
                                <button className="nav-btn prev" onClick={prevStep}>Back</button>
                            )}

                            {step < 4 ? (
                                <button
                                    className="nav-btn next"
                                    onClick={nextStep}
                                    disabled={step === 1 && !selections.size}
                                >
                                    Next Step
                                </button>
                            ) : (
                                <button className="nav-btn finish" onClick={handleFinish}>
                                    {initialData ? 'Update Cart' : 'Add to Cart'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPage;
