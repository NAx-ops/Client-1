import React, { useState, useEffect } from 'react';
import './CustomBuilder.css';
import { useCart } from '../context/CartContext';

const CustomBuilder = ({ isOpen, onClose, initialData = null }) => {
    const { addToCart, updateItem } = useCart();
    const [step, setStep] = useState(1);
    const [selections, setSelections] = useState({
        size: '',
        style: '',
        flowerTypes: [],
        colors: [],
        wrapping: ''
    });

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // If editing, populate state
                setSelections(initialData.selectedOptions);
                // Also need logic to potentially skip to review or start at 1? 
                // Let's start at 1 but with pre-filled values.
                setStep(1);
            } else {
                // Reset if new
                setStep(1);
                setSelections({
                    size: '',
                    style: '',
                    flowerTypes: [],
                    colors: [],
                    wrapping: ''
                });
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleOptionSelect = (category, value) => {
        if (category === 'flowerTypes' || category === 'colors') {
            setSelections(prev => {
                const list = prev[category];
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

    const handleFinish = () => {
        // Calculate price based on size (simplified logic)
        let price = "$0.00";
        if (selections.size.includes('$45')) price = "$45.00";
        else if (selections.size.includes('$75')) price = "$75.00";
        else if (selections.size.includes('$125')) price = "$125.00";
        else price = "$100.00"; // Default fallback

        const item = {
            id: initialData ? initialData.id : `custom-${Date.now()}`,
            cartItemId: initialData ? initialData.cartItemId : undefined, // Preserves cartId if editing
            name: "Custom Arrangement",
            price: price, // Dynamic based on size
            isCustom: true,
            selectedOptions: selections,
            image: null // TODO: Add a placeholder image for custom items
        };

        if (initialData) {
            updateItem(initialData.cartItemId, item);
        } else {
            addToCart(item);
        }
        onClose();
    };

    return (
        <div className="builder-overlay">
            <div className="builder-modal">
                <button className="builder-close" onClick={onClose}>&times;</button>

                <div className="builder-header">
                    <h3>{initialData ? 'Edit Your Arrangement' : 'Build Your Own Arrangement'}</h3>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
                    </div>
                </div>

                <div className="builder-content">
                    {step === 1 && (
                        <div className="step-container">
                            <h4>Step 1: Choose Size & Budget</h4>
                            <div className="options-grid">
                                {['Small ($45-$65)', 'Medium ($75-$95)', 'Large ($125+)'].map(opt => (
                                    <button
                                        key={opt}
                                        className={`option-btn ${selections.size === opt ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect('size', opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="step-container">
                            <h4>Step 2: Choose Style</h4>
                            <div className="options-grid">
                                {['Modern', 'Boho', 'Classic', 'Wildflower'].map(opt => (
                                    <button
                                        key={opt}
                                        className={`option-btn ${selections.style === opt ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect('style', opt)}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="step-container">
                            <h4>Step 3: Flowers & Colors</h4>
                            <div className="sub-step">
                                <h5>Flower Types</h5>
                                <div className="tags-container">
                                    {['Roses', 'Lilies', 'Hydrangeas', 'Peonies', 'Sunflowers'].map(opt => (
                                        <button
                                            key={opt}
                                            className={`tag-btn ${selections.flowerTypes.includes(opt) ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('flowerTypes', opt)}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="sub-step">
                                <h5>Colors</h5>
                                <div className="tags-container">
                                    {['Red', 'White', 'Pink', 'Yellow', 'Purple', 'Orange', 'Green'].map(opt => (
                                        <button
                                            key={opt}
                                            className={`tag-btn ${selections.colors.includes(opt) ? 'selected' : ''}`}
                                            onClick={() => handleOptionSelect('colors', opt)}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="step-container">
                            <h4>Step 4: Review</h4>
                            <div className="review-summary">
                                <p><strong>Size:</strong> {selections.size || 'Not selected'}</p>
                                <p><strong>Style:</strong> {selections.style || 'Not selected'}</p>
                                <p><strong>Flowers:</strong> {selections.flowerTypes.join(', ') || 'Any'}</p>
                                <p><strong>Colors:</strong> {selections.colors.join(', ') || 'Any'}</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="builder-footer">
                    {step > 1 && <button className="nav-btn prev" onClick={prevStep}>Back</button>}
                    {step < 4 ? (
                        <button className="nav-btn next" onClick={nextStep}>Next</button>
                    ) : (
                        <button className="nav-btn finish" onClick={handleFinish}>
                            {initialData ? 'Update Cart' : 'Add to Cart'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomBuilder;
