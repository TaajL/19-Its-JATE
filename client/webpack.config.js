const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'J.A.T.E'
      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'src/sw.js',

      }),
      new WebpackPwaManifest({
        start_url: '/',
        name: 'jate',
        short_name: 'jate',
        description: 'a text editor PWA',
        theme_color: '#225ca3',
        background_color: '#ffffff',
        orientation: 'portrait',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512]
          },
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: "defaults" }]
              ]
            }
          }
        },
      ],
    },
  };
};
