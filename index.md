---
layout: default
title: Dashboard
---

<div class="stream-feed">
    
    <!-- Status / Welcome Card -->
    <div class="stream-card" style="border-left: 4px solid var(--accent-primary);">
        <div class="card-title">Welcome back, System Online.</div>
        <p class="card-excerpt" style="margin-bottom: 0;">
            All systems nominal. You are viewing the <strong>v3.0 Dashboard</strong> interface. 
            Press <code style="color: var(--accent-primary)">Cmd+K</code> to access the command terminal.
        </p>
    </div>

    <!-- Post Stream -->
    {% for post in site.posts %}
    <article class="stream-card">
        <div class="card-meta">
            <i class="ph ph-calendar-blank"></i> {{ post.date | date: "%Y-%m-%d" }}
            <span style="color: var(--border-highlight)">|</span>
            <i class="ph ph-folder"></i> {{ post.categories | first }}
        </div>
        <a href="{{ post.url }}" class="card-title">{{ post.title }}</a>
        <p class="card-excerpt">
            {{ post.excerpt | strip_html | truncate: 140 }}
        </p>
        <div class="card-actions">
            <a href="{{ post.url }}" class="action-btn">
                Read Protocol <i class="ph ph-arrow-right"></i>
            </a>
            <span class="action-btn">
                <i class="ph ph-clock"></i> {{ post.content | number_of_words | divided_by: 180 | plus: 1 }} min read
            </span>
        </div>
    </article>
    {% endfor %}

</div>
