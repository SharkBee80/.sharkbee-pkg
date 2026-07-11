## 关闭图形桌面（进入纯文本命令行）

1. 临时

```bash
sudo systemctl stop sddm
```

2. 永久

```bash
sudo systemctl set-default multi-user.target
```

## 开启图形桌面（从命令行返回图形化）

```bash
sudo systemctl start sddm
```

or

```bash
startx
```

```bash
sudo systemctl set-default graphical.target
```

## 切换

```bash
sudo systemctl isolate multi-user.target
```

or

```bash
sudo systemctl isolate graphical.target
```

## 获取当前运行状态

```bash
systemctl get-default
```
