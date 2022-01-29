const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const outputFile = '[name]';

const params = {
  outputFile: outputFile,
  enabledSourceMap: true,
  styleLoader: {
    loader: 'style-loader',
  },
};

module.exports = merge(common(params), {
  mode: 'development',
  devtool: 'source-map',
});
