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
        addOns: [],
        wrappingColor: '',
        wrappingStyle: ''
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
            "Bow (on Base)": 5,
            "Letter Centerpiece": 7,
            "Word Centerpiece": 7,
            "Ribbon Centerpiece": 7,
            "3D Butterflies": 3,
            "Multi-layer Wrapping": 0 // Price finalized later
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
        if (category === 'flowerTypes') {
            // Single Select behavior for Flower Types (Radio)
            setSelections(prev => ({ ...prev, [category]: [value] }));
        } else if (category === 'colors' || category === 'addOns') {
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
                            <div className="progress-fill" style={{ width: `${(step / 5) * 100}%` }}></div>
                        </div>
                        <div className="steps-indicator">
                            <span className={step >= 1 ? 'active' : ''}>Size</span>
                            <span className={step >= 2 ? 'active' : ''}>Flowers</span>
                            <span className={step >= 3 ? 'active' : ''}>Add-ons</span>
                            <span className={step >= 4 ? 'active' : ''}>Wrapping</span>
                            <span className={step >= 5 ? 'active' : ''}>Review</span>
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
                                <h3>Type of Flower(s) <span style={{ color: 'red' }}>*</span></h3>
                                <div className="tags-cloud">
                                    {['Roses', 'Lilies', 'Babies Breath', 'Hydrangeas'].map(opt => (
                                        <button
                                            key={opt}
                                            className={`pill-btn ${selections.flowerTypes.includes(opt) ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('flowerTypes', opt)}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                                        <button
                                            className={`pill-btn ${selections.flowerTypes.includes('Other') || (selections.flowerTypes.length > 0 && !['Roses', 'Lilies', 'Babies Breath', 'Hydrangeas'].includes(selections.flowerTypes[0])) ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('flowerTypes', 'Other')}
                                        >
                                            Other
                                        </button>
                                        {(selections.flowerTypes.includes('Other') || (selections.flowerTypes.length > 0 && !['Roses', 'Lilies', 'Babies Breath', 'Hydrangeas'].includes(selections.flowerTypes[0]))) && (
                                            <input
                                                type="text"
                                                placeholder="Specify..."
                                                className="form-input"
                                                style={{ width: '150px', padding: '5px' }}
                                                onChange={(e) => handleOptionSelect('flowerTypes', e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="sub-section">
                                <h3>Color Palette</h3>
                                <div className="color-grid">
                                    {[
                                        { name: 'Red', hex: '#d32f2f' },
                                        { name: 'Pink', hex: '#f48fb1' },
                                        { name: 'White', hex: '#f5f5f5' },
                                        { name: 'Yellow', hex: '#fbc02d' },
                                        { name: 'Orange', hex: '#f57c00' },
                                        { name: 'Purple', hex: '#7b1fa2' },
                                        { name: 'Black', hex: '#212121' },
                                        { name: 'Blue', hex: '#1976d2' },
                                        { name: 'Green', hex: '#388e3c' }
                                    ].map(color => (
                                        <button
                                            key={color.name}
                                            className={`color-btn ${selections.colors.includes(color.name) ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('colors', color.name)}
                                            style={{ backgroundColor: color.hex, border: color.name === 'White' ? '1px solid #ddd' : 'none' }}
                                            title={color.name}
                                        >
                                            {selections.colors.includes(color.name) && <span className="check-mark" style={{ color: color.name === 'White' || color.name === 'Yellow' ? '#333' : '#fff' }}>✓</span>}
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
                                        style={{ height: 'auto', minHeight: '80px' }} // Allow height to grow for long text
                                    >
                                        <div className="card-check"></div>
                                        <span>
                                            {opt}
                                            {opt === "Multi-layer Wrapping"
                                                ? " (price finalized in order confirmation conversation)"
                                                : ` (+$${prices.addOns[opt]})`}
                                        </span>
                                    </button>
                                ))}
                                <button
                                    className={`option-card ${selections.addOns.some(item => item.startsWith('Other:')) ? 'selected' : ''}`}
                                    onClick={() => {
                                        // Prevent default toggle behavior if clicking input
                                    }}
                                    style={{ cursor: 'default', padding: '10px' }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
                                        <div
                                            className="card-check"
                                            style={{ cursor: 'pointer' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const currentOther = selections.addOns.find(item => item.startsWith('Other: '));
                                                if (currentOther) {
                                                    // Remove
                                                    handleOptionSelect('addOns', currentOther);
                                                } else {
                                                    // Add empty
                                                    handleOptionSelect('addOns', 'Other: ');
                                                }
                                            }}
                                        ></div>
                                        <div style={{ flex: 1, textAlign: 'left' }}>
                                            Other:
                                            <input
                                                type="text"
                                                placeholder="Specify..."
                                                style={{
                                                    border: 'none',
                                                    borderBottom: '1px solid #ccc',
                                                    width: '100%',
                                                    outline: 'none',
                                                    marginTop: '5px',
                                                    fontFamily: 'inherit'
                                                }}
                                                value={selections.addOns.find(item => item.startsWith('Other: ')) ? selections.addOns.find(item => item.startsWith('Other: ')).substring(7) : ''}
                                                onChange={(e) => {
                                                    const newVal = `Other: ${e.target.value}`;
                                                    setSelections(prev => {
                                                        const others = prev.addOns.filter(item => !item.startsWith('Other: '));
                                                        return { ...prev, addOns: [...others, newVal] };
                                                    });
                                                }}
                                            />
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-section fade-in">
                            <h2>Step 4: Wrapping Details</h2>
                            <div className="form-group" style={{ margin: '0 auto', maxWidth: '500px' }}>
                                <label style={{ display: 'block', marginBottom: '10px', fontSize: '1.2rem', color: '#333' }}>
                                    Wrapping Paper Color (i.e. White with Gold Rim) <span style={{ color: 'red' }}>*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Short answer text"
                                    value={selections.wrappingColor || ''}
                                    onChange={(e) => handleOptionSelect('wrappingColor', e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        fontSize: '1rem',
                                        border: 'none',
                                        borderBottom: '1px solid #ccc',
                                        outline: 'none',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>

                            <div className="form-group" style={{ margin: '30px auto 0', maxWidth: '600px' }}>
                                <label style={{ display: 'block', marginBottom: '15px', fontSize: '1.2rem', color: '#333', textAlign: 'center' }}>
                                    Style of Wrapping <span style={{ color: 'red' }}>*</span>
                                </label>
                                <div className="options-grid">
                                    <button
                                        className={`option-card ${selections.wrappingStyle === 'Flat Bouquet' ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect('wrappingStyle', 'Flat Bouquet')}
                                        style={{ flexDirection: 'column', gap: '15px', padding: '15px', height: 'auto' }}
                                    >
                                        <div className="card-check"></div>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Flat Bouquet</span>
                                        <img
                                            src="/wrapping-flat-new.jpg"
                                            alt="Flat Bouquet"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '4px',
                                                border: '1px solid #eee'
                                            }}
                                        />
                                    </button>

                                    <button
                                        className={`option-card ${selections.wrappingStyle === 'Classic' ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect('wrappingStyle', 'Classic')}
                                        style={{ flexDirection: 'column', gap: '15px', padding: '15px', height: 'auto' }}
                                    >
                                        <div className="card-check"></div>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Classic</span>
                                        <img
                                            src="/wrapping-classic-new.png"
                                            alt="Classic Bouquet"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderRadius: '4px',
                                                border: '1px solid #eee'
                                            }}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="step-section fade-in">
                            <h2>Step 5: Review Your Creation</h2>
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
                                <div className="summary-row">
                                    <span className="label">Wrapping Color:</span>
                                    <span className="value">{selections.wrappingColor || 'Standard'}</span>
                                </div>
                                <div className="summary-row">
                                    <span className="label">Wrapping Style:</span>
                                    <span className="value">{selections.wrappingStyle || 'Not selected'}</span>
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

                            {step < 5 ? (
                                <button
                                    className="nav-btn next"
                                    onClick={nextStep}
                                    disabled={(step === 1 && !selections.size) || (step === 4 && (!selections.wrappingColor || !selections.wrappingStyle))}
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
        </div >
    );
};

export default CustomPage;
