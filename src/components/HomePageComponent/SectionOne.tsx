import React from 'react';
import { useLike } from '../../context/LikeContext';

const SectionOne: React.FC = () => {
    const { likes, incrementLikes } = useLike();

    return (
        <div className="section-one">
            <h2>Discover Wellness with Us</h2>
            <p>
                Experience the difference with our premium, lab-tested cannabis products and expert guidance.
                Your health and satisfaction are our top priorities. Join our community and start your journey to better living today!
            </p>
            <div style={{ marginTop: '16px' }}>
                <button onClick={incrementLikes}>
                    👍 Like ({likes})
                </button>
            </div>
            <div style={{ marginTop: '32px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
                <a
                    href="/ssr-example"
                    style={{
                        display: 'inline-block',
                        background: '#4caf50',
                        color: '#fff',
                        padding: '12px 28px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        textDecoration: 'none',
                        boxShadow: '0 2px 8px rgba(76,175,80,0.08)',
                        transition: 'background 0.2s, transform 0.2s'
                    }}
                    onMouseOver={e => (e.currentTarget.style.background = '#388e3c')}
                    onMouseOut={e => (e.currentTarget.style.background = '#4caf50')}
                >
                    See Server Side Rendering Example
                </a>
            </div>
        </div>
    );
};

export default SectionOne;