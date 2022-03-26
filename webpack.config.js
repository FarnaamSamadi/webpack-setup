const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  entry: {
    main: resolve(__dirname, "src/main.js"),
  },

  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name]-[contenthash].js",
    clean: true,
  },

  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "My app",
      filename: "index.html",
      template: "public/index.html",
    }),
  ],

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
};
