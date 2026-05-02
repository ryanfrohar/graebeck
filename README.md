# Graebeck Construction Ltd. Website

A modern, responsive website for Graebeck Construction Ltd., Ottawa's trusted builder since 2000. Built with vanilla HTML, Tailwind CSS, and JavaScript.

## 🏗️ About

Graebeck Construction Ltd. provides general contracting, construction management, project management, and design-build services across the National Capital Region. This website showcases their portfolio of institutional, commercial, industrial, and heritage restoration projects.

## 📁 Project Structure

```
graebeck/
├── css/
│   └── custom.css          # Custom styles and animations
├── js/
│   └── main.js             # Interactive functionality
├── images/
│   └── projects/           # Project images
├── projects/              # Project detail pages
│   ├── project-beau-roc.html
│   ├── project-commercial.html
│   ├── project-commissionaires.html
│   ├── project-egyptian.html
│   ├── project-hospital.html
│   ├── project-montfort.html
│   ├── project-parliament.html
│   └── project-restoration.html
├── about.html             # About page
├── contact.html           # Contact page
├── index.html             # Homepage
├── projects.html          # Projects portfolio
└── services.html          # Services overview
```

## 🚀 Getting Started

### Local Development

1. Clone the repository
2. Navigate to the project directory
3. Start a local HTTP server:

```bash
# Python 3
python3 -m http.server 8080

# Or with Python 2
python -m SimpleHTTPServer 8080

# Or with Node.js (if you have http-server installed)
npx http-server -p 8080
```

4. Open your browser to `http://localhost:8080`

## 🎨 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Project Portfolio**: Filterable project gallery with detailed case studies
- **Interactive Elements**: 
  - Scroll reveal animations
  - Animated counters for statistics
  - Lightbox gallery for project images
  - Mobile hamburger navigation
  - Project category filtering

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No framework dependencies
- **Google Fonts**: Montserrat & Inter typefaces

## 📝 Key Sections

- **Hero**: Animated headline with key messaging
- **Stats Bar**: Animated company statistics (25+ years, 250+ projects, 100% LEED committed)
- **Projects**: Filterable portfolio with categories (Institutional, Commercial, Industrial, Heritage)
- **Services**: Overview of four main service offerings
- **About**: Company history and values
- **Contact**: Contact form and information

## 🎯 Customization

### Colors

Custom color palette defined in Tailwind config:
- `onyx`: #1A1A1A (dark background)
- `forest`: #227750 (primary accent)
- `cool`: #F4F4F9 (light background)
- `gold`: #005193 (highlight/nav color)

### Fonts

- **Montserrat**: Headings and navigation
- **Inter**: Body text and UI elements

## 📱 Browser Support

Modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

Copyright © 2025 Graebeck Construction Ltd. All rights reserved.

## 📞 Contact

- **Address**: 6361 Fourth Line Road, North Gower, ON K0A 2T0
- **Phone**: (613) 591-9100
- **Email**: gcl@graebeck.com
