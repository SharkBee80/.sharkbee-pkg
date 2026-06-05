## GRUB

### 打开配置文件

```sh
sudo nano /etc/default/grub
```

### 修改配置文件

```
GRUB_TIMEOUT=10
```

### 保存并生效

```sh
sudo update-grub
```
