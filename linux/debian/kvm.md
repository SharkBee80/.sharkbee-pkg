## KVM/QEMU 虚拟机

### 检查虚拟化支持

```bash
lscpu | grep Virtualization
egrep -c '(vmx|svm)' /proc/cpuinfo
```

### 安装必要组件

```bash
sudo apt install virt-manager qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst
    # virt-manager 图形化虚拟机管理工具
    # qemu-kvm 仿真器,模拟cpu、内存、磁盘
    # libvirt-daemon-system  守护进程
    # libvirt-clients  客户端工具集
    # bridge-utils  网络桥接
    # virtinst 命令行安装工具
```

### 验证安装

```bash
virt-manager --version && qemu-system-x86_64 --version && virsh --version
```

### 服务管理

```bash
# 启用并启动服务
sudo systemctl enable --now libvirtd

# 检查服务状态
sudo systemctl status libvirtd
```

### 用户权限配置

```bash
# 添加用户组
sudo adduser $USER libvirt
sudo adduser $USER kvm

# 立即生效
newgrp libvirt
newgrp kvm

# 验证组
groups
```

### 网络配置（可选）

```bash
# 启动默认网络
sudo virsh net-start default

# 设置开机自启
sudo virsh net-autostart default

# 检查网络状态
sudo virsh net-list --all
```

### 安装额外工具

```bash
sudo apt install -y ovmf virt-viewer
# virt-viewer 虚拟机图形化控制
# ovmf 启动引导程序
```

### 创建虚拟机

1. 创建虚拟机
2. 配置虚拟机
   1. UEFI
   2. 复制主机 cpu 配置 host-passthrough
   3. 内存分配
   4. 引导，启用iso,配置优先级
   5. 移除设备：数位板
   6. 显示驱动：virtio
   7. VirtIO 磁盘

### 剪贴板

1. 宿主机
   添加硬件-> 通道-> org.spice-space.blood.0
2. 虚拟机

```bash
sudo apt install spice-vdagent qemu-guest-agent
sudo systemctl enable --now spice-vdagent
sudo systemctl enable --now qemu-guest-agent
```

## [Windows 安装参考](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers)
