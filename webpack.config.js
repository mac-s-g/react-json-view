const path = require('path');
const webpack = require('webpack');
const wds_port = 2000;

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    style: path.join(__dirname, 'src/style'),
    dist_index: path.join(__dirname, 'dist'),
    dist_assets: path.join(__dirname, 'dist/assets')
};

const config = {
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    'webpack-dev-server/client?http://localhost:' + wds_port,
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    // the entry point of our app
    PATHS.js + '/entry.js',
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  devServer: {
    host: '0.0.0.0',
    port: wds_port,
    hot: true,
    inline: true,
    historyApiFallback: true,
    contentBase: PATHS.dist_index,
    publicPath: '/assets/'
  },
  output: {
      path: PATHS.dist_assets,
      filename: 'dist.js',
      publicPath: '/assets/'
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: [".js", ".json", ".css", ".scss"]
  },
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'babel-preset-latest',
                'babel-preset-react',
                'babel-preset-stage-0'
              ].map(require.resolve),
              plugins: [
                'transform-class-properties',
                'transform-decorators-legacy',
                'react-html-attrs',
                'transform-function-bind'
              ]
            }
          }
        ],
        include: PATHS.js
      },
      {
        test: /\.s?css(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },
      { 
        test: /\.swf$/, 
        loader: "file-loader" 
      },
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&minetype=application/font-woff"
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      }
    ]
  }
};

module.exports = config;
