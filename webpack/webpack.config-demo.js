const path = require('path');
const webpack = require('webpack');

const PATHS = {
    src: '/react/src',
    js: '/react/src/js',
    style: '/react/src/style',
    build: '/react/demo/dist',
    demo: '/react/demo'
};

const config = {
  entry: [PATHS.demo + '/src/js/entry.js'],
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    path: PATHS.demo + '/dist',
    filename: 'main.js',
    library: 'reactJsonView',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [PATHS.js, PATHS.demo]
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  }
};

module.exports = config;
