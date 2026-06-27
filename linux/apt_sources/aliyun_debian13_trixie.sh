#!/bin/bash

# ==============================================================================
# 脚本功能：Debian 13 (Trixie) 更换阿里源 (增加用户权限检测)
# ==============================================================================

# 定义输出颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # 无颜色

# 1. 检测当前用户权限及准备提权命令
SUDO_CMD=""
if [ "$(id -u)" -ne 0 ]; then
	echo -e "${YELLOW}当前不是 root 用户，正在检查 sudo 权限...${NC}"
	if command -v sudo >/dev/null 2>&1; then
		SUDO_CMD="sudo"
		echo -e "${GREEN}检测到 sudo，将使用 sudo 执行需要权限的命令。${NC}"
	else
		echo -e "${RED}错误：当前用户不是 root 且系统未安装 sudo。${NC}"
		echo -e "${YELLOW}请使用 'su -' 切换到 root 用户后再运行此脚本。${NC}"
		exit 1
	fi
fi

# 2. 写入阿里源配置到新文件
echo -e "${YELLOW}正在写入阿里源配置到 /etc/apt/sources.list.d/aliyun.list ...${NC}"
$SUDO_CMD tee /etc/apt/sources.list.d/aliyun.list <<'EOF'
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.aliyun.com/debian/ trixie main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie main contrib non-free non-free-firmware

deb https://mirrors.aliyun.com/debian/ trixie-updates main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie-updates main contrib non-free non-free-firmware

deb https://mirrors.aliyun.com/debian/ trixie-backports main contrib non-free non-free-firmware
# deb-src https://mirrors.aliyun.com/debian/ trixie-backports main contrib non-free non-free-firmware
EOF

# 3. 刷新软件源缓存
echo -e "${YELLOW}正在更新软件源缓存...${NC}"
$SUDO_CMD apt update

if [ $? -eq 0 ]; then
	echo -e "${GREEN}软件源更换成功并成功刷新缓存！${NC}"
else
	echo -e "${RED}软件源更新期间出现部分错误，请检查网络或配置。${NC}"
fi

read -p "按任意键继续..."
