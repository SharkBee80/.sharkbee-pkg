## 安装 KDE Plasma

### 1. 安装 KDE Plasma

先更新软件包：

```bash
sudo apt update
sudo apt upgrade
```

安装 KDE 桌面：

```bash
sudo apt install task-kde-desktop
```

~~如果想安装完整 KDE 软件生态：~~

```bash
# sudo apt install kde-full
```

它会安装 Debian 官方推荐的 KDE Plasma 环境，而不会装过多附加软件。

---

### 2. 选择显示管理器（重要）

安装过程中会询问使用哪个登录管理器：

- `sddm`（KDE 官方推荐）
- `lightdm`（XFCE 常用）
- `gdm3`（GNOME 常用）

推荐选择：

```text
sddm
```

如果错过了选择界面，可以重新配置：

```bash
sudo dpkg-reconfigure sddm
```

或者：

```bash
sudo dpkg-reconfigure lightdm
```

---

### 3. 重启系统

```bash
sudo reboot
```

---

### 4. 登录 KDE

在登录界面：

- 点击用户名
- 找到「Session」或齿轮图标
- 选择：

```text
Plasma (Wayland)
```

或

```text
Plasma (X11)
```

然后登录。

如果显卡驱动正常（Intel、AMD、新版 NVIDIA），优先选择 Wayland。

---

### 5. 确认当前桌面

登录后执行：

```bash
echo $XDG_CURRENT_DESKTOP
```

应显示类似：

```text
KDE
```

或者：

```text
KDE:Plasma
```

## 删除 xfce

确认 KDE 使用正常后，可以卸载 XFCE：

### 1. 删除 XFCE 任务包

```bash
apt list --installed | grep task-xfce
```

如果有：

```bash
sudo apt purge task-xfce-desktop
```

---

### 2. 删除 XFCE 相关组件

查看系统中的 XFCE 软件：

```bash
dpkg -l | grep xfce
```

批量删除：

```bash
sudo apt purge 'xfce4*'
```

如果安装过 XFCE 的额外组件：

```bash
sudo apt purge 'xfce4-*'
```

删除 XFCE 的设置服务：

```bash
sudo apt purge xfconf
```

### 3. 删除 LightDM（如果已改用 SDDM）

先确认当前显示管理器：

```bash
cat /etc/X11/default-display-manager
```

如果输出类似：

```text
/usr/bin/sddm
```

说明已经切换到 SDDM，可以删除 LightDM：

```bash
sudo apt purge lightdm lightdm-gtk-greeter
```

---

### 4. 自动清理无用依赖

```bash
sudo apt autoremove --purge
```

查看会删除哪些包：

```bash
sudo apt autoremove --purge --dry-run
```

建议先执行一次 `--dry-run` 检查。

---

### 5. 删除用户 XFCE 配置（可选）

只影响当前用户配置：

```bash
rm -rf ~/.config/xfce4
rm -rf ~/.cache/sessions
rm -rf ~/.config/Thunar
```

如果保留以备后用，可以不删。

---

### 6. 检查是否还有 XFCE 包

```bash
dpkg -l | grep xfce
```

或者：

```bash
apt list --installed | grep xfce
```

如果没有输出，说明 XFCE 主体已经移除。

若还有残留：

```bash
sudo apt purge $(dpkg -l | awk '/^ii/ && /xfce|xfwm|xfconf|thunar|garcon|exo/ {print $2}')
```

最后：

```bash
sudo apt autoremove --purge
sudo apt clean
```

清理完成后可验证：

```bash
dpkg -l | grep -Ei 'xfce|xfwm|xfconf|thunar|garcon|exo|lightdm'
```

> [!note]
> 注意：

- 如果你不确定哪些软件依赖 XFCE，不建议立刻删除。
- KDE 和 XFCE 可以共存，占用的主要是磁盘空间。
