## 新建swap 内存交换分区

- 可选工具 `GParted`

**假设你有一个空闲分区 /dev/sdb2**

### 格式化分区

```sh
sudo mkswap /dev/sdb2
```

### 启用

```sh
sudo swapon /dev/sdb2
sudo swapon --show
```

### 获取UUID

```sh
sudo blkid /dev/sdb2
```

### 写入 fstab

#### 编辑：

```sh
sudo nano /etc/fstab
```

#### 写入:

```ini
UUID=12345678-xxxx-xxxx-xxxx-123456789abc none swap sw 0 0
```

#### 测试：

```sh
sudo mount -a
```

---

## 调整 Swap 使用倾向（可选）

### 查看当前值：

```sh
cat /proc/sys/vm/swappiness
```

- 通常默认 `60`.

### 如果内存较大（16GB+），可改为：

```sh
sudo sysctl vm.swappiness=10
```

### 永久生效：

```sh
sudo nano /etc/sysctl.conf
```

#### 添加：

```ini
vm.swappiness=10
```

#### 应用：

```sh
sudo sysctl -p
```
