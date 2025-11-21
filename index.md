---
layout: default
title: 首页
---

<div class="hero-section">
    <h1 class="hero-title">Hi, I'm YorkFr.</h1>
    <p class="hero-desc">
        Exploring the intersection of 
        <span style="color: var(--primary-color); font-weight: 500;">Technology</span>, 
        <span style="color: var(--accent-red); font-weight: 500;">Design</span>, and 
        <span style="color: var(--accent-green); font-weight: 500;">Growth</span>.
    </p>
</div>

<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
    <h2 style="margin: 0; font-size: 1.5rem;">Latest Articles</h2>
    <a href="/archive" style="font-size: 0.9rem; font-weight: 500;">View Archive →</a>
</div>

<div class="post-list">
{% for post in site.posts %}
    <article class="post-item">
        <div class="post-meta">
            <span>{{ post.date | date: "%b %d, %Y" }}</span>
            <span>•</span>
            <span>{{ post.categories | join: ", " }}</span>
        </div>
        <a href="{{ post.url }}" class="post-title-link">{{ post.title }}</a>
        <p class="post-excerpt">
            {{ post.excerpt | strip_html | truncate: 140 }}
        </p>
        <a href="{{ post.url }}" class="read-more">Read Article</a>
    </article>
{% endfor %}
</div>
