// webpack v4
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {

  entry: { 
    main: './src/styles/style.scss' 
    // main: './src/index.js' 
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    // filename: 'main.js'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[id].css"
    })
  ],

  module: {


    rules: [

      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader"
      //   }
      // },

      // {
      //   test: /\.(gif|png|jpe?g|svg|tff|eot|woff)$/i,
      //   loader: "file-loader"
      // },
      
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      // {
      //   test: /\.(tff|eot|woff)$/i,
      //   loader: "file-loader"
      // },
      {
        test: /\.scss$/,
        use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },

    ]
  }

};