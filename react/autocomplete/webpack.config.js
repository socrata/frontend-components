module.exports = {
  entry: './app.js',
  output: {
    path: './example/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
         test: /\.jsx?$/,
         exclude: /(node_modules|bower_components)/,
         loader: 'babel'
      },{
         test: /\.scss$/,
         loader: 'style!css!autoprefixer-loader!sass'
      }
    ]
  }
}
