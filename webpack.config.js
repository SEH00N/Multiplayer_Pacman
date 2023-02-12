const path = require('path');

module.exports = {

    entry: './scripts/client/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules']
    }
};