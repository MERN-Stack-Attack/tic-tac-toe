const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.js"
  },
  outout: {
    filename: "[name].[hash].js",
    path: path.resolve("./dist")
  },
  modules: {
    rules: [
      {
        test: /\.js$/,
        exclude: ["node_modules"],
        use: [{ loader: "babel-loader"}],
      }
    ]
  }
};
