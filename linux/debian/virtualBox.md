## VirtualBox

### [下载](https://www.virtualbox.org/)

### 安装内核头文件并重新编译驱动

```sh
# sudo apt update
sudo apt install build-essential linux-headers-$(uname -r)
sudo /sbin/vboxconfig
```

### VT-x is being used by another hypervisor

1. 临时卸载 KVM 模块

```sh
# 检查当前有哪些 KVM 模块在运行
lsmod | grep kvm

# 强行卸载 KVM 模块
sudo rmmod kvm_intel
sudo rmmod kvm
```

2. 永久禁用 KVM 模块

```sh
sudo nano /etc/modprobe.d/blacklist-kvm.conf
```

```ini
blacklist kvm
blacklist kvm_intel
```
