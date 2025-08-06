import React, { useState } from 'react';

const images = [
    'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg',
    'https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=',
    'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
    'https://img.freepik.com/free-photo/animal-lizard-nature-multi-colored-close-up-generative-ai_188544-9072.jpg?semt=ais_hybrid&w=740',
    'https://www.bigfootdigital.co.uk/wp-content/uploads/2020/07/image-optimisation-scaled.jpg',
    'https://thumbs.dreamstime.com/b/artistic-rendering-eye-made-entirely-metal-gears-symbolizing-mechanical-precision-insight-captivating-steampunk-359718932.jpg'
];

const SectionTwo: React.FC = () => {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((current + 1) % images.length);
    const prevSlide = () => setCurrent((current - 1 + images.length) % images.length);

    return (
        <div className="section-two">
            <div className="image-slider">
                <button className="slider-btn prev" onClick={prevSlide}>&#8592;</button>
                <img src={images[current]} alt={`slide-${current + 1}`} className="slider-img" />
                <button className="slider-btn next" onClick={nextSlide}>&#8594;</button>
            </div>
       
        </div>
    );
};

export default SectionTwo;