import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('lushCart');
        if (savedCart) {
            try {
                setCartItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Failed to parse cart from local storage', error);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('lushCart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems(prev => {
            // Check if item already exists with same ID and options (if applicable)
            // For simplicity, we'll just check ID for standard products.
            // For custom products, we might give them unique IDs upon creation.
            const existingItem = prev.find(i => i.id === item.id);

            // If it's a simple product and already exists, maybe increment quantity?
            // For now, let's treat every add as a distinct line item if it has unique custom options,
            // or increment quantity if it's a standard product.
            if (existingItem && !item.isCustom) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: (i.quantity || 1) + 1 }
                        : i
                );
            }

            // Ensure item has a unique ID for the cart if it doesn't already (useful for custom items)
            const cartItemId = item.cartItemId || Date.now().toString();
            return [...prev, { ...item, cartItemId, quantity: item.quantity || 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (cartItemId) => {
        setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
    };

    const updateItem = (cartItemId, updatedItem) => {
        setCartItems(prev => prev.map(item =>
            item.cartItemId === cartItemId ? { ...item, ...updatedItem } : item
        ));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const cartTotal = cartItems.reduce((total, item) => {
        // Price might be a string like "$129.00", need to parse
        const price = typeof item.price === 'string'
            ? parseFloat(item.price.replace('$', ''))
            : item.price;
        return total + (price * (item.quantity || 1));
    }, 0);

    const value = {
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateItem,
        clearCart,
        toggleCart,
        setIsCartOpen,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
