import React from 'react';

const services = [
    "Consultation Services",
    "Product Education",
    "Wellness Programs",
    "Delivery Services",
    "Community Events"
];

const Shop: React.FC = () => {
    return (
        <div  className="services-page">
            <h1>Our Services</h1>
            <p>We offer a variety of cannabis-related services to support your wellness journey.</p>
            <ul className="services-list">
                {services.map((service, idx) => (
                    <li key={idx} className="service-card">
                        {service}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Shop;