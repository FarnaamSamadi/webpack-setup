const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",

  entry: {
    main: resolve(__dirname, "src/main.js"),
  },

  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name]-[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },

  devtool: "source-map",

  devServer: {
    static: {
      directory: resolve(__dirname, "dist"),
    },
    port: 3001,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@images": resolve(__dirname, "src/assets/images"),
    },
  },

  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          miniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "My app",
      filename: "index.html",
      template: "public/index.html",
    }),
    new miniCssExtractPlugin({}),
  ],
};
