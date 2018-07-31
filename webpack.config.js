const { getBaseBabelConfig } = require('@socifi/rollup-config/src/helpers');

const babelSettings = getBaseBabelConfig('commonjs', {
    chrome: 52,
});

module.exports = {
    entry: './dev/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /(\.js$)|(\.jsx$)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        ...babelSettings,
                        plugins: babelSettings.plugins.filter(plugin => plugin !== 'external-helpers'),
                    },
                },
            },
            {
                test: /\.css/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                        },
                    },
                ],
            },
        ],
    },
};
