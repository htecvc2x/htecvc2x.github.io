const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env = {}) => {
  const {
    mode = 'development'
  } = env;

  const isProd = mode === 'production';

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
      {
        loader: "postcss-loader",
        options: {
          ident: "postcss",
          sourceMap: true,
          plugins: () => [
            require("cssnano")({
              preset: [
                "default",
                {
                  discardComments: {
                    removeAll: true
                  }
                }
              ]
            })
          ]
        }
      }
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Webpack sandbox',
        dts : Date.now(),
        template: 'src/index.html',
        filename : 'index.html'
      })
    ];

    if (isProd) {
      plugins.push(new MiniCssExtractPlugin({
        filename: "./css/style-[hash:8]-min.css"
      }));
      plugins.push(
        new CopyWebpackPlugin([{
            from: "./src/fonts",
            to: "./fonts"
          },
          {
            from: "./src/favicon.ico",
            to: "./favicon.ico"
          },
          {
            from: "./src/imges",
            to: "./images/[path][name]-[contenthash:8].[ext]"
          }
        ])
      );
    }

    return plugins;
  };

  return {
    devtool: isProd ? undefined : 'source-map',
    mode: isProd ? 'production' : 'development',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },

    module: {
      rules: [
        {
            test: /\.html$/,
            use: {
                loader: "html-loader",
                options: {
                    minimize: true,
                }
            }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.(css)$/,
          use: getStyleLoaders()
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [...getStyleLoaders(), 'sass-loader']
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: ['file-loader'],
        },
      ]
    },

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      open: true
    },

    plugins: getPlugins(),

  };
};
