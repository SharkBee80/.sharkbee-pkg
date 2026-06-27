# [https://mirrors.tuna.tsinghua.edu.cn/debian/](https://mirrors.tuna.tsinghua.edu.cn/help/debian)

## 下载

```bash
curl -fsSL https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/tsinghua_debian13_trixie.sh | bash
```

or

```bash
wget -qO- https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/tsinghua_debian13_trixie.sh | bash
```

or

```bash
bash <(curl -s https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/tsinghua_debian13_trixie.sh)
```

## 运行

```bash
# 赋予脚本执行权限
chmod +x tsinghua_debian13_trixie.sh

# 运行脚本
./tsinghua_debian13_trixie.sh
```

## 镜像源

```ini
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-updates main contrib non-free non-free-firmware

deb https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.tuna.tsinghua.edu.cn/debian/ trixie-backports main contrib non-free non-free-firmware

# 以下安全更新软件源为官方源配置
deb https://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
# deb-src https://security.debian.org/debian-security trixie-security main contrib non-free non-free-firmware
```
