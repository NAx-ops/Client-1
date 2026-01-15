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

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate API call
        console.log("Order Placed:", { items: cartItems, total: cartTotal, customer: formData });
        setStep(2);
        clearCart();
    };

    return (
        <div className="checkout-overlay">
            <div className="checkout-modal">
                <button className="checkout-close" onClick={onClose}>&times;</button>

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
                                <input
                                    type="date" name="date" required
                                    value={formData.date} onChange={handleInputChange}
                                    placeholder="Preferred Date"
                                />
                            </div>

                            <div className="form-section">
                                <h4>Payment Method</h4>
                                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                                    <option value="Zelle">Zelle</option>
                                    <option value="Apple Pay">Apple Pay</option>
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
                        <button className="back-to-shop-btn" onClick={onClose}>Continue Shopping</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
