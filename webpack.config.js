const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Determine if it's development or production mode
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment ? 'development' : 'production', // Set mode dynamically
  entry: './src/scripts/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    assetModuleFilename: 'assets/[name][ext][query]' // Define output path for assets
  },
  plugins: [
    // Only add MiniCssExtractPlugin in production mode
    !isDevelopment && new MiniCssExtractPlugin({
      filename: 'main.css',
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
    static: './public', // Serve files from the public directory
    hot: true, // Enable hot module replacement
    // Ensure watchFiles is set correctly if needed, though static often handles it
    watchFiles: ['public/**/*.html', 'src/**/*.js', 'src/**/*.scss'],
  },
  devtool: isDevelopment ? 'eval-source-map' : 'source-map', // Add source maps
}; 