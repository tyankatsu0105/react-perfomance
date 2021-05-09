import * as path from 'path';
import * as Webpack from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import * as WebpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const PACKAGE_ROOT = path.resolve(__dirname);

const config: Webpack.Configuration & WebpackDevServer.Configuration = {
  mode: 'production',
  entry: path.resolve(PACKAGE_ROOT, 'src/main.tsx'),
  output: {
    path: path.resolve(PACKAGE_ROOT, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PACKAGE_ROOT + '/src/index.html',
      filename: 'index.html',
    }),
  ],
};

export default config;
