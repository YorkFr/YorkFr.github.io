---
layout: default
title: 文章归档
permalink: /archive/
---

<h1>Archive</h1>

<div class="archive-list">
  {% for post in site.posts %}
    <div class="archive-item">
      <span class="archive-date">{{ post.date | date: "%Y-%m-%d" }}</span>
      <a href="{{ post.url }}" class="archive-title">{{ post.title }}</a>
    </div>
  {% endfor %}
</div>

<style>
.archive-list {
    margin-top: 40px;
    border-left: 2px solid var(--border-color);
    padding-left: 20px;
}
.archive-item {
    margin-bottom: 20px;
    position: relative;
}
.archive-item::before {
    content: '';
    position: absolute;
    left: -25px;
    top: 8px;
    width: 8px;
    height: 8px;
    background-color: var(--bg-color);
    border: 2px solid var(--accent-primary);
    border-radius: 50%;
}
.archive-date {
    font-family: var(--font-mono);
    color: var(--text-muted);
    font-size: 0.9rem;
    margin-right: 15px;
}
.archive-title {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-main);
}
.archive-title:hover {
    color: var(--accent-primary);
}
</style>
