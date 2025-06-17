const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// Determine if it's development or production mode
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/scripts/main.js',
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'public/dist'),
      assetModuleFilename: 'assets/[name][ext][query]', // Define output path for assets
      publicPath: '' // Set to empty string for relative paths
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
      new HtmlWebpackPlugin({
        template: './src/lebenslauf.html', // Path to your source lebenslauf.html
        filename: 'lebenslauf.html'       // Output filename in the dist directory
      }),
      new HtmlWebpackPlugin({
        template: './src/impressum.html', // Path to your source impressum.html
        filename: 'impressum.html'       // Output filename in the dist directory
      }),
      new HtmlWebpackPlugin({
        template: './src/datenschutz.html', // Path to your source datenschutz.html
        filename: 'datenschutz.html'       // Output filename in the dist directory
      }),
      new HtmlWebpackPlugin({
        template: './src/agb.html', // Path to your source agb.html
        filename: 'agb.html'       // Output filename in the dist directory
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
    devServer: {
      static: [
        {
          directory: path.join(__dirname, 'public')
        },
        {
          directory: path.join(__dirname, 'src')
        }
      ],
      host: '0.0.0.0',
      allowedHosts: 'all',
      port: 3000,
      historyApiFallback: true
    },
    devtool: isDevelopment ? 'eval-source-map' : 'source-map', // Add source maps
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: 'single',
      moduleIds: 'deterministic'
    }
  };

  if (isProduction) {
    config.optimization.minimize = true;
    config.optimization.minimizer = [new TerserPlugin()];
    if (env && env.analyze) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
  }

  return config;
}; 