const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ip = require('ip')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv === 'production'

const sourcePath = path.join(__dirname, '/src')
const distPath = path.join(__dirname, '/dist')

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        minChunks: Infinity
    }),
  new HtmlWebpackPlugin({
        // https://github.com/ampedandwired/html-webpack-plugin#configuration
        // Required
        inject: false,
        template: require('html-webpack-template'),
        scripts: [
            {
                src: '/vendor.js',
                type: 'text/javascript'
            },
            {
                src: '/manifest.js',
                type: 'text/javascript'
            },
            {
                src: '/client.js',
                type: 'text/javascript'
            }
        ],
        meta: [
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
          }
        ],
        mobile: true,
        title: 'Demo',
        appMountId: 'root',
        window: {
            env: {
                ip: ip.address()
            }
        }
    }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
  }),
  new webpack.NamedModulesPlugin()
]

if (isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false
      },
    })
  );
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}


module.exports = {
  devtool: isProd ? 'source-map' : 'eval',
  context: sourcePath,
  entry: {
      client: ['./client/index.js'],
      vendor: ['react','react-dom','react-router','react-redux','redux']
  },
  output: {
      path: distPath,
      publicPath: '/',
      chunkFilename: '[name].js',
      filename: '[name].js'
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
              loader: 'babel-loader',
              query: {
                cacheDirectory: true
              }
            }
          ],
      },
      {
          test: /\.(gif|png|jpg|jpeg\ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: ['file-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
        'node_modules',
        sourcePath
    ]
  },
  plugins,
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 80,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
    host: '0.0.0.0',
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }
}
