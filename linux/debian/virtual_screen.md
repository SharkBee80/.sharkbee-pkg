# 虚拟屏幕 + 远程桌面

## [创建虚拟屏幕](https://ivonblog.com/posts/krfb-remote-desktop/)

1. 安装 krfb

```bash
sudo apt install krfb
```

2. 创建虚拟屏幕

```bash
krfb-virtualmonitor --resolution 1920x1080@30 --name "顯示器2" --password "8888" --port 5900
```

## 远程桌面

### [noVNC](https://ivonblog.com/posts/novnc-vnc-web-cient/)

1. 安装 noVNC

```bash
sudo apt install novnc
whereis novnc
# novnc: /usr/share/novnc
```

2. 启动 noVNC

```bash
/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 6080
```

### Deskreen

略
