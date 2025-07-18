import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFilesPlugin } from './vite-plugins/copy-files';

export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  // Use / as base for both production and development since files are served from root
  const base = '/';
  
  return {
    root: 'src',
    base,
    publicDir: '../public',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'src/index.html'),
          lebenslauf: resolve(__dirname, 'src/lebenslauf.html'),
          impressum: resolve(__dirname, 'src/impressum.html'),
          datenschutz: resolve(__dirname, 'src/datenschutz.html'),
          agb: resolve(__dirname, 'src/agb.html')
        },
        output: {
          // Use fixed filenames instead of content hashes
          entryFileNames: 'js/main.js', // Changed from a function to a string
          chunkFileNames: 'js/[name].js',
          assetFileNames: (assetInfo) => {
            if (/\.css$/.test(assetInfo.name)) {
              return 'css/styles.css';
            }
            
            if (/\.(woff|woff2|eot|ttf|otf)$/i.test(assetInfo.name)) {
              return 'assets/fonts/[name][extname]';
            }
            
            if (/\.(png|svg|jpg|jpeg|gif|webp)$/i.test(assetInfo.name)) {
              return 'assets/images/[name][extname]';
            }
            
            if (/\.(mp4|webm)$/i.test(assetInfo.name)) {
              return 'assets/video/[name][extname]';
            }
            
            return 'assets/[name][extname]';
          },
          // Make sure we get a single CSS file
          manualChunks: undefined
        }
      }
    },
    plugins: [
      // Copy additional files
      copyFilesPlugin(),
      // Plugin to ensure consistent file naming
      {
        name: 'consistent-file-naming',
        enforce: 'post',
        generateBundle(options, bundle) {
          // Find the entry chunk
          const entryChunk = Object.values(bundle).find(
            chunk => chunk.isEntry && chunk.type === 'chunk' && chunk.name === 'main'
          );
          
          if (entryChunk) {
            // Make sure the filename is exactly what we want
            entryChunk.fileName = 'js/main.js';
            
            // Update references in HTML files
            Object.values(bundle).forEach(chunk => {
              if (chunk.type === 'asset' && chunk.fileName.endsWith('.html')) {
                // Replace any references to main*.js with main.js
                chunk.source = chunk.source.toString().replace(
                  /src="\/js\/main[^"]*\.js"/g, 
                  'src="/js/main.js"'
                );
              }
            });
          }
        }
      }
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        'assets': resolve(__dirname, 'public/assets')
      }
    },
    css: {
      devSourcemap: true
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true
    }
  };
}); 