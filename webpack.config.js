module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'index_bundle.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    ]
  },
  plugins: [],
  devServer: {
    contentBase: "./public",
    hot: true
  }
}