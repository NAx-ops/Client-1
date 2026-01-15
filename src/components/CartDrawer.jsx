import React from 'react';
import { useCart } from '../context/CartContext';
import './CartDrawer.css';

const CartDrawer = ({ onEditItem, onCheckout }) => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, cartTotal } = useCart();

    if (!isCartOpen) return null;

    return (
        <div className="cart-overlay">
            <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}></div>
            <div className="cart-drawer">
                <div className="cart-header">
                    <h3>Your Cart ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})</h3>
                    <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
                </div>

                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p className="empty-cart-msg">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.cartItemId} className="cart-item">
                                <div className="cart-item-image">
                                    {item.image && <img src={item.image} alt={item.name} />}
                                </div>
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p className="item-price">{item.price}</p>
                                    <p className="item-quantity">Qty: {item.quantity}</p>

                                    {/* Display custom details if any */}
                                    {item.selectedOptions && (
                                        <div className="item-options">
                                            {Object.entries(item.selectedOptions).map(([key, val]) => (
                                                val && <span key={key} className="option-tag">{val}</span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="item-actions">
                                        <button
                                            className="action-btn edit-btn"
                                            onClick={() => {
                                                setIsCartOpen(false); // Close drawer to show builder/modal
                                                onEditItem(item);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="action-btn remove-btn"
                                            onClick={() => removeFromCart(item.cartItemId)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-footer">
                    <div className="subtotal">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <button
                        className="btn-checkout"
                        disabled={cartItems.length === 0}
                        onClick={() => {
                            setIsCartOpen(false);
                            onCheckout();
                        }}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
