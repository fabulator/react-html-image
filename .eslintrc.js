module.exports = {
    extends: [
        '@socifi',
        '@socifi/eslint-config/react',
    ],
    settings: {
        polyfills: [
            'fetch',
            'promises',
        ],
    },
};
