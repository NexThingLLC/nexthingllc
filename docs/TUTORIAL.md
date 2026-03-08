# How to Build a Static Business Website

This tutorial walks through how the NexThing site was built - from a blank folder to a
polished, responsive, single-page site ready for GitHub Pages. No frameworks, no build
tools, no backend.

---

## Table of Contents

1. [The Big Picture](#1-the-big-picture)
2. [File Structure](#2-file-structure)
3. [HTML: Building the Skeleton](#3-html-building-the-skeleton)
4. [CSS: Styling the Site](#4-css-styling-the-site)
5. [JavaScript: Adding Behavior](#5-javascript-adding-behavior)
6. [Putting It All Together](#6-putting-it-all-together)
7. [Deploying to GitHub Pages](#7-deploying-to-github-pages)

---

## 1. The Big Picture

A static website is just files - HTML, CSS, and JavaScript - served directly to the
browser with no server processing them first. That makes them:

- Free or very cheap to host (GitHub Pages is free)
- Fast to load
- Simple to maintain

The three files do three different jobs:

| File | Job | Analogy |
|------|-----|---------|
| `index.html` | Structure and content | The walls and rooms of a house |
| `css/styles.css` | Visual design | The paint, furniture, and lighting |
| `js/main.js` | Behavior and interactivity | The light switches and doors |

---

## 2. File Structure

Keep things organized from the start. Flat and simple wins.

```
site/
├── index.html        <- The only HTML page
├── logo.png          <- Assets live at the root or in a folder
├── css/
│   └── styles.css    <- All custom styles
├── js/
│   └── main.js       <- All custom JavaScript
└── docs/
    └── TUTORIAL.md   <- This file
```

One rule: use **relative paths** for everything. Write `css/styles.css`, never
`/home/yourname/site/css/styles.css`. Relative paths work on any computer and on
GitHub Pages.

---

## 3. HTML: Building the Skeleton

### 3.1 The Document Shell

Every HTML file starts with the same boilerplate:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A short description for search engines." />
  <title>Your Page Title</title>

  <!-- Load CSS here -->
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>

  <!-- All visible content goes here -->

  <!-- Load JavaScript at the bottom, just before </body> -->
  <script src="js/main.js"></script>
</body>
</html>
```

Key points:
- `<!DOCTYPE html>` tells the browser this is modern HTML5.
- `<meta charset="UTF-8">` ensures special characters display correctly.
- `<meta name="viewport" ...>` makes the site work on mobile screens.
- CSS loads in `<head>` so styles apply before the page renders.
- JavaScript loads at the bottom so it does not block the page from appearing.

### 3.2 Semantic Sections

HTML5 gives you meaningful tags for each part of a page. Use them - they help
screen readers, search engines, and your future self.

```html
<nav>...</nav>          <!-- Navigation -->
<section id="hero">     <!-- A thematic section, given an id for linking -->
<section id="about">
<section id="contact">
<footer>...</footer>    <!-- Footer -->
```

Give each section an `id` that matches your nav links:

```html
<!-- Nav link -->
<a href="#about">About Us</a>

<!-- The section it links to -->
<section id="about">
```

When a user clicks the link, the browser scrolls to that section. Add
`scroll-behavior: smooth` in CSS to make it animate instead of jump.

### 3.3 Structuring Content Inside a Section

A consistent pattern keeps sections predictable and easy to style:

```html
<section id="about">
  <div class="section-inner">          <!-- Centers and constrains width -->
    <p class="section-label">About Us</p>     <!-- Small uppercase label -->
    <h2 class="section-heading">Your Heading</h2>
    <div class="section-divider"></div        <!-- Decorative accent bar -->
    <p class="section-subtext">Body copy...</p>
  </div>
</section>
```

### 3.4 Cards

Cards are the most reusable pattern on the web - a self-contained box of related
content. You see them in the Promise and Expertise sections:

```html
<div class="card-grid">
  <div class="card">
    <div class="card-icon">
      <!-- SVG icon here -->
    </div>
    <h3>Card Title</h3>
    <p>A short description of this item.</p>
  </div>
  <!-- repeat for each card -->
</div>
```

### 3.5 Using SVG Icons Inline

SVG icons are vector graphics defined in code - they scale perfectly at any size and
do not require extra image files. The simplest source is
[Feather Icons](https://feathericons.com), which is what this site uses.

Copy the SVG markup and drop it directly into your HTML:

```html
<svg viewBox="0 0 24 24" aria-hidden="true">
  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
</svg>
```

`aria-hidden="true"` tells screen readers to skip it, since it is decorative.

Control the size and color with CSS:

```css
svg {
  width: 24px;
  height: 24px;
  stroke: white;
  fill: none;
  stroke-width: 2;
}
```

---

## 4. CSS: Styling the Site

### 4.1 CSS Custom Properties (Variables)

Define your brand colors and values once at the top, then use them everywhere.
If you want to change a color later, you only change it in one place.

```css
:root {
  --cyan: #00C4FF;
  --blue: #3D7EFF;
  --purple: #7B2FBE;
  --navy: #0B0B1E;
  --font-main: 'Inter', system-ui, sans-serif;
}
```

Use them like this:

```css
body {
  background-color: var(--navy);
  font-family: var(--font-main);
}

h1 {
  color: var(--cyan);
}
```

### 4.2 The Box Model

Every element is a box. The box has:

```
+---------------------------+
|         margin            |  <- Space outside the border
|  +---------------------+  |
|  |       border        |  |  <- The visible edge
|  |  +---------------+  |  |
|  |  |    padding    |  |  |  <- Space inside the border
|  |  |  +---------+  |  |  |
|  |  |  | content |  |  |  |
```

Always start your CSS with this reset so all browsers behave the same:

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
```

`box-sizing: border-box` means padding and border are included in an element's
width - a far more intuitive behavior than the default.

### 4.3 Layout with Flexbox

Flexbox arranges items in a row or column and handles alignment cleanly.

```css
/* Horizontal row, centered */
.nav {
  display: flex;
  align-items: center;       /* vertically center */
  justify-content: space-between; /* push items to each end */
}

/* Centered content */
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

Key properties:
- `flex-direction: row` (default) or `column`
- `align-items`: cross-axis alignment (vertical when row)
- `justify-content`: main-axis alignment (horizontal when row)
- `gap`: space between items

### 4.4 Layout with CSS Grid

Grid is best for two-dimensional layouts - rows and columns at the same time.

```css
/* Two equal columns */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

/* Responsive cards: as many columns as fit, min 200px wide */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}
```

`auto-fit` with `minmax` is a powerful pattern - the grid creates as many columns
as fit at the minimum size, then stretches them to fill the row. No media queries
needed for basic responsiveness.

### 4.5 Gradients

Gradients are defined as CSS `background` values.

```css
/* Linear gradient: direction, color stops */
background: linear-gradient(135deg, #00C4FF, #3D7EFF, #7B2FBE);

/* Radial gradient: shape from center outward */
background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,196,255,0.1), transparent);
```

To apply a gradient to text:

```css
.gradient-text {
  background: linear-gradient(135deg, var(--cyan), var(--purple));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 4.6 Responsive Design with Media Queries

A media query applies styles only when a condition is true (usually screen width).
Design for large screens first, then override for small screens.

```css
/* Default: two-column layout */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
}

/* On screens narrower than 768px: single column */
@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
```

### 4.7 Transitions and Hover Effects

Smooth transitions make interactions feel polished. Add them to the element in its
default state, not in the `:hover` rule - that way the transition plays in both
directions (hover on and hover off).

```css
.card {
  border: 1px solid rgba(255,255,255,0.1);
  transform: translateY(0);
  /* Define transition on the base element */
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);      /* Lift up */
  border-color: rgba(0,196,255,0.5);
  box-shadow: 0 8px 32px rgba(0,196,255,0.15);
}
```

### 4.8 `clamp()` for Fluid Typography

`clamp(min, preferred, max)` lets font sizes scale with the viewport without
needing media queries.

```css
h1 {
  /* Min 2.5rem, ideally 7% of viewport width, max 5rem */
  font-size: clamp(2.5rem, 7vw, 5rem);
}
```

### 4.9 Fixed Navigation

A `position: fixed` element stays in place as the user scrolls.

```css
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;   /* Sit above all other content */
}
```

Set a high `z-index` so content scrolling beneath the nav does not overlap it.

### 4.10 Glassmorphism Cards

The frosted-glass look uses a semi-transparent background and `backdrop-filter`.

```css
.card {
  background: rgba(18, 18, 42, 0.8);
  border: 1px solid rgba(61, 126, 255, 0.2);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);  /* Safari */
}
```

---

## 5. JavaScript: Adding Behavior

### 5.1 Selecting Elements

Before you can do anything with an element, you need a reference to it.

```js
// Select one element by id
const navbar = document.getElementById('navbar');

// Select one element by CSS selector
const form = document.querySelector('#contact-form');

// Select all matching elements
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
```

### 5.2 Responding to Events

An event listener runs a function when something happens.

```js
// Run a function when the user scrolls
window.addEventListener('scroll', () => {
  // code here runs on every scroll event
});

// Run when a button is clicked
button.addEventListener('click', () => {
  // code here runs on click
});

// { passive: true } is a performance hint for scroll events
window.addEventListener('scroll', handleScroll, { passive: true });
```

### 5.3 Changing Classes

Adding and removing CSS classes is how JavaScript drives visual changes. Define
the visual state in CSS, then toggle the class from JS.

```css
/* CSS defines what "scrolled" looks like */
nav.scrolled {
  background: rgba(11, 11, 30, 0.92);
  backdrop-filter: blur(12px);
}
```

```js
// JS adds or removes the class based on scroll position
function handleScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
```

`classList` methods:
- `.add('name')` - add a class
- `.remove('name')` - remove a class
- `.toggle('name')` - add if absent, remove if present
- `.contains('name')` - returns true or false

### 5.4 Highlighting the Active Nav Link

To highlight which section the user is currently viewing, loop through all
sections and check if the scroll position has passed their top edge.

```js
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
  let current = '';

  sections.forEach(section => {
    // offsetTop is the section's distance from the top of the page
    // Subtract 100 so the link activates slightly before reaching the section
    if (window.scrollY >= section.offsetTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    // href is "#about", so compare against "#" + current
    const isActive = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active', isActive);
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });
```

### 5.5 The IntersectionObserver

Checking scroll position on every scroll event can be slow for animations.
`IntersectionObserver` is the modern way - the browser tells you when an element
enters the viewport, efficiently.

```js
// Create an observer with a callback function
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {        // Element is now visible
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Stop watching once it has appeared
    }
  });
}, { threshold: 0.12 }); // Fire when 12% of element is visible

// Tell the observer which elements to watch
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
```

The CSS handles the actual animation - JS just adds the class:

```css
.fade-up {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 5.6 Form Handling with Mailto

Without a backend, you cannot process form submissions on the server. The simplest
option is a `mailto:` link that opens the user's email client.

```js
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // Stop the browser's default form submission

  const name    = form.querySelector('#name').value.trim();
  const email   = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  // encodeURIComponent makes special characters safe for a URL
  const subject = encodeURIComponent('Inquiry from ' + name);
  const body    = encodeURIComponent('From: ' + name + '\nEmail: ' + email + '\n\n' + message);

  window.location.href = 'mailto:you@example.com?subject=' + subject + '&body=' + body;
});
```

For a production site, consider a free static form service like
[Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com) that
handles submission without needing your own backend.

---

## 6. Putting It All Together

Here is the mental model for how the three files connect:

```
index.html  --->  loads  --->  css/styles.css
            --->  loads  --->  js/main.js

js/main.js  --->  selects elements from  --->  index.html DOM
            --->  adds/removes classes   --->  triggers styles in css/styles.css
```

A practical workflow when building a new section:

1. Write the HTML structure in `index.html` with the right class names.
2. Write the CSS in `styles.css` to style those class names.
3. Open `index.html` in your browser to see the result.
4. Add any JavaScript behavior in `main.js` if the section needs it.
5. Refresh the browser and repeat.

You do not need a development server for a static site. Just open `index.html`
directly in your browser (`File > Open`, or drag the file in).

---

## 7. Deploying to GitHub Pages

GitHub Pages hosts static sites for free from a GitHub repository.

### Steps

1. Create a repository on GitHub (e.g., `nexthing-site`).

2. Push your site files to the repository:
   ```
   git init
   git add .
   git commit -m "Initial site build"
   git remote add origin https://github.com/yourname/nexthing-site.git
   git push -u origin main
   ```

3. In GitHub, go to **Settings > Pages**.

4. Under **Source**, select **Deploy from a branch**, choose `main`, and set
   the folder to `/ (root)`.

5. Click **Save**. GitHub will build and publish your site. The URL will be:
   ```
   https://yourname.github.io/nexthing-site/
   ```

### What to Check Before Deploying

- All asset paths are relative (`css/styles.css`, not `/css/styles.css`)
- All external resources (fonts, Tailwind) load from HTTPS CDN URLs
- The site works when opened as a local file (`file:///...`)

---

## Key Concepts Recap

| Concept | Where Used | Why It Matters |
|---|---|---|
| CSS custom properties | `styles.css :root` | Change brand colors in one place |
| `box-sizing: border-box` | Reset | Predictable element sizing |
| CSS Grid `auto-fit minmax` | Card grids | Responsive columns without media queries |
| `clamp()` | Headings | Fluid text that scales with viewport |
| `position: fixed` + `z-index` | Nav | Stays visible while scrolling |
| `classList.toggle` | Nav, mobile menu | JS drives CSS-defined states |
| `IntersectionObserver` | Fade-in animations | Efficient scroll-triggered effects |
| Relative paths | All asset links | Required for GitHub Pages to work |
