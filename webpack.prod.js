const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const outputFile = '[name].[chunkhash]';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Obfuscator = require('webpack-obfuscator');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const params = {
  outputFile: outputFile,
  enabledSourceMap: false,
  styleLoader: {
    loader: MiniCssExtractPlugin.loader,
  },
};

module.exports = merge(common(params), {
  mode: 'production',

  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/${outputFile}.css`,
    }),

    // 暗号化
    // new Obfuscator({ rotateUnicodeArray: true }, []),

    // 分析
    // new BundleAnalyzerPlugin(),
  ],
});
