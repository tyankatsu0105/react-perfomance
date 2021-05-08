import * as path from "path";
import * as Webpack from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import * as WebpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const root = path.resolve(__dirname);

delete process.env.TS_NODE_PROJECT;
const config: Webpack.Configuration & WebpackDevServer.Configuration = {
  mode: "production",
  entry: path.resolve(__dirname, "src/main.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(root, "./tsconfig-for-webpack-config.json"),
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: root + "/src/index.html",
      filename: "index.html",
    }),
  ],
};

export default config;
