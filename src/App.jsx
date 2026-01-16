import React, { useState } from 'react';
import './index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import WhyFaux from './components/WhyFaux';
import SocialProof from './components/SocialProof';
import OurStory from './components/OurStory';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ShopCollection from './components/ShopCollection';

import { CartProvider } from './context/CartContext';
import CartDrawer from './components/CartDrawer';
import CustomPage from './components/CustomPage'; // Using the Standalone Page
import Checkout from './components/Checkout';

function App() {
  const [view, setView] = useState('home'); // 'home' or 'custom'
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleEditItem = (item) => {
    if (item.isCustom) {
      setEditingItem(item);
      setView('custom');
    } else {
      // For standard items, we provide placeholder "random" data so they can be edited
      // This effectively converts them into a custom arrangement flow
      const standardItemAsCustom = {
        ...item,
        cartItemId: item.cartItemId, // Maintain cart ID
        isCustom: true, // Mark as custom for the builder context
        selectedOptions: {
          size: 'Dozen (12)',       // Placeholder
          flowerTypes: ['Roses'],   // Placeholder
          colors: ['Red'],          // Placeholder
          addOns: [],               // Placeholder
          wrapping: ''
        }
      };
      setEditingItem(standardItemAsCustom);
      setView('custom');
    }
  };

  const navigateToCustom = () => {
    setEditingItem(null); // Clear editing state for new item
    setView('custom');
  };

  const navigateToHome = () => {
    setView('home');
    setEditingItem(null);
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <CartProvider>
      <div className="app">
        {view === 'home' && (
          <>
            {/* Pass navigateToHome for Logo/Link clicks, and navigateToCustom for Order button */}
            <Header onNavigateHome={navigateToHome} onNavigateCustom={navigateToCustom} />
            <main>
              <Hero />
              <WhyFaux />

              <div style={{ textAlign: 'center', padding: '2rem', backgroundColor: '#fafafa' }}>
                <h2>Want something unique?</h2>
                <button
                  onClick={navigateToCustom}
                  style={{
                    marginTop: '1rem',
                    padding: '1rem 2rem',
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    border: 'none',
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                >
                  Build Your Own Arrangement
                </button>
              </div>

              <ShopCollection />
              {/* RealTouchDifference removed as requested */}
              <SocialProof />
              <OurStory />
            </main>
            <Footer />
          </>
        )}

        {view === 'custom' && (
          <CustomPage
            onNavigateHome={navigateToHome}
            initialData={editingItem}
          />
        )}

        {/* Cart Drawer is always available (unless we wanted to hide it on custom page, but usually fine) */}
        <CartDrawer onEditItem={handleEditItem} onCheckout={handleCheckout} />

        <Checkout
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;
