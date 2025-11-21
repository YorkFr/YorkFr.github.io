# YorkFr's Personal Blog

A minimalist, modern personal blog built with Jekyll, featuring a Google AI-inspired design aesthetic.

## 🎨 Design Philosophy

- **Material Design 3** inspired interface
- **Gemini-style** gradient accents
- Clean, minimalist layout with focus on readability
- Responsive design for all devices
- Dark/Light theme toggle

## ✨ Features

### Core Functionality
- 🌓 **Theme Toggle** - Seamless dark/light mode switching
- 🌍 **Bilingual Support** - English/Chinese (中英文)
- 🔍 **Search** - Command palette with `Ctrl/Cmd+K` shortcut
- 🏷️ **Category Filtering** - Click category tags to filter posts
- ⏰ **Live Clock** - Real-time display in sidebar
- 📖 **Focus Mode** - Distraction-free reading experience

### Technical Features
- Syntax highlighting with Mac-style code blocks
- One-click code copying
- Responsive three-column layout
- Optimized for GitHub Pages
- SEO-friendly structure

## 🛠️ Tech Stack

- **Framework**: Jekyll 4.x
- **Styling**: Vanilla CSS with CSS Variables
- **Icons**: Phosphor Icons
- **Fonts**: Google Fonts (Outfit, JetBrains Mono)
- **Hosting**: GitHub Pages

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
├── _posts/            # Blog posts
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
│   │   └── gemini-card.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── _config.yml
├── index.html
└── search-data.json
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

## 🎨 Customization

### Theme Colors

Edit `assets/css/0-theme.css` to customize colors:

```css
:root {
    --accent-primary: #1a73e8;
    --accent-secondary: #8430ce;
    /* ... */
}
```

### Adding New Pages

1. Create HTML file in `pages/` directory
2. Add frontmatter with `permalink`:

```yaml
---
layout: default
title: Your Page
permalink: /your-page/
---
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

## 🌟 Key Features Explained

### Search Functionality
- Press `Ctrl/Cmd+K` to open search palette
- Real-time filtering across titles, excerpts, and categories
- Keyboard navigation with arrow keys

### Category Filtering
- Click any category tag in the sidebar
- Posts are filtered instantly
- Click again to show all posts

### Focus Mode
- Click the focus icon in article pages
- Hides sidebar and widgets for distraction-free reading
- Press again to restore normal view

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**YorkFr**
- AI Researcher / Developer / Quant
- GitHub: [@YorkFr](https://github.com/YorkFr)

## 🙏 Acknowledgments

- Design inspired by Google's Material Design 3 and Gemini AI
- Icons by [Phosphor Icons](https://phosphoricons.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

Built with ❤️ using Jekyll
