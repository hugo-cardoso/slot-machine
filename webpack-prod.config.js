const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  entry: ["./src/index.js"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: { presets: ["env"], plugins: ["transform-class-properties"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|pdf)/,
        exclude: /(node_modules)/,
        loader: "file-loader",
        options: {
          name: "/images/[name].[ext]"
        }
      },
      {
        test: /\.(mp3|wav)/,
        exclude: /(node_modules)/,
        loader: "file-loader",
        options: {
          name: "/audio/[name].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader","sass-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js"
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "React Starter",
      template: path.resolve(__dirname, "public/index.html")
    })
  ]
};