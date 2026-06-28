# 创建/初始化

## 创建普通用户并授予sudo权限

```sh
# 创建新用户
adduser user

# 将用户加入sudo组（Debian/Ubuntu）
usermod -aG sudo user

# 验证sudo权限
su - user
sudo whoami
# 输出 root 说明权限配置成功
```

## [更换国内镜像源](mirrors.md)

## 安装常用基础工具

```sh
apt install curl wget git net-tools btop ufw fail2ban sudo
```

```sh
# gui
apt install gdebi
```

## [配置 ssh ](ssh.md)

## [开启 UFW 防火墙](firewall.md)

## [配置 Fail2Ban 防暴力破解](fail2ban.md)

## [开启自动安全更新](unattended-upgrades.md)

## 内核安全加固

### 编辑

```sh
sudo nano /etc/sysctl.conf
```

```ini
# 防止IP欺骗
net.ipv4.conf.all.rp_filter = 1
net.ipv4.conf.default.rp_filter = 1

# 禁用源路由
net.ipv4.conf.all.accept_source_route = 0
net.ipv6.conf.all.accept_source_route = 0

# 忽略ICMP重定向
net.ipv4.conf.all.accept_redirects = 0
net.ipv6.conf.all.accept_redirects = 0

# 启用SYN洪水防护
net.ipv4.tcp_syncookies = 1
net.ipv4.tcp_max_syn_backlog = 2048
net.ipv4.tcp_synack_retries = 2

# 忽略广播ping
net.ipv4.icmp_echo_ignore_broadcasts = 1

# 记录异常数据包
net.ipv4.conf.all.log_martians = 1

# 限制内核指针泄露
kernel.kptr_restrict = 2

# 限制dmesg访问
kernel.dmesg_restrict = 1
```

### 应用配置

```sh
sudo sysctl -p
```
