module.exports = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
        OTHER_SERVICE_URL: process.env.OTHER_SERVICE_URL,
    },
    images: {
        domains: ['your-image-domain.com'],
    },
};