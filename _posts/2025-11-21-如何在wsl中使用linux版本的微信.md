## 📄 WSLg (Ubuntu) 运行微信 Linux 版配置指南

本指南总结了在 Windows Subsystem for Linux (WSL 2) 环境下运行微信 Linux 版并解决图形界面和中文输入法问题的完整步骤。

### 📌 前提条件

- Windows 10/11（支持 WSLg）

- 已安装 WSL 2 (Ubuntu 或 Debian 发行版)

- 确保 `wsl --update` 已运行，WSLg 功能正常。

---

### 第一步：安装微信及依赖库

**1. 下载正确的版本：**

请前往微信 Linux 官方下载页，点击 **【X86 版】**，下载 **`.deb`** 文件（确保它不是 `arm64` 版本）。

**2. 安装应用和图形依赖：**

在 WSL 终端中，先安装应用，再安装运行时所需的底层图形库（这些库是为了解决运行时的 `libxkbcommon` 和 `libxcb` 报错）。

Bash

```
# 假设文件在 /mnt/c/Users/YourName/Downloads/WeChatLinux_amd64.deb
# 请将路径替换为你实际的下载路径和文件名
sudo apt update
sudo apt install ./WeChatLinux_amd64.deb -y

# 安装缺失的图形和音频依赖
# 解决 libxkbcommon-x11.so.0 和 libxcb-icccm.so.4 错误
sudo apt install -y fonts-noto-cjk libxkbcommon-x11-0 libgbm1 libnss3 libasound2 \
    libxcb-icccm4 libxcb-image0 libxcb-keysyms1 libxcb-randr0 libxcb-render-util0 libxcb-xinerama0 libxcb-shape0
```

---

### 第二步：安装和配置中文输入法 (Fcitx5)

由于 WSLg 不支持 Windows 的输入法，我们需要在 Linux 内部安装 Fcitx5。

**1. 安装 Fcitx5 引擎：**

Bash

```
sudo apt install -y fcitx5 fcitx5-chinese-addons fcitx5-config-qt dbus-x11 im-config
```

**2. 设置环境变量 (关键步骤)：**

将 Fcitx5 设置为 GTK/QT 应用的输入法模块，并将 **Wayland 禁用**以避免 WSLg 的权限错误。

复制以下所有行，粘贴到终端中并执行：

Bash

```
# 将配置写入 ~/.bashrc
cat <<EOF >> ~/.bashrc# --- Fcitx5 Input Method Configuration for WSLg ---export GTK_IM_MODULE=fcitxexport QT_IM_MODULE=fcitxexport XMODIFIERS=@im=fcitxexport INPUT_METHOD=fcitxexport FCITX_NO_WAYLAND=1  # 强制禁用 Wayland 模块，解决启动崩溃问题# ----------------------------------------------------EOF

# 使配置立即生效
source ~/.bashrc
```

---

### 第三步：初始化并启动输入法

**1. 运行配置工具添加拼音：**

Bash

```
fcitx5-configtool
```

- **操作：** 在弹出的窗口中，将右侧列表的 **Pinyin** 移动到左侧的 **Current Input Method** 列表。

**2. 强制系统设置 Fcitx5 为默认 (可选但推荐)：**

Bash

```
im-config -n fcitx5
```

*(如果没有弹出 GUI，说明已成功设置)*

---

### 第四步：一键启动脚本 (Run Script)

为了方便每次启动，可以直接在终端中按顺序执行以下命令：

Bash

```
# 启动 Fcitx5 后台进程 (已禁用 Wayland)
fcitx5 -d

# 启动微信应用
wechat
```

**使用说明：**

- 在微信聊天框内，按 **`Ctrl + Space` (空格)** 切换中英文输入法。

- 如果 Fcitx5 启动后有报错信息，只要没有出现 `Unloading addon` 的字样，一般可以忽略。

---

### 疑难解答 (FAQ)

| **问题现象**                | **解决方案**                                                  | **命令行/操作**                        |
| ----------------------- | --------------------------------------------------------- | --------------------------------- |
| **打不出中文**               | 1. 确认 Fcitx5 正在运行。2. 确认已通过 `fcitx5-configtool` 添加 Pinyin。 | `ps aux \| grep fcitx`            |
| **`permission denied`** | Fcitx5 试图使用 Wayland 协议。请确保 `$FCITX_NO_WAYLAND=1` 环境变量已设置。 | 检查 `~/.bashrc` 中的配置               |
| **界面出现方块字**             | 缺少中文字体。                                                   | `sudo apt install fonts-noto-cjk` |
| **程序关闭不了**              | 强制杀死进程。                                                   | `pkill wechat`                    |
