const path = require("path");

module.exports = {
  entry: "./src/index.ts",

  mode: "production",

  output: {
    path: path.resolve("./dist"),
    filename: "index.js",
    crossOriginLoading: "anonymous",
    pathinfo: true,
    library: "lib",
    libraryTarget: "umd",
    umdNamedDefine: true,
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
};
