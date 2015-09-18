module.exports = {
  entry: './src/react.socrata.autocomplete.js',
  output: {
    path: './build/',
    filename: 'react.socrata.bundle.autocomplete.js'
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
