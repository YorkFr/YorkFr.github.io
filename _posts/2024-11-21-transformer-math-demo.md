---
layout: post
title: "A Quick Math Check for Transformer Training"
date: 2024-11-21
categories: [AI, Math]
---

这篇短文主要用来测试行内公式与行间公式的渲染效果，并顺带记录一次小实验。

行内公式示例：变换层的输出为 $y = \sigma(Wx + b)$，其中 $\sigma$ 为 GELU。

行间公式示例：交叉熵损失（带可选标签平滑）：

$$
\mathcal{L} = - \sum_{i=1}^{C} \left[(1-\epsilon)\, y_i \log p_i + \epsilon \frac{1}{C} \log p_i \right]
$$

其中 $C$ 为类别数，$\epsilon$ 为平滑系数，$y_i$ 为真实分布，$p_i$ 为模型输出分布。

另一个行间公式，演示求平均注意力熵：

$$
H_{\text{attn}} = - \frac{1}{N} \sum_{n=1}^{N} \sum_{t=1}^{T} a_{n,t} \log a_{n,t}
$$

这里 $a_{n,t}$ 是第 $n$ 个头在位置 $t$ 的注意力权重，$N$ 是头数，$T$ 是序列长度。

最后再来一个行内组合：更新步骤 $ \theta_{t+1} = \theta_{t} - \eta \nabla_{\theta} \mathcal{L} $。

如果这些公式在页面上显示正常，说明当前 Markdown + 渲染配置兼容行内与行间数学公式。
