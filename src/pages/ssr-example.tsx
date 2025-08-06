import React from 'react';

type SSRExampleProps = {
    randomNumber: number;
};

const SSRExample: React.FC<SSRExampleProps> = ({ randomNumber }) => {
    return (
        <div style={{ maxWidth: 500, margin: '60px auto', padding: 32, background: '#fff', borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <h1>Server Side Rendering Example</h1>
            <p>This random number was generated on the server:</p>
            <div style={{ fontSize: '2rem', color: '#388e3c', margin: '24px 0' }}>{randomNumber}</div>
            <p>Refresh the page to get a new number.</p>
        </div>
    );
};

export const getServerSideProps = async () => {
    // This code runs on the server at request time
    const randomNumber = Math.floor(Math.random() * 1000);

    return {
        props: {
            randomNumber,
        },
    };
};

export default SSRExample;