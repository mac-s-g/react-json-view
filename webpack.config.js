const path = require('path');
const webpack = require('webpack');
const wds_port = 2000;

const PATHS = {
    src: path.join(__dirname, 'src'),
    js: path.join(__dirname, 'src/js'),
    style: path.join(__dirname, 'src/style'),
    build: path.join(__dirname, 'dist'),
    example: path.join(__dirname, 'example')
};

//example environment points at preloaded example
//see: react-json-view/example/example.js
const entrypoint = process.env.NODE_ENV === 'local_example'
  ? PATHS.example + '/example.js' : PATHS.js + '/index.js';

const config = {
  entry: [entrypoint],
  externals: {},
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
                'babel-preset-es2015',
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
        include: [PATHS.js, PATHS.example]
      },
    ]
  }
};

module.exports = config;
