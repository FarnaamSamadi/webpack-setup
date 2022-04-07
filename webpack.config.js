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
    assetModuleFilename: "images/[hash][ext][query]",
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
          {
            loader: miniCssExtractPlugin.loader,
            options: { publicPatch: "" },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(svg|png|jpg|jpeg|gif)$/i, // svg treated as normal img not inline
        type: "asset", // default size is 8kb
        parser: {
          dataUrlCondition: 30 * 1024, // make size between resource and inline 30kb
        },
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
