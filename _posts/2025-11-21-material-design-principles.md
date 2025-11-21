---
layout: post
title: "Understanding Material Design 3 Principles"
date: 2025-11-21
categories: [Design]
author: YorkFr
---

Design is constantly evolving. We've moved from Skeuomorphism to Flat Design, and now to something more nuanced—**Material You**.

### 1. Personalization

Material Design 3 (MD3) is big on personalization. It's not just about a static color palette; it's about dynamic color extraction. While this static site uses a fixed palette, I've chosen colors that evoke that "dynamic" feel—using **Google Blue** (`#1a73e8`) as a primary anchor but allowing plenty of white space to breathe.

### 2. Elevation & Depth

In the old days, we used heavy drop shadows. Today, depth is subtle.

> "Elevation is the relative distance between two surfaces along the z-axis."

I've implemented this in my blog's card design:

*   **Resting state**: A very subtle border or shadow (`0 1px 2px rgba(0,0,0,0.1)`).
*   **Hover state**: The card physically lifts up (`transform: translateY(-2px)`) and the shadow deepens.

### 3. Accessible Shapes

You'll notice the **Pill-shaped** navigation links and **Rounded Corners** on images. These aren't just aesthetic choices; they are friendlier to the eye and touch-friendly on mobile devices.

Design isn't just about how it looks, but how it works.
