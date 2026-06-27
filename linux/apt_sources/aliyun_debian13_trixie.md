# [https://mirrors.aliyun.com/debian/](https://developer.aliyun.com/mirror/debian)

## 下载

```bash
curl -fsSL https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/aliyun_debian13_trixie.sh | bash
```

or

```bash
wget -qO- https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/aliyun_debian13_trixie.sh | bash
```

or

```bash
bash <(curl -s https://raw.githubusercontent.com/SharkBee80/.sharkbee-pkg/refs/heads/main/linux/apt_sources/aliyun_debian13_trixie.sh)
```

## 运行

```bash
# 赋予脚本执行权限
chmod +x aliyun_debian13_trixie.sh

# 运行脚本
./aliyun_debian13_trixie.sh
```

## 镜像源

```ini
deb https://mirrors.aliyun.com/debian/ trixie main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie main contrib non-free non-free-firmware

deb https://mirrors.aliyun.com/debian/ trixie-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie-updates main contrib non-free non-free-firmware

deb https://mirrors.aliyun.com/debian/ trixie-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie-backports main contrib non-free non-free-firmware
```
