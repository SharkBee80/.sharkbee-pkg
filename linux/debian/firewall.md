## 安装配置防火墙

```sh
# 安装UFW
sudo apt install ufw -y
```

```sh
# 设置默认策略：拒绝入站，允许出站
sudo ufw default deny incoming
sudo ufw default allow outgoing

# 允许SSH端口（务必先开放SSH端口再启用防火墙！）
sudo ufw allow 2222/tcp comment 'SSH'

# 允许HTTP和HTTPS（如果需要建站）
sudo ufw allow 80/tcp comment 'HTTP'
sudo ufw allow 443/tcp comment 'HTTPS'

# 启用防火墙
sudo ufw enable

# 查看状态
sudo ufw status verbose
```

### 常用UFW命令

```sh
# 允许特定端口
sudo ufw allow 8080/tcp

# 允许特定IP访问
sudo ufw allow from 192.168.1.100

# 删除规则
sudo ufw delete allow 8080/tcp

# 重置所有规则
sudo ufw reset
```
