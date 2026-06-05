## 国内镜像源

### 备份原配置文件

```sh
cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

### 编辑配置文件

```sh
nano /etc/apt/sources.list
```

### 更新软件源缓存与系统软件

```sh
apt update && apt upgrade -y
```

## 镜像站

0. [https://mirrors.tuna.tsinghua.edu.cn/debian/](https://mirrors.tuna.tsinghua.edu.cn/help/debian)

1. [https://mirrors.aliyun.com/debian/](https://developer.aliyun.com/mirror/debian)

2. [http://mirrors.ustc.edu.cn/debian](https://mirrors.ustc.edu.cn/)

### 镜像源

```sh
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

```sh
deb https://mirrors.aliyun.com/debian/ trixie main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie main contrib non-free non-free-firmware

deb https://mirrors.aliyun.com/debian/ trixie-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie-updates main contrib non-free non-free-firmware

deb https://mirrors.aliyun.com/debian/ trixie-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie-backports main contrib non-free non-free-firmware
```

```sh
# 默认注释了源码仓库，如有需要可自行取消注释
deb http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie main contrib non-free non-free-firmware
deb http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware
# deb-src http://mirrors.ustc.edu.cn/debian trixie-updates main contrib non-free non-free-firmware
# backports 软件源，请按需启用
deb http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
deb-src http://mirrors.ustc.edu.cn/debian trixie-backports main contrib non-free non-free-firmware
```
