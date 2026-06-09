要隐藏 Debian 13 (Trixie) 开机时的终端加载文本（内核日志）并显示纯净的动画开机画面，你需要开启 Plymouth 引导画面并修改 GRUB 配置文件。
以下是具体的操作步骤：

## 1. 安装 Plymouth 动画主题

首先需要安装控制开机动画的工具和主题包。打开终端并执行：

```sh
sudo apt update
sudo apt install plymouth plymouth-themes
```

## 2. 修改 GRUB 配置文件

你需要隐藏内核的输出日志，并启用图形界面引导。

- 使用文本编辑器打开 GRUB 配置文件：

```sh
sudo nano /etc/default/grub
```

- 找到以 GRUB_CMDLINE_LINUX_DEFAULT 开头的那一行，将其修改为：

```sh
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"
```

(注：quiet 用于隐藏绝大部分终端加载文本，splash 用于开启开机动画。)

- 保存并退出（在 Nano 编辑器中，按 Ctrl + O 保存，按 Enter 确认，再按 Ctrl + X 退出）。

## 3. 选择并应用开机动画主题

- 使用以下命令获得已安装的主题列表：

```sh
plymouth-set-default-theme -l
```

或是通过：

```sh
ls /usr/share/plymouth/themes
```

- 设置你喜欢的 Plymouth 主题（例如 Debian 默认的类主题）：

```sh
sudo plymouth-set-default-theme -R bgrt
```

或者

```sh
nano /etc/plymouth/plymouthd.conf
```

(注：-R 参数会自动为你更新 initramfs 引导文件。bgrt 主题会直接读取你电脑主板的 OEM Logo，如果你想要其他主题，可以使用 fade-in 或 spinner。)

## 4. 更新 GRUB 配置

最后，让系统重新生成引导菜单配置：

```sh
sudo update-grub
```
