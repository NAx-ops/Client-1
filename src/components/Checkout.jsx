import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Checkout.css';

const Checkout = ({ isOpen, onClose }) => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Details, 2: Confirmation
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        deliveryType: 'Delivery',
        address: '',
        date: '',
        paymentMethod: 'Zelle'
    });

    const googleFormRef = React.useRef(null);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the hidden Google Form
        if (googleFormRef.current) {
            googleFormRef.current.submit();
        }

        console.log("Order Placed:", { items: cartItems, total: cartTotal, customer: formData });
        setStep(2);
        // Do NOT clear cart yet to ensure form inputs persist for submission
    };

    const handleClose = () => {
        if (step === 2) {
            clearCart();
        }
        onClose();
        // Reset step after closing (optional, but good practice if modal stays mounted)
        setTimeout(() => setStep(1), 300);
    };

    // Helper to map values to Google Form logic
    const getPaymentValue = (method) => {
        if (method === 'Cash') return 'Cash (pickup/delivery)';
        return method;
    };

    // Helper to map Size to Google Form option (Dozen (12) -> Dozen - 12 ($24))
    const getSizeValue = (size) => {
        const map = {
            "Dozen (12)": "Dozen - 12 ($24)",
            "Pentadeca (15)": "Pentadeca - 15 ($30)",
            "Viginti (20)": "Viginti - 20 ($40)",
            "Triaconta (30)": "Triaconta - 30 ($60)",
            "Tetraconta (40)": "Tetraconta - 40 ($80)",
            "Pentaconta (50)": "Pentaconta - 50 ($100)"
        };
        return map[size] || size;
    };

    // Helper to map Add-ons (Bow (on Base) -> Bow (on Base) (+$5))
    const getAddonValue = (addon) => {
        // Known addons with prices
        const priceMap = {
            "Bow (on Base)": 5,
            "Letter Centerpiece": 7,
            "Word Centerpiece": 7,
            "Ribbon Centerpiece": 7,
            "3D Butterflies": 3
        };

        if (priceMap[addon]) {
            return `${addon} (+$${priceMap[addon]})`;
        }
        // Multi-layer wrapping has special text
        if (addon === "Multi-layer Wrapping") {
            return "Multi-layer Wrapping (price finalized in order confirmation conversation)";
        }
        return addon;
    };

    // Determine order type: Collection only vs. Custom/Mixed
    const isCollectionOrder = cartItems.length > 0 && cartItems.every(item => !item.isCustom);

    const collectionFormAction = "https://docs.google.com/forms/d/e/1FAIpQLSfFiR6Y5JGggIkE5vqyuxflsdUD_RnDiSi_V147vXQFw4ADWw/formResponse";
    const customFormAction = "https://docs.google.com/forms/d/e/1FAIpQLSfSaKLPWiTtN7DQQDNsww1nfbO5d6jMEvY8rT0JEmhTSMEFIw/formResponse";

    return (
        <div className="checkout-overlay">
            <div className="checkout-modal">
                <button className="checkout-close" onClick={handleClose}>&times;</button>

                {/* Hidden Google Form Integration */}
                <iframe name="hidden_iframe" style={{ display: 'none' }} title="hidden_iframe"></iframe>
                <form
                    ref={googleFormRef}
                    action={isCollectionOrder ? collectionFormAction : customFormAction}
                    method="POST"
                    target="hidden_iframe"
                    style={{ display: 'none' }}
                >
                    {/* Customer Details - Common Fields */}
                    <input type="hidden" name="entry.1949433871" value={formData.fullName} />
                    <input type="hidden" name="entry.1966413202" value={formData.email} />
                    <input type="hidden" name="entry.1110522930" value={formData.phone} />
                    <input type="hidden" name="entry.1863203823" value={formData.deliveryType} />
                    <input type="hidden" name="entry.1761537560" value={formData.date} />
                    <input type="hidden" name="entry.1895842897" value={getPaymentValue(formData.paymentMethod)} />

                    {/* Collection Order Specifics */}
                    {isCollectionOrder && (
                        <input
                            type="hidden"
                            name="entry.2046504845"
                            value={cartItems.map(i => `${i.name} (x${i.quantity || 1})`).join(", ")}
                        />
                    )}

                    {/* Custom Order Specifics - Existing Mapping */}
                    {!isCollectionOrder && cartItems.map((item, index) => {
                        const opts = item.selectedOptions || {};
                        return (
                            <React.Fragment key={index}>
                                {/* Size - Mapped */}
                                {opts.size && <input type="hidden" name="entry.1617117345" value={getSizeValue(opts.size)} />}

                                {/* Wrapping Style */}
                                {opts.wrappingStyle && <input type="hidden" name="entry.776758289" value={opts.wrappingStyle} />}

                                {/* Wrapping Color */}
                                {opts.wrappingColor && <input type="hidden" name="entry.558131726" value={opts.wrappingColor} />}

                                {/* Arrays: Render multiple inputs for multi-select checkboxes */}
                                {opts.flowerTypes?.map((flower, i) => (
                                    <input key={`flower-${index}-${i}`} type="hidden" name="entry.815724072" value={flower} />
                                ))}

                                {opts.colors?.map((color, i) => (
                                    <input key={`color-${index}-${i}`} type="hidden" name="entry.1324502170" value={color} />
                                ))}

                                {/* Add-ons - Mapped */}
                                {opts.addOns?.map((addon, i) => (
                                    <input key={`addon-${index}-${i}`} type="hidden" name="entry.117331266" value={getAddonValue(addon)} />
                                ))}
                            </React.Fragment>
                        );
                    })}
                </form>

                {step === 1 ? (
                    <>
                        <div className="checkout-header">
                            <h3>Checkout</h3>
                            <p className="order-total">Total: ${cartTotal.toFixed(2)}</p>
                        </div>

                        <form className="checkout-form" onSubmit={handleSubmit}>
                            <div className="form-section">
                                <h4>Contact Information</h4>
                                <input
                                    type="text" name="fullName" placeholder="Full Name" required
                                    value={formData.fullName} onChange={handleInputChange}
                                />
                                <input
                                    type="email" name="email" placeholder="Email Address" required
                                    value={formData.email} onChange={handleInputChange}
                                />
                                <input
                                    type="tel" name="phone" placeholder="Phone Number" required
                                    value={formData.phone} onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-section">
                                <h4>Delivery Details</h4>
                                <div className="radio-group-checkout">
                                    <label>
                                        <input
                                            type="radio" name="deliveryType" value="Delivery"
                                            checked={formData.deliveryType === 'Delivery'}
                                            onChange={handleInputChange}
                                        /> Delivery
                                    </label>
                                    <label>
                                        <input
                                            type="radio" name="deliveryType" value="Pickup"
                                            checked={formData.deliveryType === 'Pickup'}
                                            onChange={handleInputChange}
                                        /> Pickup
                                    </label>
                                </div>
                                {formData.deliveryType === 'Delivery' && (
                                    <textarea
                                        name="address" placeholder="Delivery Address" required
                                        value={formData.address} onChange={handleInputChange}
                                        rows="2"
                                    ></textarea>
                                )}
                                <label className="input-label" style={{ display: 'block', marginTop: '1rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                    Preferred Date <span style={{ color: '#d9534f' }}>*</span>
                                </label>
                                <input
                                    type="date" name="date" required
                                    value={formData.date} onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-section">
                                <h4>Payment Method</h4>
                                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                                    <option value="Zelle">Zelle</option>
                                    <option value="Apple Pay">Apple Pay</option>
                                    <option value="CashApp">CashApp</option>
                                    <option value="Cash">Cash (on pickup/delivery)</option>
                                </select>
                            </div>

                            <button type="submit" className="place-order-btn">Place Order</button>
                        </form>
                    </>
                ) : (
                    <div className="order-success">
                        <div className="success-icon">✓</div>
                        <h3>Order Placed Successfully!</h3>
                        <p>Thank you, {formData.fullName}. We have likely sent you a confirmation email.</p>
                        <p>We will contact you shortly at {formData.phone} to coordinate delivery.</p>
                        <button className="back-to-shop-btn" onClick={handleClose}>Continue Shopping</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
