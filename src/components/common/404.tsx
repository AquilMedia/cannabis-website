import React from 'react';

const Custom404: React.FC = () => {
    return (
        <div className="text-center">
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="btn btn-primary">Go to Home</a>
        </div>
    );
};

export default Custom404;