const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// Configuration for webpack
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',         // Entry point for the main bundle
      install: './src/js/install.js'     // Entry point for the install bundle
    },
    output: {
      filename: '[name].bundle.js',       // Output file name for each bundle
      path: path.resolve(__dirname, 'dist'),  // Output directory path
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',         // HTML template file for the main bundle
        title: 'Webpack Plugin',          // Title to be injected into the HTML
      }),
      new InjectManifest({
        swSrc: './src-sw.js',             // Service worker source file
        swDest: 'src-sw.js',              // Output file name for the service worker
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],   // CSS loaders for handling CSS files
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',              // Babel loader for transpiling JavaScript files
            options: {
              presets: ['@babel/preset-env'],     // Babel preset for environment compatibility
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',   // Babel plugin for object spread syntax
                '@babel/transform-runtime'                     // Babel plugin for runtime support
              ],
            },
          },
        },
      ],
    },
  };
};
