const path = require('path');
const webpack = require('webpack');
const wds_port = 2000;

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    style: path.join(__dirname, 'src/style'),
    build: path.join(__dirname, 'dist'),
    devServer: path.join(__dirname, 'dev-server')
};

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

let includes = [PATHS.js, PATHS.devServer];
let entrypoint = PATHS.devServer + '/dev-server.js';
let devtool = 'eval-source-map';
if (process.env.NODE_ENV === 'production') {
  includes = [PATHS.js];
  entrypoint = PATHS.js + '/index.js';
  devtool = false;
}

const config = {
  entry: [entrypoint],
  externals: {
    'cheerio': 'window',
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  devServer: {
    host: '0.0.0.0',
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.build
  },
  output: {
    path: PATHS.build,
    filename: 'main.js',
    library: 'reactJsonView',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: devtool,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: includes
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
