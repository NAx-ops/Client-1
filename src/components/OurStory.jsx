import React from 'react';
import './OurStory.css';
import ourTeamGraphic from '../assets/our-team.png';

const OurStory = () => {
    return (
        <section className="section our-story-section" id="story">
            <div className="story-container">
                <img
                    src={ourTeamGraphic}
                    alt="Our Team - Ylana James, CEO & Founder"
                    className="story-graphic"
                />
            </div>
        </section>
    );
};

export default OurStory;
