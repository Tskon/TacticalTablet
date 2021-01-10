const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = function (env, argv) {
  const watchMode = argv.liveReload || false
  const modeEnv = argv.mode || 'development'
  const isProd = modeEnv === 'production'

  const optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [], // TODO check auto-uglify
  }

  return {
    target: 'web',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 4200,
      watchContentBase: true,
      progress: true,
      hot: true,
      open: false,
      historyApiFallback: true,
      liveReload: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    },
    module: { rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/i,
        use: [
          "style-loader",
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          },
          "sass-loader",
        ],
      },
    ] },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: './src/html/index.html' }),
      new WebpackNotifierPlugin({ alwaysNotify: true, emoji: true }),
    ],
    entry: './src/client.js',
    output: {
      filename: watchMode ? 'assets/[name].[hash].js' : 'assets/[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    performance: { hints: false },
    optimization,
  }
}