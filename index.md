---
layout: default
title: 博客首页
---

## 欢迎！我是 YorkFr

这是一个关于 **[数学]** 和 **[个人成长]** 的极简博客。

---

### 最新文章

{% for post in site.posts limit: 5 %}
  <h3 style="margin-bottom: 5px;"><a href="{{ post.url | relative_url }}" style="text-decoration: none;">{{ post.title }}</a></h3>
  <small>{{ post.date | date: "%Y年%m月%d日" }}</small>
  
  <p>{{ post.excerpt | strip_html | truncatewords: 20 }}</p>
  <hr style="border-top: 1px dashed #eee;">
{% endfor %}

---

[我的 GitHub 主页](https://github.com/YorkFr)

---

> 人生就像一道数学题，过程比结果更重要。
