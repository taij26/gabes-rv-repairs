# Gabriel's Mobile RV Repair Service Inc. - Website

A premium, highly interactive, and mobile-first single-page website designed and built for **Gabriel's Mobile RV Repair Service Inc.** based in Moncton, New Brunswick.

This application is built with vanilla web technologies (**HTML5, CSS3, and JavaScript**) to ensure lightning-fast performance, maximum reliability, and effortless load times for campers with poor cellular connectivity in remote campgrounds.

---

## 🌟 Key Features

1.  **Mobile-First Design:** Fully responsive layout built with custom HSL tokens, sleek glassmorphism panels, and interactive components.
2.  **Visual Symptom Troubleshooter:** An interactive multi-step diagnostic widget that guides users through common RV issues (Electrical, HVAC, Plumbing, Roof) and automatically pre-fills booking forms.
3.  **Campground Locator & Fee Estimator:** A drop-down travel calculator listing exact travel charges and arrival guarantees for campsites around Moncton, Shediac, Salisbury, and national parks.
4.  **Dual-Mode Booking System:** A streamlined interface for toggling between Scheduled Routine Maintenance and Priority 24/7 Roadside dispatches, complete with custom simulated loading states and a success notification modal.
5.  **100/100 Lighthouse Standards:** Fully compliant with strict WCAG accessibility guidelines (semantic landmarks, optimal color contrasts, sequential headings) to maximize local organic search indexing.

---

## 📁 File Structure

```
Gabe-RV-Repairs/
├── index.html          # Semantic HTML markup and inline SVG definitions
├── styles.css          # Core CSS variables, typography, transitions, and media queries
├── app.js              # Application logic, dynamic calculators, wizard, and sliders
├── robots.txt          # Search engine crawlers instruction file
├── sitemap.xml         # XML Sitemap mapping for production indexers
├── IMG_0016.HEIC       # Original brand logo asset (HEIC format)
└── images/             # High-resolution optimized visual assets
    ├── hero_rv_sunset.png   # Premium campsite visual
    └── diagnostic_rv.png    # Close-up visual for the troubleshooter panel
```

---

## 🎨 Logo Customization Instructions

Since web browsers cannot render Apple's native HEIC image format (`IMG_0016.HEIC`), a beautiful text-and-SVG icon fallback is active by default. To swap in the official logo:

1.  Open `IMG_0016.HEIC` in the Windows **Photos** app, Windows **Paint**, or an online image editor (e.g., CloudConvert).
2.  Select **Save As** (or **Save a Copy**) and format it as a **PNG**.
3.  Save the converted file as `logo.png` inside the `images/` directory (`images/logo.png`).
4.  The navbar and footer are pre-wired to load `images/logo.png` automatically if it is present!

---

## 🚀 Easy Deployment Guide

To deploy this static codebase to the web for free in under 5 minutes:

### Option A: Netlify (Easiest)
1.  Go to [Netlify](https://www.netlify.com/) and log in (or create a free account).
2.  Drag and drop the entire `Gabe-RV-Repairs` folder directly into the Netlify Web Dashboard.
3.  Your site will be live instantly with a free SSL certificate! Connect a custom domain (e.g., `gabrielsmobilerv.com`) in the domain settings panel.

### Option B: GitHub Pages
1.  Push the project files to a public repository on [GitHub](https://github.com/).
2.  Go to **Settings > Pages** on the repository page.
3.  Under **Build and deployment**, select **Deploy from a branch** and set it to `main` (or `master`) and folder `/ (root)`.
4.  Save, and GitHub will publish the site at a free `github.io` URL within a minute.
