import path from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-notifier'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default (env, argv) => {
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
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 4200,
      watchContentBase: true,
      progress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        '~': path.resolve(__dirname, 'src')
      }
    },
    module: { rules: [] },
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