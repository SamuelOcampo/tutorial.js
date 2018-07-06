const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'tutorial.js.bundle.js'
    },

    devtool: 'eval-cheap-module-source-map',

    context: path.resolve(__dirname),

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },  
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        'es2015',
                        'stage-2'
                    ]
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader' // compiles Sass to CSS
                ]
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, 'example'),
        compress: true,
        port: 3000,
    },

    plugins: [
    ],
};