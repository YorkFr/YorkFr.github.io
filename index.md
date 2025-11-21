---
layout: default
title: 首页
---

<div class="bento-grid">
    <!-- Hero Section -->
    <div class="hero-card">
        <h1 class="hero-title" data-i18n="hero-greeting">Hi, I'm YorkFr.</h1>
        <p class="hero-desc" data-i18n="hero-desc">
            Exploring the intersection of 
            <span style="color: var(--primary-color);">Technology</span>, 
            <span style="color: #ea4335;">Design</span>, and 
            <span style="color: #34a853;">Growth</span>.
        </p>
    </div>

    <!-- Stats / Quick Info -->
    <div class="stats-card">
        <div class="avatar-large">Y</div>
        <div>
            <h3 style="margin: 0; font-size: 1.5rem;">YorkFr</h3>
            <p style="color: var(--text-secondary); margin: 5px 0;">Full Stack Developer</p>
            <div style="margin-top: 15px; display: flex; gap: 10px; justify-content: center;">
                <span style="background: var(--accent-1); padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; color: var(--primary-color);">Coding</span>
                <span style="background: var(--accent-3); padding: 5px 10px; border-radius: 20px; font-size: 0.8rem; color: #34a853;">Design</span>
            </div>
        </div>
    </div>
</div>

<div class="section-header">
    <h2 class="section-title" data-i18n="latest-articles">Latest Articles</h2>
    <a href="/archive" style="font-size: 0.95rem; font-weight: 600;" data-i18n="view-archive">View Archive →</a>
</div>

<div class="article-grid">
{% for post in site.posts limit:6 %}
    <article class="article-card">
        <div class="article-meta">
            {{ post.date | date: "%b %d, %Y" }} • {{ post.categories | first }}
        </div>
        <a href="{{ post.url }}" class="article-title">{{ post.title }}</a>
        <p class="article-excerpt">
            {{ post.excerpt | strip_html | truncate: 100 }}
        </p>
        <a href="{{ post.url }}" class="article-link" data-i18n="read-article">
            Read Article <span>→</span>
        </a>
    </article>
{% endfor %}
</div>
