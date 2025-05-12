# Tarik Marshall Portfolio Website - Build Instructions

## Table of Contents

1. Project Overview
2. Technologies & Tools
3. Project Structure
4. Color Scheme & Typography
5. Layout & Content
6. GSAP Animations
7. Responsive Design
8. Accessibility Considerations
9. Deployment

---

## 1. Project Overview

- **Original Website**: [chriskalafatis.com](https://www.chriskalafatis.com/)
- **Purpose**: Personal portfolio showcasing projects and capabilities.
- **Design Style**: Minimalist, dark theme, large typography, smooth animations.
- **Modifications**:
  - Change color scheme to a lighter theme.
  - Update typography to use different fonts.
  - Adjust animations for a more dynamic feel.

---

## 2. Technologies & Tools

- **HTML5**: Markup structure.
- **CSS3**: Styling and layout.
- **JavaScript (ES6)**: Interactivity.
- **GSAP (GreenSock Animation Platform)**: Animations.
- **ScrollTrigger (GSAP Plugin)**: Scroll-based animations.
- **Locomotive Scroll**: Smooth scrolling effect.
- **Webpack**: Module bundler.
- **Babel**: JavaScript compiler.
- **SASS/SCSS**: CSS preprocessor.
- **Figma**: Design and prototyping.
- **Git**: Version control.
- **Node.js & NPM**: Package management.

---

## 3. Project Structure

project-root/
├── public/
│   ├── index.html
│   └── assets/
│       ├── images/
│       └── fonts/
├── src/
│   ├── styles/
│   │   ├── main.scss
│   │   └── components/
│   ├── scripts/
│   │   ├── main.js
│   │   └── animations/
│   └── components/
│       ├── header.html
│       ├── hero.html
│       ├── about.html
│       ├── projects.html
│       ├── capabilities.html
│       └── footer.html
├── .babelrc
├── webpack.config.js
├── package.json
└── README.md

---

## 4. Color Scheme & Typography

### Color Scheme

| Element           | Original Color | New Color    |
|-------------------|----------------|--------------|
| Background        | #000000        | #FFFFFF      |
| Primary Text      | #FFFFFF        | #000000      |
| Accent Color      | #FF0000        | #007BFF      |
| Link Hover        | #CCCCCC        | #0056b3      |

### Typography

- **Headings**: 'Montserrat', sans-serif.
- **Body Text**: 'Open Sans', sans-serif.
- **Fallbacks**: Helvetica, Arial, sans-serif.

---

## 5. Layout & Content

### 1. Header

- **Logo**: Text-based logo on the top-left corner.
- **Navigation**: Links to 'Projects' and 'About' on the top-right corner.

### 2. Hero Section

- **Title**: Large, bold text stating "MULTI-DISCIPLINARY DESIGNER".
- **Subtitle**: Brief description of Chris's role and expertise.
- **Scroll Indicator**: Downward arrow indicating scrollable content.

### 3. About Section

- **Image**: Portrait of Chris on the left.
- **Text**: Detailed bio on the right.
- **Contact Links**: Email, Instagram, Twitter, LinkedIn.

### 4. Projects Section

- **Project Cards**: Each project includes:
  - Image thumbnail.
  - Project title.
  - Brief description.
  - Link to detailed case study.

### 5. Capabilities Section

- **List**: Grid layout showcasing areas of expertise.
- **Interactive Element**: Click and drag functionality to explore capabilities.

### 6. Footer

- **Contact Prompt**: Invitation to connect.
- **Social Links**: Icons linking to social media profiles.
- **Signature**: Stylized text of Chris's name.

---

## 6. GSAP Animations

### 1. Page Load

- **Fade-In**: Entire page content fades in on load.
- **Staggered Text**: Hero title appears letter by letter.

```javascript
gsap.from(".hero-title span", {
  opacity: 0,
  y: 50,
  stagger: 0.1,
  duration: 1,
  ease: "power2.out"
});

### 2. Scroll Animations
	•	About Section: Image and text slide in from opposite sides.
    gsap.from(".about-image", {
  scrollTrigger: ".about-section",
  x: -100,
  opacity: 0,
  duration: 1
});

gsap.from(".about-text", {
  scrollTrigger: ".about-section",
  x: 100,
  opacity: 0,
  duration: 1
});

	•	Project Cards: Fade-in and scale-up as they enter the viewport.
    gsap.from(".project-card", {
  scrollTrigger: ".projects-section",
  opacity: 0,
  scale: 0.95,
  stagger: 0.2,
  duration: 0.8
});

3. Capabilities Section
	•	Interactive Drag: Implement draggable functionality using GSAP’s Draggable plugin.
    Draggable.create(".capabilities-grid", {
  type: "x",
  bounds: ".capabilities-container",
  inertia: true
});

7. Responsive Design
	•	Media Queries: Adjust layout for tablets and mobile devices.
	•	Flexible Grid: Use CSS Grid and Flexbox for adaptable layouts.
	•	Touch Support: Ensure interactive elements are accessible via touch.

⸻

8. Accessibility Considerations
	•	Semantic HTML: Use appropriate tags for structure.
	•	Alt Text: Provide descriptive alt attributes for images.
	•	Keyboard Navigation: Ensure all interactive elements are focusable and operable via keyboard.
	•	Color Contrast: Maintain sufficient contrast ratios for readability.

⸻

9. Deployment
	•	Hosting: Use platforms like Netlify, Vercel, or GitHub Pages.
	•	Performance Optimization:
	•	Minify CSS and JS files.
	•	Optimize images.
	•	Implement lazy loading for images and videos.

ANIMATIONS:
# Chris Kalafatis Portfolio Website – Detailed Visual and Interactive Description

## Overview

Chris Kalafatis's portfolio website is a minimalist, dark-themed, single-page design that showcases his work as a multi-disciplinary designer and art director. The site employs smooth animations, large typography, and interactive elements to engage visitors.

---

## 1. Header

- **Navigation Bar**: Located at the top of the page, featuring links to "Projects" and "About" sections. The text is white, set against a black background, using a bold, sans-serif font.

- **Logo**: Positioned on the top-left corner, displaying "CHRIS K." in uppercase white letters.

- **Hover Effects**: When hovering over navigation links, the text color subtly changes to a lighter gray, indicating interactivity.

---

## 2. Hero Section

- **Title**: The phrase "MULTI-DISCIPLINARY DESIGNER" is displayed in large, bold, white uppercase letters, centered on the screen. Each word appears sequentially with a smooth fade-in and upward motion, creating a dynamic entrance.

- **Subtitle**: A brief description of Chris's role and expertise appears below the title, using a smaller, lighter-weight font, maintaining the white-on-black color scheme.

- **Scroll Indicator**: A downward-pointing arrow is positioned beneath the subtitle, gently animating up and down to prompt users to scroll.

- **Animations**: The hero section utilizes GSAP animations to stagger the appearance of text elements, enhancing the visual engagement upon page load.

---

## 3. About Section

- **Introduction**: A concise statement: "Hello, my name’s Chris, I’m a Bay Area born designer and art director. Creating connected brands, commerce, product, and web experiences." This text is left-aligned, white, and uses a clean, sans-serif font.

- **Contact Links**: Below the introduction, links to Chris's email, Instagram, Twitter, and LinkedIn profiles are presented in white text, spaced evenly.

- **Portrait Image**: To the right of the text, a grayscale portrait of Chris is displayed. As users scroll into this section, the image and text slide into view from opposite sides with a subtle fade-in effect.

- **Hover Effects**: Hovering over contact links underlines the text and changes its color to a lighter shade, indicating interactivity.

---

## 4. Projects Section

- **Section Title**: "Projects" is displayed in large, bold, white text, centered at the top of the section.

- **Project Listings**: Three featured projects are showcased:

  1. **Four Sigmatic**: Website Redesign + Brand Evolution

  2. **Kapsul**: Web Design + Brand Campaign

  3. **TaylorMade**: Product Design + Web Concepts

- **Presentation**: Each project is presented with a thumbnail image on the left and project details on the right. As users scroll, each project entry fades in and slides upward slightly, creating a smooth transition.

- **Hover Effects**: Hovering over a project thumbnail slightly enlarges the image and displays a semi-transparent overlay with a brief description.

- **Animations**: GSAP's ScrollTrigger is used to animate project entries as they enter the viewport, enhancing user engagement.

---

## 5. Capabilities Section

- **Section Title**: "Capabilities" is displayed in large, bold, white text, centered at the top.

- **Interactive Grid**: A horizontally scrollable grid showcases various areas of expertise. Users can click and drag to navigate through the grid. Each capability is represented by a white card with black text, and hovering over a card slightly enlarges it, indicating interactivity.

- **Animations**: GSAP's Draggable plugin is implemented to enable the click-and-drag functionality, providing a seamless interactive experience.

---

## 6. Footer

- **Contact Prompt**: A call-to-action encouraging visitors to connect, displayed in white text.

- **Social Links**: Icons linking to social media profiles (Instagram, Twitter, LinkedIn) are presented in white, spaced evenly.

- **Signature**: Chris's name is stylized in large, bold, white uppercase letters, centered at the bottom.

- **Hover Effects**: Hovering over social icons changes their color to a lighter shade, indicating interactivity.

---

## Design Elements

- **Color Scheme**: Predominantly black background with white text, creating a high-contrast, minimalist aesthetic.

- **Typography**: Uses bold, sans-serif fonts for headings and clean, legible fonts for body text. The consistent use of uppercase letters in headings adds to the modern feel.

- **Animations**: Smooth transitions are employed throughout the site, including fade-ins, slide-ins, and subtle hover effects. These animations are likely implemented using GSAP (GreenSock Animation Platform) and ScrollTrigger for scroll-based interactions.

- **Responsiveness**: The layout adjusts seamlessly across various screen sizes, ensuring usability on both desktop and mobile devices.

---

## Summary

Chris Kalafatis's portfolio website is a testament to minimalist design, combining a monochromatic color palette with bold typography and smooth animations to create an engaging user experience. The site's structure guides visitors through his professional narrative, showcasing his skills and projects effectively.

---

*Note: This description is based on the visual and interactive elements observed on the website as of the latest available information.*