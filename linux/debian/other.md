# 其他

## 将 Linux 家目录（如“文档”、“下载”）设置为英文，最快的方法是在终端临时将系统语言更改为英文，然后更新目录名称

```sh
export LANG=en_US
xdg-user-dirs-gtk-update
```

## 双系统时间，rtc

```sh
timedatectl set-local-rtc 1
```

## 修改设备名字

```sh
hostnamectl set-hostname <名字>
nano /etc/hosts
`
127.0.1.1   <名字>
`
cat /etc/hostname
```

## 终端编辑器

```sh
select-editor
```

## GUI-自启动

```sh
cd ~/.config/autostart # /home/<user>/.config/autostart
nano myapp.desktop
```

## xfce桌面配置文件

```sh
xfce4-panel-profiles
```

## DNS

### 使用 systemd-resolved 托管

#### 编辑配置文件

```sh
sudo nano /etc/systemd/resolved.conf
```

#### 修改或添加 DNS 行

```ini
[Resolve]
DNS=8.8.8.8 1.1.1.1
```

#### 重启并开机自启服务

```sh
sudo systemctl restart systemd-resolved
sudo systemctl enable systemd-resolved
```

#### 验证

```sh
cat /etc/resolv.conf
```

## 移动到工作区

```sh
sudo apt install wmctrl
sh -c "/usr/bin/v2rayn & sleep 1 && wmctrl -r v2rayN -t 1"  # 逻辑：后台启动程序 -> 稍微等待它加载窗口 -> 强制将包含 "v2ray" 名字的窗口移至工作区 2 (索引1)
```

## 显示桌面

```sh
wmctrl -m | grep -q "mode: ON" && wmctrl -k off || wmctrl -k on
```

## 音量控制

```sh
sudo apt install pamixer
```

## CPU 调频器

```sh
# CLI
sudo apt install linux-cpupower
```

```sh
# GUI
sudo apt install cpupower-gui # https://github.com/vagnum08/cpupower-gui
```

## bitcomet

```sh
/usr/bin/BitComet: error while loading shared libraries: libwebkit2gtk-4.0.so.37: cannot open shared object file: No such file or directory
```

#### 软链接欺骗

```sh
sudo ln -sf /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.1.so.0 /usr/lib/x86_64-linux-gnu/libwebkit2gtk-4.0.so.37
sudo ln -sf /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.1.so.0 /usr/lib/x86_64-linux-gnu/libjavascriptcoregtk-4.0.so.18
```

## [GRUB](grub.md)

## [新建swap 内存交换分区](swap.md)

## [休眠](hibernate.md)

## [xdg-open](xdg-open.md)

## 内存压力测试

```sh
# 使用 stress 工具模拟消耗 4G 内存（需先通过 apt 或 yum 安装 stress）
stress --vm 1 --vm-bytes 16G --timeout 30s
```

## xfce 显示管理器

### 桌面环境 x11/wayland

```sh
echo $XDG_SESSION_TYPE
```

## 监控无线网络的终端可视化工具

```sh
sudo apt install wavemon
```

## Num Lock

```sh
sudo apt install numlockx
sudo nano /etc/default/numlockx
# NUMLOCK=auto => NUMLOCK=on
```

SDDM (KDE / LXQt)

```sh
# sudo nano /etc/sddm.conf
sudo nano /etc/sddm.conf.d/kde_settings.conf
```

```ini
[General]
Numlock=on
```

SDDM (wayland)

```sh
sudo nano /var/lib/sddm/.config/kcminputrc
```

```ini
[Keyboard]
NumLock=0
```

```sh
chown -R sddm:sddm /var/lib/sddm/.config/kcminputrc
```

## 清理

```sh
# gui
sudo apt install bleachbit
```
