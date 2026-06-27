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

2. [http://mirrors.ustc.edu.cn/debian](https://mirrors.ustc.edu.cn/help/debian.html)

### [镜像源](../apt_sources/)
