---
layout: default
title: 首页
---

<div class="hero-section">
    <h1 class="hero-title">Hello, I'm YorkFr.</h1>
    <p class="hero-desc">
        欢迎来到我的数字花园。这里汇聚了关于 
        <span style="color: var(--accent-primary)">数学</span>、
        <span style="color: var(--accent-secondary)">编程</span> 与 
        <span style="color: #fff">个人成长</span> 的深度思考。
    </p>
</div>

<h2 style="border-bottom: none; margin-bottom: 30px;">Latest Posts</h2>

<div class="post-list">
{% for post in site.posts %}
    <article class="post-item">
        <a href="{{ post.url }}" class="post-title-link">{{ post.title }}</a>
        <div class="post-meta">
            <span>{{ post.date | date: "%Y-%m-%d" }}</span>
            <span>·</span>
            <span>{{ post.content | strip_html | number_of_words }} words</span>
        </div>
        <p class="post-excerpt">
            {{ post.excerpt | strip_html | truncate: 120 }}
        </p>
        <a href="{{ post.url }}" class="read-more">Read Article</a>
    </article>
{% endfor %}
</div>
