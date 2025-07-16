#!/bin/bash

# Script to deploy website to server

echo "Starting deployment - Part 1: HTML, CSS, JS files..."

# Run interactive SFTP session for HTML, CSS, JS
sftp -P 22 su122510@5017709652.ssh.w2.strato.hosting << 'SFTPCOMMANDS_PART1'
cd stackwerkhaus
lcd dist

# Create directory structure first
mkdir css
mkdir js
mkdir assets

# Upload all HTML files
put index.html
put datenschutz.html
put impressum.html
put lebenslauf.html
put agb.html

# Upload sitemap, robots, and llms
put sitemap.xml
put robots.txt
put llms.txt

# Upload all CSS files
cd css
lcd css
put styles.css
lcd ..
cd ..

# Upload all JS files
cd js
lcd js
put main.js
lcd ..
cd ..

exit
SFTPCOMMANDS_PART1

echo "Part 1 completed."
echo "Starting deployment - Part 2: Asset files..."

# Run interactive SFTP session for assets
sftp -P 22 su122510@5017709652.ssh.w2.strato.hosting << 'SFTPCOMMANDS_PART2'
cd stackwerkhaus
cd assets
mkdir fonts
mkdir images
mkdir projects
mkdir testi
mkdir video

# Upload fonts
cd fonts
lcd dist/assets/fonts
put Switzer-Variable.ttf
put Switzer-Variable.woff2
lcd ../../..
cd ..

# Upload images
cd images
lcd dist/assets/images
put logo1.svg
put logo2.svg
put hero1.webp
lcd ../../..
cd ..

# Upload projects
cd projects
lcd dist/assets/projects
put bloom1.webp
put recruitr.webp
put recruitr3.webp
put uncloud1.webp
put uncloud_app.webp
lcd ../../..
cd ..

# Upload testimonials
cd testi
lcd dist/assets/testi
put Viki.webp
lcd ../../..
cd ..

# Upload videos
cd video
lcd dist/assets/video
put bloom_video.webm
put logo_bg1.mp4
put logo_bg1.webm
lcd ../../..
cd ..

# Upload favicon
lcd dist/assets
put favicon.ico
exit
SFTPCOMMANDS_PART2

echo "Deployment complete! All files uploaded to stackwerkhaus directory."
