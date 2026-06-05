## Fail2Ban防暴力破解

```sh
# 安装
sudo apt install -y fail2ban

# 创建本地配置文件
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

### 在 [DEFAULT] 部分修改

```ini
[DEFAULT]

# 封禁时间（秒），3600=1小时

bantime = 3600

# 检测时间窗口（秒）

findtime = 600

# 最大失败次数

maxretry = 3

[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600
```

### 启动Fail2Ban

```sh
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

### 常用管理命令

```sh
# 查看Fail2Ban状态
sudo fail2ban-client status

# 查看sshd jail状态（被封禁的IP数等）
sudo fail2ban-client status sshd

# 手动解封IP
sudo fail2ban-client set sshd unbanip 1.2.3.4
```
