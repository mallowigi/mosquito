var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  debug:true,
  cache:true,
  displayErrorDetails: true,
  stats: {colors: true, reasons:true},

  entry: [
    path.normalize('es6-shim/es6-shim.min'),
    'reflect-metadata',
    'web-animations.min',
    path.normalize('zone.js/dist/zone-microtask'),
    path.resolve('app/app')
  ],
  output: {
    path: path.resolve('www/build/js'),
    filename: 'app.bundle.js',
    pathinfo: false // show module paths in the bundle, handy for debugging
  },
  module: {
    loaders: [
      {test: /\.html$/, loader: 'html'},
      {test: /\.jade$/, loader: 'template-html'},
      {test: /\.json$/, loader: 'json'},
      {test: /\.css$/, loader: 'raw!autoprefixer?browsers=last 2 versions'},
      {test: /\.scss$/, loader: 'raw!sass!autoprefixer?browsers=last 2 versions'},
      {test: /\.png$/, loader: "url?limit=1000000000&mimetype=images/png"},
      {
        test: /\.ts$/,
        loader: 'awesome-typescript',
        query: {
          'doTypeCheck': false
        },
        include: path.resolve('app'),
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        include: path.resolve('node_modules/angular2'),
        loader: 'strip-sourcemap'
      }
    ],
    noParse: [
      /es6-shim/,
      /reflect-metadata/,
      /web-animations/,
      /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
    ]
  },
  resolve: {
    alias: {
      'web-animations.min': path.normalize('ionic-framework/js/web-animations.min')
    },
    extensions: ["", ".js", ".ts"]
  }
};
