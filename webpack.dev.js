const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const outputFile = '[name]';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const params = {
  outputFile: outputFile,
  enabledSourceMap: true,
  styleLoader: {
    loader: MiniCssExtractPlugin.loader,
  },
};

module.exports = merge(common(params), {
  mode: 'development',
  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${outputFile}.css`,
    }),
  ],
});
