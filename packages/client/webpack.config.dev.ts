import * as path from "path";
import * as Webpack from "webpack";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import * as WebpackDevServer from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

const PACKAGE_ROOT = path.resolve(__dirname);

delete process.env.TS_NODE_PROJECT;

const config: Webpack.Configuration & WebpackDevServer.Configuration = {
  mode: "development",
  entry: path.resolve(PACKAGE_ROOT, "src/main.tsx"),
  output: {
    path: path.resolve(PACKAGE_ROOT, "dist"),
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
        configFile: path.resolve(
          PACKAGE_ROOT,
          "./tsconfig-for-webpack-config.json"
        ),
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PACKAGE_ROOT + "/src/index.html",
      filename: "index.html",
    }),
  ],
};

export default config;
