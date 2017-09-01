const path = require('path');
const webpack = require('webpack');

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    style: path.join(__dirname, 'src/style'),
    build: path.join(__dirname, 'dist'),
    devServer: path.join(__dirname, 'dev-server')
};

const config = {
  entry: [PATHS.devServer + '/dev-server.js'],
  externals: {
    'cheerio': 'window',
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
      umd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
      umd: 'react-dom',
    },
  },
  devServer: {
    host: '0.0.0.0',
    port: 2000,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.build
  },
  // output: {
  //   path: PATHS.build,
  //   filename: 'main.js',
  //   library: 'reactJsonView',
  //   libraryTarget: 'umd'
  // },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: [PATHS.js, PATHS.devServer]
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
