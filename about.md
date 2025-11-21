---
layout: default
title: About YorkFr
permalink: /about/
---

<div class="about-container">
    <div class="profile-header">
        <div class="profile-avatar">Y</div>
        <div class="profile-info">
            <h1>Hi, I'm YorkFr.</h1>
            <p class="profile-tagline">Developer / Designer / Lifelong Learner</p>
        </div>
    </div>

    <div class="about-content">
        <p>
            Welcome to my digital garden. I am a passionate developer who loves exploring the intersection of <strong>technology</strong> and <strong>design</strong>.
        </p>
        
        <p>
            I believe that code is not just about logic; it's about creating experiences that are intuitive and delightful. My journey started with simple scripts and has evolved into building full-stack applications and exploring complex systems like Linux/WSL.
        </p>

        <h3>What I Do</h3>
        <ul class="skill-list">
            <li>💻 <strong>Development:</strong> Web Technologies, Python, Linux/WSL</li>
            <li>🎨 <strong>Design:</strong> UI/UX, Minimalist Aesthetics, Material Design</li>
            <li>🚀 <strong>Growth:</strong> Writing, Knowledge Management, Productivity</li>
        </ul>

        <h3>Connect</h3>
        <p>
            I'm always open to interesting conversations and collaborations. You can find me on 
            <a href="https://github.com/YorkFr" target="_blank">GitHub</a>.
        </p>
    </div>
</div>

<style>
.about-container {
    background-color: var(--bg-surface);
    padding: 40px;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
    border: 1px solid var(--border-color);
}

.profile-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 40px;
    padding-bottom: 30px;
    border-bottom: 1px solid var(--border-light);
}

.profile-avatar {
    width: 80px;
    height: 80px;
    background-color: var(--primary-color);
    color: white;
    font-size: 40px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    box-shadow: var(--shadow-2);
}

.profile-info h1 {
    font-size: 2.2rem;
    margin-bottom: 8px;
}

.profile-tagline {
    font-size: 1.1rem;
    color: var(--text-secondary);
    font-weight: 400;
}

.about-content h3 {
    margin-top: 30px;
    font-size: 1.4rem;
    color: var(--text-primary);
}

.skill-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
}

.skill-list li {
    margin-bottom: 12px;
    padding: 12px 16px;
    background-color: var(--bg-surface-hover);
    border-radius: var(--radius-md);
    color: var(--text-secondary);
    font-size: 1rem;
}

.skill-list li strong {
    color: var(--text-primary);
    margin-right: 8px;
}
</style>
