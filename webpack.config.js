const path = require('path');
const mode = process.env.NODE_ENV === 'production'? 'production' : 'development'

module.exports = {

  entry: './src/index.js',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'bundle.js'
  },
  module : {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: ["babel-loader", "eslint-loader"]
      }
    ]
  },

  mode: mode,
  devtool: "source-map",
  devServer: {
      contentBase: './dist',

  }
};
