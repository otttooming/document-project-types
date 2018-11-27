const path = require("path");

module.exports = {
  entry: "./src/index.tsx",

  output: {
    path: path.resolve("./dist"),
    filename: "index.js",
    crossOriginLoading: "anonymous",
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [path.join(__dirname, "src")],
        exclude: path.resolve(__dirname, "node_modules"),
        use: [
          {
            loader: require.resolve("babel-loader"),
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  devServer: {
    contentBase: "src/",
  },
};
