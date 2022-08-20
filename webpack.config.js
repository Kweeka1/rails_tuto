const path    = require("path")
const webpack = require("webpack")
const glob = require('glob');

//Generate object for webpack entry
//rename './app/modules/module1/script.js' -> 'module1/script'
const entryObject = glob.sync("./app/javascript/*.js").reduce((entries, entry) => {
  const entryName = path.parse(entry).name
  entries[entryName] = entry
  return entries
}, {});
console.log(entryObject)

module.exports = {
  mode: "production",
  devtool: "source-map",
  entry: entryObject,
  output: {
    filename: "[name].js",
    sourceMapFilename: "[name].js.map",
    path: path.resolve(__dirname, "app/assets/config"),
  },
  plugins: [
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
}
