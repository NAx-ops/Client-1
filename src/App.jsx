import React from 'react';
import './index.css';

import Header from './components/Header';
import Hero from './components/Hero';
import WhyFaux from './components/WhyFaux';
import FeaturedCollections from './components/FeaturedCollections';
import RealTouchDifference from './components/RealTouchDifference';
import SocialProof from './components/SocialProof';
import OurStory from './components/OurStory';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <WhyFaux />
        <FeaturedCollections />
        <RealTouchDifference />
        <SocialProof />
        <OurStory />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
