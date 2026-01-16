import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        contactMethod: '',
        quantity: '',
        quantityOther: '',
        quantityOther: '',
        flowerType: '',
        flowerTypeOther: '',
        flowerColors: [],
        multiColorDetails: '',
        addOns: [],
        addOnOther: '',
        wrappingColor: '',
        wrappingStyle: '',
        deliveryType: '',
        date: '',
        paymentMethod: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e, category) => {
        const { value, checked } = e.target;
        setFormData(prev => {
            const list = prev[category];
            if (checked) {
                return { ...prev, [category]: [...list, value] };
            } else {
                return { ...prev, [category]: list.filter(item => item !== value) };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Order Submitted:', formData);
        alert(`Thank you for ordering from Lush Creations by Ylana! We will contact you within the next 24 hours to confirm your order and send you the deposit information. Again, Thank you!`);
        // Reset form or redirect logic here
    };

    return (
        <section className="section contact-section" id="order">
            <div className="contact-container">
                <div className="form-header">
                    <h2>Lush Creations by Ylana Order Form</h2>
                    <p className="form-intro">
                        Thank you for choosing us to create something beautiful for your special occasion.
                        Please note that a deposit is required to secure your order. After you submit this form,
                        I will personally contact you to confirm details. <br /><br />
                        <em>Orders must be placed at least 4–5 days in advance.</em>
                    </p>
                </div>

                <form className="order-form" onSubmit={handleSubmit}>
                    {/* Personal Info */}
                    <div className="form-group">
                        <label className="form-label">Full Name <span className="required">*</span></label>
                        <input type="text" name="fullName" className="form-input" required onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Preferred Form of Contact (Instagram, Phone, etc.) <span className="required">*</span></label>
                        <input type="text" name="contactMethod" className="form-input" required onChange={handleInputChange} />
                    </div>

                    {/* Quantity */}
                    <div className="form-group">
                        <label className="form-label">Quantity <span className="required">*</span></label>
                        <div className="radio-group">
                            {['Dozen - 12 ($24)', 'Pentadeca - 15 ($30)', 'Viginti - 20 ($40)', 'Triaconta - 30 ($60)', 'Tetraconta - 40 ($80)', 'Pentaconta - 50 ($100)'].map(opt => (
                                <label key={opt} className="radio-label">
                                    <input type="radio" name="quantity" value={opt} required onChange={handleInputChange} /> {opt}
                                </label>
                            ))}
                            <label className="radio-label">
                                <input type="radio" name="quantity" value="Other" onChange={handleInputChange} /> Other:
                                <input type="text" name="quantityOther" className="form-input" style={{ marginLeft: '10px', width: '200px', display: 'inline-block' }} onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>

                    {/* Flower Types */}
                    <div className="form-group">
                        <label className="form-label">Type of Flower(s) <span className="required">*</span></label>
                        <div className="radio-group">
                            {['Roses', 'Lilies', 'Babies Breath', 'Hydrangeas'].map(flower => (
                                <label key={flower} className="radio-label">
                                    <input type="radio" name="flowerType" value={flower} required onChange={handleInputChange} /> {flower}
                                </label>
                            ))}
                            <label className="radio-label">
                                <input type="radio" name="flowerType" value="Other" onChange={handleInputChange} /> Other:
                                <input type="text" name="flowerTypeOther" className="form-input" style={{ marginLeft: '10px', display: 'inline-block', width: '200px' }} onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="form-group">
                        <label className="form-label">Flower Color(s) <span className="required">*</span></label>
                        <div className="checkbox-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            {['Red', 'Pink', 'White', 'Yellow', 'Orange', 'Purple', 'Black', 'Blue', 'Green'].map(color => (
                                <label key={color} className="checkbox-label">
                                    <input type="checkbox" value={color} onChange={(e) => handleCheckboxChange(e, 'flowerColors')} /> {color}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">If Multiple Colors quantity of each (for roses)</label>
                        <input type="text" name="multiColorDetails" className="form-input" onChange={handleInputChange} />
                    </div>

                    {/* Add-ons */}
                    <div className="form-group">
                        <label className="form-label">Add-ons</label>
                        <div className="checkbox-group">
                            {['Bow (on Base) (+$5)', 'Letter Centerpiece (+$7)', 'Word Centerpiece (+$7)', 'Ribbon Centerpiece (+$7)', '3D Butterflies (+$3)', 'Multi-layer Wrapping (price finalized in order confirmation conversation)'].map(addon => (
                                <label key={addon} className="checkbox-label">
                                    <input type="checkbox" value={addon} onChange={(e) => handleCheckboxChange(e, 'addOns')} /> {addon}
                                </label>
                            ))}
                            <label className="checkbox-label">
                                Other: <input type="text" name="addOnOther" className="form-input" style={{ marginLeft: '10px', display: 'inline-block', flex: 1 }} onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>

                    {/* Wrapping */}
                    <div className="row">
                        <div className="form-group">
                            <label className="form-label">Wrapping Paper Color (i.e. White with Gold Rim) <span className="required">*</span></label>
                            <input type="text" name="wrappingColor" className="form-input" required onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Style of Wrapping <span className="required">*</span></label>
                            <div className="radio-group">
                                <label className="radio-label" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input type="radio" name="wrappingStyle" value="Flat Bouquet" required onChange={handleInputChange} />
                                    <span>Flat Bouquet</span>
                                    <img src="/wrapping-flat.jpg" alt="Flat Bouquet" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginLeft: '10px' }} />
                                </label>
                                <label className="radio-label" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                                    <input type="radio" name="wrappingStyle" value="Classic" onChange={handleInputChange} />
                                    <span>Classic</span>
                                    <img src="/wrapping-classic.png" alt="Classic Bouquet" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginLeft: '10px' }} />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Logistics */}
                    <div className="row">
                        <div className="form-group">
                            <label className="form-label">Delivery or Pickup <span className="required">*</span></label>
                            <div className="radio-group" style={{ flexDirection: 'row', gap: '2rem' }}>
                                <label className="radio-label">
                                    <input type="radio" name="deliveryType" value="Delivery" required onChange={handleInputChange} /> Delivery
                                </label>
                                <label className="radio-label">
                                    <input type="radio" name="deliveryType" value="Pickup" onChange={handleInputChange} /> Pickup
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Preferred Date for Delivery/Pickup <span className="required">*</span></label>
                            <input type="date" name="date" className="form-input" required onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* Payment */}
                    <div className="form-group">
                        <label className="form-label">Payment <span className="required">*</span></label>
                        <div className="radio-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            {['Cash (pickup/delivery)', 'Apple Cash', 'CashApp', 'Zelle'].map(pay => (
                                <label key={pay} className="radio-label">
                                    <input type="radio" name="paymentMethod" value={pay} required onChange={handleInputChange} /> {pay}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="btn-submit">Submit Order</button>
                    <p className="text-center" style={{ fontSize: '0.8rem', marginTop: '1rem', color: '#888' }}>
                        Thank you! 🌸
                    </p>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
