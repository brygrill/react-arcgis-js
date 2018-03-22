const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        index: [
            './src/index.ts'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'react-arcgis-js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        }
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' }
        ]
    }
};
