const path = require('path');

module.exports = {
    // mode: 'development',
    mode: 'production',
    entry: './scripts/client/main.js',
    output: {
        path: path.resolve(__dirname,'Server', 'public', 'dist'),
        filename: 'main.js',
    },
    
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        modules: ['node_modules']
    }
};