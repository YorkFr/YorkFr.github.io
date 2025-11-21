---
layout: default
title: 首页
---

## 👋 你好，我是 YorkFr

这里是我的数字花园。我在这里分享关于 **数学**、**编程** 和 **个人成长** 的思考。

---

### 📂 最新文章

{% for post in site.posts %}

### [{{ post.title }}]({{ post.url }})

<small>{{ post.date | date: "%Y年%m月%d日" }}</small>

{{ post.excerpt | strip_html | truncate: 80 }}

[阅读全文 →]({{ post.url }})

---
{% endfor %}
