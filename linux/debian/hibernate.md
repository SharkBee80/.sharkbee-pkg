## 休眠

### 用于休眠的 Swap 分区或文件的 UUID

```sh
sudo blkid | grep swap
```

### 配置内核引导参数 (GRUB)

```sh
sudo nano /etc/default/grub
```

- GRUB_CMDLINE_LINUX_DEFAULT 追加 resume=UUID=你的Swap分区UUID

```ini
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash resume=UUID=xxxx-xxxx"
```

### 更新引导程序和内存镜像

```sh
sudo update-grub
sudo update-initramfs -u -k all
```

```sh
sudo systemctl hibernate
```
