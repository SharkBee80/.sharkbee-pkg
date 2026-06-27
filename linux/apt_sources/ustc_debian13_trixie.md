# [http://mirrors.ustc.edu.cn/debian](https://mirrors.ustc.edu.cn/help/debian.html)

## 下载

```bash
curl -fsSL https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/ustc_debian13_trixie.sh | bash
```

or

```bash
wget -qO- https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/ustc_debian13_trixie.sh | bash
```

or

```bash
bash <(curl -s https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/ustc_debian13_trixie.sh)
```

## 运行

```bash
# 赋予脚本执行权限
chmod +x ustc_debian13_trixie.sh

# 运行脚本
./ustc_debian13_trixie.sh
```

## 镜像源

```ini
# 默认注释了源码仓库，如有需要可自行取消注释
deb http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware

deb http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware

# backports 软件源，请按需启用
deb http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
```
