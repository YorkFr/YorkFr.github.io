# YorkFr's Personal Blog

A minimalist, modern personal blog built with Jekyll, featuring a Google AI-inspired design aesthetic with advanced reading controls.

> 🤖 **想了解 AI Agent 能做什么？** 查看 [AI Agent 能力说明](AGENT_CAPABILITIES.md)  
> 🤖 **Want to know what AI Agents can do?** Check out [AI Agent Capabilities](AGENT_CAPABILITIES.md)

## 🎨 Design Philosophy

- **Material Design 3** inspired interface
- **Gemini-style** gradient accents
- Clean, minimalist layout with focus on readability
- Responsive design for all devices
- Dark/Light theme toggle
- Bilingual support (English/Chinese)

## ✨ Features

### Core Functionality
- 🌓 **Theme Toggle** - Seamless dark/light mode switching with localStorage persistence
- 🌍 **Bilingual Support** - Full English/Chinese (中英文) support with instant switching
- 🔍 **Command Palette Search** - Quick search with `Ctrl/Cmd+K` shortcut
- 🏷️ **Category Filtering** - Click category tags to filter posts instantly
- ⏰ **Live Clock** - Real-time display in sidebar widget
- 📖 **Enhanced Focus Mode** - Distraction-free reading with customizable controls

### Reading Experience
- 🔤 **Font Size Adjustment** - 4 levels (Small/Medium/Large/XLarge)
- 📏 **Line Width Control** - 3 options (Narrow/Medium/Wide)
- ⬆️ **Scroll to Top** - Smooth scroll floating action button
- ❌ **Quick Exit** - Dedicated exit focus mode button
- 💻 **Syntax Highlighting** - Mac-style code blocks with window controls
- 📋 **One-Click Copy** - Copy code with visual feedback

### UI Components
- Gemini gradient welcome card
- Category widget with post counts
- Time widget with live updates
- Profile widget with bilingual bio
- Responsive three-column layout
- Floating action buttons in focus mode

## 🛠️ Tech Stack

- **Framework**: Jekyll 4.x
- **Styling**: Vanilla CSS with CSS Variables
- **Icons**: Phosphor Icons
- **Fonts**: Google Fonts (Outfit, JetBrains Mono)
- **Hosting**: GitHub Pages
- **JavaScript**: ES6+ (modular architecture available)

## 📁 Project Structure

```
YorkFr.github.io/
├── _includes/          # Reusable components
│   ├── head.html
│   ├── sidebar.html
│   └── widgets.html
├── _layouts/           # Page templates
│   ├── default.html
│   ├── post.html
│   └── article-base.html
├── _posts/            # Blog posts (Markdown)
├── pages/             # Standalone pages
│   ├── about.html
│   └── archive.html
├── assets/
│   ├── css/           # Modular stylesheets
│   │   ├── 0-theme.css
│   │   ├── 1-base.css
│   │   ├── 2-layout.css
│   │   ├── 3-components.css
│   │   ├── 4-pages.css
│   │   ├── category-filter.css
│   │   ├── gemini-card.css
│   │   └── reader-controls.css
│   ├── js/
│   │   ├── main.js           # Main JavaScript file
│   │   └── modules/          # Modular JS (optional)
│   │       ├── theme.js
│   │       ├── time.js
│   │       ├── language.js
│   │       ├── navigation.js
│   │       ├── code-copy.js
│   │       ├── search.js
│   │       ├── category-filter.js
│   │       └── focus-mode.js
│   └── images/
├── _config.yml
├── index.html
├── search-data.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Ruby 2.7+
- Jekyll 4.x
- Bundler

### Local Development

```bash
# Clone the repository
git clone https://github.com/YorkFr/YorkFr.github.io.git
cd YorkFr.github.io

# Install dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

### Deployment

This site is automatically deployed to GitHub Pages when you push to the `main` branch.

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Visit: `https://yorkfr.github.io`

## 📝 Writing Posts

Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`

```markdown
---
layout: post
title: "Your Post Title"
author: YorkFr
categories: [Tech, AI]
---

Your content here...
```

## 🎯 Key Features Guide

### Search Functionality
1. Press `Ctrl/Cmd+K` to open search palette
2. Type to search across titles, excerpts, and categories
3. Use arrow keys to navigate results
4. Press `Enter` to open selected post
5. Press `Escape` to close

### Category Filtering
1. Find category tags in the right sidebar
2. Click any category to filter posts
3. Click again to show all posts
4. Active category is highlighted in blue

### Focus Mode (Enhanced Reading)
1. Click the book icon (📖) in any post
2. Sidebar and widgets hide automatically
3. **Reader Controls Panel** appears:
   - **Font Size**: A- / A / A+ buttons
   - **Line Width**: Narrow / Medium / Wide options
4. **Floating Action Buttons** (bottom-right):
   - ⬆️ Scroll to top (smooth scroll)
   - ❌ Exit focus mode
5. Click book icon again or × button to exit

### Theme & Language
- **Theme**: Click sun/moon icon in sidebar
- **Language**: Click EN/ZH button in sidebar
- Settings persist in localStorage

## 🎨 Customization

### Theme Colors

Edit `assets/css/0-theme.css`:

```css
:root {
    --accent-primary: #1a73e8;
    --accent-secondary: #8430ce;
    --bg-app: #f8f9fa;
    /* ... */
}

[data-theme="dark"] {
    --bg-app: #1a1a1a;
    /* ... */
}
```

### Adding New Pages

1. Create HTML file in `pages/` directory
2. Add frontmatter with permalink:

```yaml
---
layout: default
title: Your Page
permalink: /your-page/
---
```

3. Add navigation link in `_includes/sidebar.html`

### Reader Controls

Customize font sizes in `assets/css/reader-controls.css`:

```css
.post-content-clean.font-small { font-size: 0.95rem; }
.post-content-clean.font-medium { font-size: 1.1rem; }
.post-content-clean.font-large { font-size: 1.25rem; }
.post-content-clean.font-xlarge { font-size: 1.4rem; }
```

## 🔧 Configuration

Key settings in `_config.yml`:

```yaml
title: YorkFr's Blog
email: your-email@example.com
description: AI Researcher / Developer / Quant
baseurl: ""
url: "https://yorkfr.github.io"
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px (3-column layout)
- **Tablet**: 768px - 1024px (2-column layout)
- **Mobile**: < 768px (single column)

## 🌟 Advanced Features

### Modular JavaScript (Optional)

The project includes a modular JavaScript architecture in `assets/js/modules/`:
- Separated concerns (theme, search, focus mode, etc.)
- ES6 module syntax
- Easy to maintain and extend
- Currently using `main.js` for compatibility
- Switch to `main-modular.js` for module support

### Code Architecture

**CSS Layers:**
1. `0-theme.css` - CSS variables and theme definitions
2. `1-base.css` - Reset and base styles
3. `2-layout.css` - Grid layout and structure
4. `3-components.css` - Reusable components
5. `4-pages.css` - Page-specific styles
6. Feature-specific CSS (category-filter, gemini-card, reader-controls)

**JavaScript Modules:**
- `theme.js` - Theme switching logic
- `time.js` - Live clock widget
- `language.js` - Bilingual toggle
- `navigation.js` - Active state management
- `code-copy.js` - Copy button functionality
- `search.js` - Command palette search
- `category-filter.js` - Category filtering
- `focus-mode.js` - Enhanced reading mode

## 📊 Performance

- Minimal JavaScript (< 15KB)
- Optimized CSS with variables
- Lazy-loaded search data
- Smooth animations with CSS transitions
- Responsive images support

## 🎯 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**YorkFr**
- AI Researcher / Developer / Quant
- GitHub: [@YorkFr](https://github.com/YorkFr)
- Interests: Machine Learning, Large Language Models, Full-Stack Development, Quantitative Finance

## 🙏 Acknowledgments

- Design inspired by Google's Material Design 3 and Gemini AI
- Icons by [Phosphor Icons](https://phosphoricons.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)
- Built with [Jekyll](https://jekyllrb.com/)

## 🤖 AI Agent Development

This project is developed with the assistance of AI agents. Learn more about what AI agents can do and how they differ from traditional development in the [AI Agent Capabilities Guide](AGENT_CAPABILITIES.md).

## 🔄 Recent Updates

### Latest Features (2025-11)
- ✨ Enhanced focus mode with reader controls
- 🔤 Font size adjustment (4 levels)
- 📏 Line width control (3 options)
- ⬆️ Scroll to top floating button
- 📖 Improved focus mode icon
- 🎨 Gemini-style welcome card
- 🏷️ Interactive category filtering
- 🔍 Command palette search
- 🌐 Full bilingual support

---

**Built with ❤️ using Jekyll**

*A modern, minimalist blog for sharing thoughts on AI, development, and quantitative finance.*
