# Tarik Marshall Portfolio Website

A modern, animated portfolio for Tarik Marshall, built with a focus on design, performance, and smooth user experience.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Folder Structure](#folder-structure)
5. [Color Scheme & Typography](#color-scheme--typography)
6. [Layout & Content](#layout--content)
7. [GSAP Animations](#gsap-animations)
8. [Responsive Design](#responsive-design)
9. [Accessibility](#accessibility)
10. [Build & Development](#build--development)
11. [Deployment](#deployment)
12. [Assets & Fonts](#assets--fonts)

---

## Project Overview
- **Purpose:** Personal portfolio to showcase projects, skills, and capabilities.
- **Design:** Minimalist, light theme, large typography, smooth GSAP animations.

---

## Features
- Animated hero, about, and project sections using GSAP and ScrollTrigger
- Responsive, mobile-first layout
- Modern project card hover effects (blur, overlay)
- Modular SCSS for easy theming and maintenance
- Custom smooth scrolling with Lenis
- Accessibility best practices

---

## Tech Stack
- **HTML5**
- **CSS3 / SCSS** (modular, component-based)
- **JavaScript (ES6+)**
- **GSAP** (GreenSock Animation Platform)
- **ScrollTrigger** (GSAP plugin)
- **Lenis** (smooth scrolling)
- **Webpack** (bundling, dev server)
- **Babel** (ES6+ transpilation)
- **Node.js & NPM** (package management)

---

## Folder Structure
```
project-root/
├── public/
│   ├── assets/
│   │   ├── images/      # Project and hero images
│   │   │   └── favicon.ico
│   │   └── dist/            # Webpack build output
├── src/
│   ├── index.html       # Main HTML file
│   ├── scripts/
│   │   ├── main.js      # Entry point
│   │   └── animations/  # GSAP animation modules
│   ├── styles/
│   │   ├── main.scss    # Main SCSS entry
│   │   └── components/  # Modular SCSS (header, hero, about, projects, etc.)
├── .babelrc
├── webpack.config.js
├── package.json
└── README.md
```

---

## Color Scheme & Typography
### Color Scheme
| Element        | Color      |
| -------------- | ---------- |
| Background     | #FFFFFF    |
| Primary Text   | #141414    |
| Accent Color   | #5608ff    |
| Link Hover     | #000000    |

### Typography
- **Font:** 'Switzer', Helvetica, Arial, sans-serif (all headings and body)
- **Font files:** Located in `public/assets/fonts/`

---

## Layout & Content
- **Header:** Logo (SVG), navigation links, CTA
- **Hero:** Large animated title, subtitle, scroll indicator
- **About:** Bio, portrait, contact links
- **Projects:**
  - Two project cards (image, title, subtitle, hover blur effect)
  - Easily extendable for more projects
- **Capabilities:** Grid of skills, GSAP draggable
- **Footer:** Contact prompt, social links, signature

---

## GSAP Animations
- **Page Load:** Fade-in, staggered hero text
- **Scroll Animations:**
  - About: Image/text slide in from opposite sides
  - Projects: Cards fade/scale in
  - Capabilities: Draggable grid
- **Project Card Hover:** CSS blur/fade effect (optionally extendable with GSAP)
- **Animation modules:** Located in `src/scripts/animations/`

---

## Responsive Design
- Uses CSS Grid and Flexbox
- Media queries for tablet/mobile breakpoints
- Touch support for interactive elements

---

## Accessibility
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation (focus styles on cards/links)
- Sufficient color contrast

---

## Build & Development
### Scripts
- `npm install` — Install dependencies
- `npm start` — Start dev server with hot reload (Webpack, localhost:8080)
- `npm run build` — Production build (output to `public/dist/`)

### Webpack
- Entry: `src/scripts/main.js`
- HTML template: `src/index.html`
- SCSS: Compiled and extracted in production
- Assets: Copied from `public/assets/` to `public/dist/assets/`

---

## Deployment
- **Recommended:** Netlify, Vercel, or GitHub Pages
- **To deploy:**
  1. Run `npm run build`
  2. Upload contents of `public/dist/` to your host
- **Performance:**
  - Minified CSS/JS
  - Optimized images
  - Lazy loading recommended for large images

---

## Assets & Fonts
- **Images:** Place in `public/assets/images/`
- **Fonts:** Switzer font family in `public/assets/fonts/`
- **Favicon:** `public/assets/favicon.ico`

---

## Credits & License
- Design and development: Tarik Marshall
- Inspired by [chriskalafatis.com](https://www.chriskalafatis.com/)
- Licensed under ISC

---

## Notes
- For detailed animation and layout logic, see the `src/scripts/animations/` and `src/styles/components/` folders.
- For further customization, edit SCSS variables in `src/styles/main.scss`. 