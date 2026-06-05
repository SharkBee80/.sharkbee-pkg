## 开启自动安全更新

```sh
# 安装自动更新工具
sudo apt install -y unattended-upgrades

# 启用自动更新
sudo dpkg-reconfigure -plow unattended-upgrades
# 选择 Yes

# 编辑配置（可选）
sudo nano /etc/apt/apt.conf.d/50unattended-upgrades
```

```ini
Unattended-Upgrade::Remove-Unused-Kernel-Packages "true";
Unattended-Upgrade::Remove-New-Unused-Dependencies "true";
Unattended-Upgrade::Remove-Unused-Dependencies "true";
# 不要自动重启（避免服务中断）
Unattended-Upgrade::Automatic-Reboot "false";
```

## 手动更新系统

```sh
sudo apt update && sudo apt upgrade -y
```
