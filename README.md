# Tarik Marshall Portfolio Website

![Status](https://img.shields.io/badge/status-in%20development-orange)
![Version](https://img.shields.io/badge/version-1.2-blue)

A modern, animated portfolio for Tarik Marshall (STACKWERKHAUS), built with a focus on design, performance, smooth user experience, and **Answer Engine Optimization (AEO)** for maximum AI visibility.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [AEO (Answer Engine Optimization)](#aeo-answer-engine-optimization)
5. [Folder Structure](#folder-structure)
6. [Color Scheme & Typography](#color-scheme--typography)
7. [Layout & Content](#layout--content)
8. [GSAP Animations](#gsap-animations)
9. [Responsive Design](#responsive-design)
10. [Accessibility](#accessibility)
11. [Prerequisites](#prerequisites)
12. [Browser Compatibility](#browser-compatibility)
13. [Build & Development](#build--development)
14. [SEO & AEO Setup](#seo--aeo-setup)
15. [Deployment](#deployment)
16. [Assets & Fonts](#assets--fonts)
17. [Performance Optimizations](#performance-optimizations)
18. [Maintenance & Updates](#maintenance--updates)
19. [Credits & License](#credits--license)
20. [Contact & Support](#contact--support)
21. [Notes for Developers](#notes-for-developers)

---

## Project Overview
- **Purpose:** Professional portfolio and business website for STACKWERKHAUS design studio
- **Target Market:** Berlin-based businesses, startups, and SMEs seeking web development services
- **Design:** Minimalist, light theme, large typography, smooth GSAP animations
- **Pricing:** €2,000-€5,000 for professional websites
- **AEO Optimized:** Designed for visibility in AI search engines (ChatGPT, Perplexity, Google AI)

---

## Features

### Core Website Features
- **Animated Hero Section**: Parallax background with Berlin cityscape and letter-by-letter text animations
- **Combined FAQ/Services Section**: Interactive accordion with detailed pricing and service information
- **Project Portfolio**: Custom web components with pixelated hover effects and video reveals
- **Contact Integration**: Formspree form handling + Calendly booking integration
- **Legal Compliance**: GDPR-compliant modals for Impressum and Datenschutz
- **Mobile Navigation**: Smooth mobile menu with GSAP animations

### AEO (Answer Engine Optimization) Features
- **AI-Optimized Content**: Direct answers formatted for AI parsing and citation
- **Enhanced Structured Data**: 8 FAQ schemas + HowTo schemas for website development
- **llms.txt File**: AI-friendly content specifically for language model consumption
- **AI Crawler Support**: Explicit allowance for GPTBot, ChatGPT-User, CCBot, PerplexityBot
- **Answer-First Format**: Bold, quotable answers in first 1-2 sentences
- **Pricing Transparency**: Clear cost breakdowns for AI understanding

### Technical Features
- **Custom Web Components**: Modular project cards with shadow DOM
- **Advanced Animations**: GSAP ScrollTrigger, parallax effects, custom blur plugin
- **Performance Optimized**: Webpack code splitting, lazy loading, font optimization
- **Mobile-First Design**: Responsive breakpoints with touch-friendly interactions
- **Smooth Scrolling**: Lenis integration for buttery-smooth scroll experience

---

## Tech Stack
- **HTML5** with semantic structure and ARIA accessibility
- **CSS3 / SCSS** (modular, component-based architecture, using modern `@use` rules)
- **JavaScript (ES6+)** with modern module system
- **GSAP** (GreenSock Animation Platform) with ScrollTrigger
- **Lenis** (smooth scrolling library)
- **Vite** (fast bundling, dev server, optimization)
- **Node.js & NPM** (package management)

---

## AEO (Answer Engine Optimization)

### What is AEO?
Answer Engine Optimization (AEO) is SEO for AI search engines. It's about becoming the source an AI pulls from when someone asks a question - not just ranking for keywords, but being the answer.

### AEO Implementation
Following [Sam Hogan's AEO strategy](https://www.samhogan.sh/blog/a-new-form-of-seo), this website includes:

#### 1. Enhanced Structured Data
- **8 FAQ schemas** with direct, AI-parseable answers
- **HowTo schema** for website development process
- **LocalBusiness schema** for Berlin presence
- **Organization schema** with complete contact details

#### 2. AI-Optimized Content Format
- **Answer-first approach**: Direct answers in first 1-2 sentences
- **Question headlines** matching real search queries
- **Structured lists** with pricing and timeline breakdowns
- **Bold key information** for easy AI extraction

#### 3. llms.txt File
Located at `/llms.txt` - contains AI-friendly content including:
- Quick answers to common questions
- Detailed service descriptions
- Pricing structure and timelines
- Contact and location information
- Technology stack details

#### 4. AI Crawler Optimization
- **Enhanced robots.txt** with explicit AI bot permissions
- **Crawl delays** to be respectful to AI services
- **Sitemap optimization** with high-priority AEO content

### AEO Testing & Submission
After deployment, submit to:
1. **Google Search Console**: Submit sitemap and request indexing
2. **Bing Webmaster Tools**: Submit sitemap and use IndexNow
3. **llms-txt.site**: Submit for AI index inclusion
4. **Test with Perplexity**: Ask questions about Berlin web development
5. **Monitor with tools**: Profound, Goodie AI, HubSpot AI Search Grader

---

## Folder Structure
```
STACKWERKHAUS2/
├── public/
│   ├── assets/
│   │   ├── images/          # Hero, project, and profile images
│   │   │   ├── hero1.webp    # Hero image
│   │   │   └── IMG_5717.webp # Profile photo
│   │   ├── projects/        # Project portfolio images
│   │   ├── video/           # Logo animations and project videos
│   │   ├── fonts/           # Switzer font family (woff, woff2)
│   │   └── favicon.ico
│   └── dist/                # Webpack build output (generated)
├── src/
│   ├── index.html           # Main HTML template with AEO schemas
│   ├── scripts/
│   │   ├── main.js          # Entry point with Lenis & GSAP setup
│   │   ├── animations/      # GSAP animation modules
│   │   │   ├── heroAnimations.js
│   │   │   └── seeMoreButtonAnimations.js
│   │   ├── components/      # Modular JavaScript components
│   │   │   ├── ProjectCard.js      # Web component for projects
│   │   │   ├── MobileNav.js        # Mobile navigation
│   │   │   ├── ContactForm.js      # Form handling
│   │   │   └── contact.js          # Contact section
│   │   └── utils/           # Utility functions
│   │       ├── animationUtils.js   # Animation helpers
│   │       ├── focusTrap.js        # Accessibility
│   │       └── popupManager.js     # Modal management
│   └── styles/
│       ├── main.scss        # Main SCSS entry with variables
│       └── components/      # Modular SCSS components
│           ├── _header.scss
│           ├── _hero.scss
│           ├── _faq.scss
│           ├── _projects.scss
│           ├── _contact.scss
│           ├── _footer.scss
│           └── _card.scss
├── llms.txt                 # AI-optimized content for LLMs
├── robots.txt               # Enhanced with AI crawler support
├── sitemap.xml              # AEO-optimized sitemap
├── impressum.md             # Legal information (German)
├── datenschutzerklaerung.md # Privacy policy (German)
├── .babelrc                 # Babel configuration
├── vite.config.js           # Vite build configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

---

## Color Scheme & Typography

### Color Scheme
| Element        | Color      | Usage |
| -------------- | ---------- | ----- |
| Background     | #EDF2F4    | Main background |
| Primary Text   | #141414    | Headings and body text |
| Secondary Text | #f6f6f6    | Light text on dark backgrounds |
| Accent Color   | #C1121F    | Links, buttons, highlights |
| Accent Dark    | #780000    | Hover states |

### Typography
- **Font Family**: 'Switzer' (Regular, Medium, Bold, Italic)
- **Fallbacks**: Helvetica, Arial, sans-serif
- **Font Display**: swap (for performance)
- **Font Files**: Located in `public/assets/fonts/` (woff2 + woff formats)

---

## Layout & Content

### Header
- **Logo**: SVG with animated video mask on hover
- **Navigation**: Desktop nav + responsive mobile menu
- **CTA**: Direct link to contact section

### Hero Section
- **Background**: Berlin cityscape (hero1.webp) with parallax scrolling
- **Title**: "Von Rohbau bis Launch" with letter-by-letter animation
- **Subtitle**: Value proposition with clear messaging
- **Credits**: Photo attribution for transparency

### Services/FAQ Section (AEO-Optimized)
- **About Introduction**: Personal introduction with expertise button
- **Service Grid**: 4 core services (Web Dev, UI/UX, Branding, AI)
- **FAQ Accordion**: 7 detailed Q&A pairs optimized for AI parsing
- **Profile Image**: Parallax effect with contact links

### Projects Section
- **Project Cards**: Custom web components with pixelated hover effects
- **Video Integration**: Smooth video reveals on hover
- **Placeholder Card**: A static card with a "+" symbol, "Mehr in Kürze" text, and a link "Werde Teil des STACKWERKHAUS" leading to the contact section.

### Contact Section
- **Contact Form**: Formspree integration with file upload
- **Calendly Integration**: Direct booking widget
- **Custom Checkboxes**: Animated GDPR consent

### Footer
- **Social Links**: Instagram and LinkedIn
- **Legal Buttons**: Modal triggers for Impressum/Datenschutz
- **Animated Logo**: Seamless scrolling text animation

---

## GSAP Animations

### Page Load Animations
- **Fade-in**: Smooth page entrance with opacity transition
- **Staggered Text**: Letter-by-letter reveals for headlines
- **Hero Animation**: Immediate title animation on load

### Scroll-Based Animations
- **Parallax Hero**: True parallax scrolling at 0.4x speed
- **Section Headlines**: Staggered letter animations on scroll
- **FAQ Items**: Fade-in with stagger delays
- **Profile Image**: Subtle parallax movement

### Interactive Animations
- **Project Cards**: Pixelated image reveals with random grid
- **Mobile Menu**: Smooth slide-in with staggered links
- **Accordion**: Height and opacity transitions
- **Footer Logo**: Seamless infinite scroll loop

### Custom GSAP Features
- **Blur Plugin**: Custom GSAP plugin for filter effects
- **ScrollTrigger Integration**: Synchronized with Lenis smooth scroll
- **Force3D Optimization**: Hardware acceleration for performance

---

## Responsive Design

### Breakpoints
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Mobile Features
- **Hamburger Menu**: Animated 3-line toggle
- **Touch Interactions**: Optimized for touch devices
- **Responsive Typography**: Clamp() functions for fluid scaling
- **Modal Adaptations**: Full-screen modals on mobile

### Performance Considerations
- **Mobile-First CSS**: Progressive enhancement approach
- **Touch Detection**: Different interactions for touch vs mouse
- **Image Optimization**: WebP format with fallbacks

---

## Accessibility

### ARIA Implementation
- **Semantic HTML**: Proper landmark roles and heading hierarchy
- **Modal Management**: Focus trapping and ARIA attributes
- **Button States**: aria-expanded for menu toggles
- **Screen Reader Support**: sr-only classes and descriptive labels

### Keyboard Navigation
- **Tab Order**: Logical focus flow through interactive elements
- **Escape Key**: Modal dismissal functionality
- **Enter/Space**: Button activation support

### Visual Accessibility
- **Color Contrast**: WCAG 2.1 AA compliant ratios
- **Focus Indicators**: Visible focus states for all interactive elements
- **Alternative Text**: Descriptive alt attributes for all images

---

## Prerequisites

### Development Environment
- **Node.js**: Recent version (recommended)
- **npm**: Package manager for JavaScript

### Getting Started
```bash
# Clone the repository
git clone https://github.com/yourusername/STACKWERKHAUS2.git

# Navigate to project directory
cd STACKWERKHAUS2

# Install dependencies
npm install

# Start development server
npm start
```

---

## Browser Compatibility

### Supported Browsers
- **Google Chrome**: Latest versions
- **Apple Safari**: Latest versions

### Testing
The website has been primarily tested on the latest versions of Chrome and Safari.

### Responsive Testing
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

---

## Build & Development

### Prerequisites
- Node.js (v14+)
- NPM (v6+)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/stackwerkhaus.git

# Navigate to project directory
cd stackwerkhaus

# Install dependencies
npm install
```

### Development
```bash
# Start development server with hot reloading
npm run dev

# The site will be available at http://localhost:3000
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Deployment
```bash
# Build and prepare for deployment
npm run build-deploy

# Deploy using the deploy script (requires SSH access)
./deploy.sh
```

### Key Features of Vite Setup
- **Fast Development**: Near-instant server start and HMR
- **Optimized Build**: Efficient production builds with proper code splitting
- **Asset Handling**: Automatic processing of images, fonts, and other assets
- **CSS Processing**: SCSS compilation with source maps
- **Environment Variables**: Different settings for development and production
- **Path Aliasing**: Simplified imports with path aliases

---

## SEO & AEO Setup

### Initial SEO Foundation
- **Meta Tags**: Comprehensive meta information
- **Open Graph**: Social media sharing optimization
- **Structured Data**: Multiple JSON-LD schemas
- **Sitemap**: XML sitemap with image metadata
- **Robots.txt**: Search engine crawler instructions

### AEO (Answer Engine Optimization) Setup

#### Immediate Actions Required:
1. **Google Search Console**
   - Add property: `https://stackwerkhaus.de`
   - Verify ownership (HTML file upload or DNS)
   - Submit sitemap: `https://stackwerkhaus.de/sitemap.xml`
   - Request indexing for key pages

2. **Bing Webmaster Tools**
   - Add site: `https://stackwerkhaus.de`
   - Submit sitemap
   - Enable IndexNow for faster indexing

3. **AI Index Submission**
   - Submit to [llms-txt.site](https://llms-txt.site)
   - Content available at: `https://stackwerkhaus.de/llms.txt`

#### Testing & Monitoring
- **Perplexity Testing**: Ask questions about Berlin web development
- **ChatGPT Testing**: Search for STACKWERKHAUS services
- **Monitoring Tools**: Profound, Goodie AI, HubSpot AI Search Grader

#### Expected Timeline
- **Week 1**: Submit to search engines and indexes
- **Week 2-3**: Content gets crawled and indexed
- **Week 3-4**: Start seeing AI citations and mentions

---

## Deployment

### Recommended Platforms
- **Netlify**: Automatic builds from Git, global CDN
- **Vercel**: Edge deployment with excellent performance
- **GitHub Pages**: Free hosting for static sites

### Deployment Steps
1. **Build**: Run `npm run build`
2. **Upload**: Deploy contents of `public/dist/` directory
3. **DNS**: Point domain to hosting provider
4. **SSL**: Enable HTTPS (usually automatic)
5. **Submit**: Add to search engines and AI indexes

### Post-Deployment Checklist
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Submit to llms-txt.site for AI visibility
- [ ] Test AEO with Perplexity and ChatGPT
- [ ] Monitor performance with Core Web Vitals
- [ ] Set up monitoring for AI mentions

---

## Assets & Fonts

### Images
- **Hero Image**: `hero1.webp` (Berlin cityscape)
- **Profile**: `IMG_5717.webp` (Tarik Marshall)
- **Projects**: Located in `public/assets/projects/`
- **Logo**: SVG format for crisp rendering

### Fonts
- **Switzer Family**: Regular, Medium, Bold, Italic
- **Formats**: WOFF2 (primary) + WOFF (fallback)
- **Performance**: Font-display: swap for fast loading

### Videos
- **Logo Animation**: WebM + MP4 formats
- **Project Reveals**: WebM format for smooth playback

---

## Performance Optimizations

### Build Optimizations
- **Code Splitting**: Vendor bundles separated
- **Tree Shaking**: Unused code elimination
- **Minification**: CSS and JavaScript compression
- **Asset Optimization**: Image and font compression

### Runtime Optimizations
- **Lazy Loading**: Images load as needed
- **Preloading**: Critical resources prioritized
- **GSAP Performance**: Force3D and will-change properties
- **Smooth Scrolling**: Hardware-accelerated scrolling

### Core Web Vitals
- **LCP**: Hero image preloaded and optimized
- **FID**: Minimal JavaScript blocking
- **CLS**: Reserved space for dynamic content

---

## Maintenance & Updates

### Update Schedule
- **Monthly**: The site is updated at least once per month with new content, features, or optimizations.

### Update Process
1. **Content Review**: Check for outdated information and update accordingly
2. **Project Additions**: Add new completed projects to the portfolio section
3. **Performance Checks**: Run Lighthouse audits to ensure continued performance
4. **AEO Updates**: Refine content based on AI search trends and user questions

---

## Credits & License

### Design & Development
- **Tarik Marshall** - STACKWERKHAUS
- **Inspired by**: [chriskalafatis.com](https://www.chriskalafatis.com/)
- **AEO Strategy**: Based on [Sam Hogan's methodology](https://www.samhogan.sh/blog/a-new-form-of-seo)

### Photography
- **Hero Image**: Sebastian Herrmann via Unsplash
- **Profile Photos**: Tarik Marshall

### License
- **ISC License**
- **Commercial Use**: Portfolio and business website

---

## Contact & Support

**STACKWERKHAUS**
- **Website**: [stackwerkhaus.de](https://stackwerkhaus.de)
- **Email**: info@stackwerkhaus.de
- **Phone**: +49 176 31378294
- **Location**: Berlin, Germany

**Social Media**
- **Instagram**: [@stackwerkhaus](https://www.instagram.com/stackwerkhaus)
- **LinkedIn**: [Tarik Marshall](https://www.linkedin.com/in/tarik-arthur-marshall-6112b2239)

---

## Notes for Developers

### Customization
- **Colors**: Update CSS custom properties in `src/styles/main.scss`
- **Animations**: Modify GSAP settings in `src/scripts/animations/`
- **Content**: Update FAQ answers for better AEO performance
- **Structured Data**: Modify JSON-LD schemas in `src/index.html`

### Adding New Content
- **Projects**: Add images to `public/assets/projects/` and update HTML
- **FAQ Items**: Add to both HTML and JSON-LD schema
- **Services**: Update service grid and llms.txt file
- **Contact**: Update all contact references consistently

### AEO Best Practices
- **Answer-First Format**: Start with direct answers in bold
- **Question Headlines**: Use exact questions people ask
- **Structured Lists**: Break down complex information
- **Update llms.txt**: Keep AI content current and comprehensive

For detailed animation and layout logic, see the respective files in `src/scripts/animations/` and `src/styles/components/`. 