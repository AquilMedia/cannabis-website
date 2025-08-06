import React from 'react';

const features = [
    {
        img: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
        caption: 'Organic and natural ingredients'
    },
    {
        img: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
        caption: 'Third-party lab tested'
    },
    {
        img: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
        caption: 'Transparent sourcing'
    }
];

const SectionThree: React.FC = () => {
    return (
        <div className="section-three">
            <h2>Our Commitment to Quality</h2>
            <p>We ensure that all our products meet the highest standards of quality and safety.</p>
            <div className="features-list">
                {features.map((feature, idx) => (
                    <div className="feature-card" key={idx}>
                        <img src={feature.img} alt={feature.caption} className="feature-img" />
                        <div className="feature-caption">{feature.caption}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionThree;