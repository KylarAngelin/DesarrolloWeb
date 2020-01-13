module.exports = {
  entry: './src/app/index.js',
  output: {
    path: __dirname + '/src/public',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    }
  },
  module: {
    rules: [
      {

        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/preset-env'],
          }
        }

      }
    ]
  }
}
