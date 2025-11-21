---
layout: default
title: 文章归档
permalink: /archive/
---

# 全部文章列表

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> 
      ({{ post.date | date: "%Y年%m月%d日" }})
    </li>
  {% endfor %}
</ul>
