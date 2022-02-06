const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, './src/js/**/*.js')],
  {
    ignore: path.resolve(__dirname, './src/js/**/_*.js'),
  }
)();

// 追加
const htmlGlobPlugins = (entries, srcPath) => {
  return Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        inject: 'body',
        filename: `${key}.html`,
        template: `${srcPath}/${key}.html`,
        favicon: `${srcPath}/favicon.ico`,
        chunks: [key],
      })
  );
};

module.exports = (params) => ({
  entry: entries,

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `./js/${params.outputFile}.js`,
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },

  module: {
    rules: [
      // jsファイルの読み込みとコンパイル
      {
        test: /\.js$/i,
        exclude: /(node_modules)/,
        use: [
          {
            // Babel を利用する
            loader: 'babel-loader',
          },
        ],
      },
      // Sassファイルの読み込みとコンパイル
      {
        test: /\.s?css$/i, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          params.styleLoader,
          // CSSをバンドルするための機能
          {
            loader: 'css-loader',
            options: {
              // オプションでCSS内のurl()メソッドの取り込みを禁止する
              url: false,
              // ソースマップの利用有無
              sourceMap: params.enabledSourceMap,

              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2,
            },
          },
          // PostCSSのための設定
          {
            loader: 'postcss-loader',
            options: {
              // PostCSS側でもソースマップを有効にする
              sourceMap: params.enabledSourceMap,
              postcssOptions: {
                plugins: [
                  // Autoprefixerを有効化
                  // ベンダープレフィックスを自動付与する
                  ['autoprefixer', { grid: true }],
                ],
              },
            },
          },
          // Sassをバンドルするための機能
          {
            loader: 'sass-loader',
            options: {
              // ソースマップの利用有無
              sourceMap: params.enabledSourceMap,
            },
          },
        ],
      },
      // css内の画像
      {
        // 対象となるファイルの拡張子
        test: /\.(gif|png|jpg|svg)$/,
        // 画像を埋め込まず任意のフォルダに保存する
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      // 除外するファイルやディレクトリを指定
      // verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*', '!assets/**', '!.git/**'],
    }),

    ...htmlGlobPlugins(entries, './src'), //  追加

    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery-confirm/dist/jquery-confirm.min.js',
    }),
  ],

  devServer: {
    static: 'dist',
    open: true,
  },

  // ES5(IE11等)向けの指定（webpack 5以上で必要）
  target: ['web', 'es5'],
});
