import { resolve } from 'path';
import fs from 'fs';

/**
 * Plugin to copy static files during Vite build
 */
export function copyFilesPlugin() {
  return {
    name: 'copy-files-plugin',
    closeBundle: async () => {
      const filesToCopy = [
        { src: 'sitemap.xml', dest: 'dist/sitemap.xml' },
        { src: 'robots.txt', dest: 'dist/robots.txt' },
        { src: 'llms.txt', dest: 'dist/llms.txt' }
      ];
      
      for (const file of filesToCopy) {
        try {
          const srcPath = resolve(process.cwd(), file.src);
          const destPath = resolve(process.cwd(), file.dest);
          
          if (fs.existsSync(srcPath)) {
            // Create directory if it doesn't exist
            const destDir = destPath.substring(0, destPath.lastIndexOf('/'));
            if (!fs.existsSync(destDir)) {
              fs.mkdirSync(destDir, { recursive: true });
            }
            
            fs.copyFileSync(srcPath, destPath);
            console.log(`Copied ${file.src} to ${file.dest}`);
          } else {
            console.warn(`Source file not found: ${file.src}`);
          }
        } catch (error) {
          console.error(`Error copying ${file.src}:`, error);
        }
      }
    }
  };
} 