const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Determine if it's development or production mode
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production', // Set mode dynamically
  entry: './src/scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    assetModuleFilename: 'assets/[name][ext][query]', // Define output path for assets
    publicPath: '/' // Set to root path
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'public/assets')
    }
  },
  plugins: [
    // Only add MiniCssExtractPlugin in production mode
    !isDevelopment && new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your source index.html
      filename: 'index.html'       // Output filename in the dist directory
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public/assets',      // Source: original static assets
          to: 'assets',              // Destination: in the output directory (public/dist/assets)
          noErrorOnMissing: true    // Prevents errors if public/assets is empty or missing
        }
      ]
    })
  ].filter(Boolean), // Filter out falsy values (like false when isDevelopment is true)
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          // Use style-loader in development, MiniCssExtractPlugin.loader in production
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',   // Translates CSS into CommonJS
          'sass-loader'   // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Add rule for font files
        type: 'asset/resource', // Use asset/resource type
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Add rule for image files
        type: 'asset/resource',
      },
    ],
  },
  devServer: { // Add devServer configuration
    static: './public/dist', // Serve files from the public/dist directory
    hot: true, // Enable hot module replacement
    // Ensure watchFiles is set correctly if needed
    watchFiles: ['src/**/*.html', 'src/**/*.js', 'src/**/*.scss', 'public/assets/**/*'],
    open: true // Automatically open the browser to the dev server address
  },
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', // Add source maps
}; 