为 GRUB 增加一个专门的“命令行模式”永久启动选项。

## 🛠️ 操作步骤

不要直接修改 /boot/grub/grub.cfg（因为升级内核后会被覆盖）。最规范的做法是修改 /etc/grub.d/40_custom 文件。

## 1. 复制现有的启动配置

首先，我们需要获取你当前系统的启动内核参数。打开终端，运行以下命令查看当前的 menuentry 配置：

```sh
awk -F"'" '/menuentry / {print $2}' /boot/grub/grub.cfg
```

(这会列出你当前的启动项名称，比如 "Debian GNU/Linux")

## 2. 编辑自定义配置文件

使用 root 权限打开自定义配置文件：

```sh
sudo nano /etc/grub.d/40_custom
```

## 3. 添加命令行启动项

在文件末尾，保留原有的前三行注释，

```sh
#!/bin/sh
exec tail -n +3 $0
# This file provides an easy way to add custom menu entries.  Simply type the
# menu entries you want to add after this comment.  Be careful not to change
# the 'exec tail' line above.
```

然后追加以下内容。

> 💡 快捷技巧：你可以直接复制 /boot/grub/grub.cfg 中第一个 menuentry 的完整内容，

```sh
menuentry 'Debian GNU/Linux' --class debian --class gnu-linux --class gnu --class os $menuentry_id_option 'gnulinux-simple-4aa8bd64-eeeb-4742-8d29-e0ae01e8e1f6' {
load_video
gfxmode $linux_gfx_mode
insmod gzio
if [ x$grub_platform = xxen ]; then insmod xzio; insmod lzopio; fi
insmod part_gpt
insmod ext2
search --no-floppy --fs-uuid --set=root 4aa8bd64-eeeb-4742-8d29-e0ae01e8e1f6
echo    'Loading Linux 6.12.107+deb13-amd64 ...'
linux   /boot/vmlinuz-6.12.107+deb13-amd64 root=UUID=4aa8bd64-eeeb-4742-8d29-e0ae01e8e1f6 roquiet splash resume=UUID=41fa6d80-5245-4481-94a4-ebd2c2d8a4ef
echo    'Loading initial ramdisk ...'
initrd  /boot/initrd.img-6.12.107+deb13-amd64
}
```

> 然后粘贴到这里，只需修改两处（如下方加粗部分所示）：

```sh
menuentry "Debian GNU/Linux (Command Line Mode - Latest Kernel)" --class debian --class gnu-linux --class gnu --class os {
load_video
gfxmode $linux_gfx_mode
insmod gzio
if [ x$grub_platform = xefi ]; then
insmod alloc
fi
insmod part_gpt
insmod ext2
search --no-floppy --fs-uuid --set=root 替换为你的UUID
linux /vmlinuz root=UUID=替换为你的UUID ro quiet splash systemd.unit=multi-user.target
initrd /initrd.img
}

```

⚠️ 关键修改说明：

- menuentry "Linux (Command Line Mode)"：这是你在 GRUB 菜单里会看到的名称，可以自定义。
- systemd.unit=multi-user.target：在 linux 这一行的末尾，空格并加上这个参数（或者直接写一个数字 3）。这就是告诉系统不要启动图形桌面的核心指令。
- 替换为你的UUID：请务必参考 /boot/grub/grub.cfg 中原本的 UUID，不要盲目复制上面的代码。

---

## 4. 更新 GRUB 使其生效

保存并退出文件后（Nano 编辑器按 Ctrl+O 回车，再按 Ctrl+X），必须运行更新命令：

- Ubuntu / Debian 系：

```sh
sudo update-grub
```

- CentOS / RHEL / Fedora 系：

```sh
sudo grub2-mkconfig -o /boot/grub2/grub.cfg
```

重启电脑后，你就会在 GRUB 菜单中看到一个名为 Linux (Command Line Mode) 的新选项，选中它即可一键进入纯命令行终端。

# other

## 获取启动参数

```sh
cat /proc/cmdline
```
