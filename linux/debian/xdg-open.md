## xdg-open

[douyin.com](#xdg-open)----[bitbrowser://cc](#xdg-open)

### 创建虚假启动器

```sh
nano ~/.local/share/applications/block-bitbrowser.desktop
```

```ini
[Desktop Entry]
Type=Application
Name=BitBrowser Blocker
Exec=true
NoDisplay=true
MimeType=x-scheme-handler/bitbrowser;
```

### 注册成默认程序

```sh
xdg-mime default block-bitbrowser.desktop x-scheme-handler/bitbrowser
```

### 应用更改

```sh
update-desktop-database ~/.local/share/applications/
```
