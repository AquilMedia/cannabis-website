import React, { useState } from 'react';
import PrescriptionWizardModal from '../Modals/StepData';

const HeroSection: React.FC = () => {
        const [showWizard, setShowWizard] = useState(false);
    return (
        <div className="hero-section">
             <button className="btn btn-success" style={{ margin: 24 }} onClick={() => setShowWizard(true)}>
                Start Cannabis Prescription Wizard
            </button>
            {showWizard && <PrescriptionWizardModal onClose={() => setShowWizard(false)} />}
            <h1>Welcome to Our Cannabis Services</h1>
            <p>Your journey to wellness starts here.</p>
            <button className="cta-button">Learn More</button>
        </div>
    );
};

export default HeroSection;