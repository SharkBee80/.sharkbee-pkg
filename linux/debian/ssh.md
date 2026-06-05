## 配置SSH密钥登录

### 生成SSH密钥对

- 在你的本地电脑上执行（不是VPS上）

```sh
# 生成Ed25519密钥（推荐，比RSA更安全更快）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 一路回车使用默认设置即可
```

### 将公钥上传到VPS

```sh
# 将公钥复制到VPS
ssh-copy-id -i ~/.ssh/id_ed25519.pub myuser@你的VPS_IP
```

### 如果 ssh-copy-id 不可用（如Windows用户），可以手动操作

```sh
# 在本地查看公钥内容
cat ~/.ssh/id_ed25519.pub

# 登录VPS后执行
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "粘贴公钥内容" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

### 测试密钥登录

```sh
# 用密钥登录测试
ssh myuser@你的VPS_IP

# 如果能正常登录，说明密钥配置成功
```

## 加固SSH配置

### 编辑SSH配置文件

```sh
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
sudo nano /etc/ssh/sshd_config
```

### 配置

```ini
# 修改默认端口（选择1024-65535之间的端口）
Port 2222

# 禁止root直接登录
PermitRootLogin no

# 禁止密码登录（确保密钥登录已经可用！）
PasswordAuthentication no
ChallengeResponseAuthentication no

# 禁止空密码
PermitEmptyPasswords no

# 限制最大尝试次数
MaxAuthTries 3

# 登录超时时间（秒）
LoginGraceTime 30

# 仅允许指定用户登录（可选）
AllowUsers myuser

# 禁用X11转发
X11Forwarding no

# 空闲超时断开（5分钟无操作断开）
ClientAliveInterval 300
ClientAliveCountMax 2
```

### 重启SSH服务使配置生效

```sh
sudo systemctl restart sshd
```
