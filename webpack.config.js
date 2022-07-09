const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mode: 'development',
  devServer: {
    port: 5000,
    host: `localhost`,
    proxy: {
        '/get-time-zone': {
           changeOrigin: true,
            target: 'https://api.timezonedb.com/v2.1',
            secure: false,
        }
    },

  },
  entry: { app: ['./public/components/index.tsx'] },
  output: {
    path: path.join(__dirname, 'build/public'),
    filename: `[name].js`,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.fe.json',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                strictMath: true,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'time zone calculator',
      template: 'public/index.html',
    }),
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
    }),
  ],
};
