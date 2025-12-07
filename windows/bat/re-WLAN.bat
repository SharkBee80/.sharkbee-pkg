chcp 65001

::获取管理员权限运行cmd.exe
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit

@echo off
setlocal enabledelayedexpansion

REM ========= 配置区域 =========
set SSID=gdut
set PASSWORD=
set INTERFACE=WLAN
REM ===========================

netsh interface show interface

echo [1/4] 关闭 WiFi 网卡...
netsh interface set interface name="%INTERFACE%" admin=disable
timeout /t 3 >nul

echo [2/4] 打开 WiFi 网卡...
netsh interface set interface name="%INTERFACE%" admin=enable
timeout /t 3 >nul

echo [3/4] 检查是否已有配置...
netsh wlan show profiles | findstr /i "%SSID%" >nul
if %errorlevel%==0 (
    echo 已存在配置，尝试连接 %SSID% ...
    netsh wlan connect name="%SSID%" ssid="%SSID%" interface="%INTERFACE%"
) else (
    echo 没有配置，创建临时配置文件...
    >temp_wifi.xml echo ^<?xml version="1.0"?^>
    >>temp_wifi.xml echo ^<WLANProfile xmlns="http://www.microsoft.com/networking/WLAN/profile/v1"^>
    >>temp_wifi.xml echo   ^<name^>%SSID%^</name^>
    >>temp_wifi.xml echo   ^<SSIDConfig^>
    >>temp_wifi.xml echo     ^<SSID^>
    >>temp_wifi.xml echo       ^<name^>%SSID%^</name^>
    >>temp_wifi.xml echo     ^</SSID^>
    >>temp_wifi.xml echo   ^</SSIDConfig^>
    >>temp_wifi.xml echo   ^<connectionType^>ESS^</connectionType^>
    >>temp_wifi.xml echo   ^<connectionMode^>manual^</connectionMode^>
    >>temp_wifi.xml echo   ^<MSM^>
    >>temp_wifi.xml echo     ^<security^>
    >>temp_wifi.xml echo       ^<authEncryption^>
    >>temp_wifi.xml echo         ^<authentication^>WPA2PSK^</authentication^>
    >>temp_wifi.xml echo         ^<encryption^>AES^</encryption^>
    >>temp_wifi.xml echo         ^<useOneX^>false^</useOneX^>
    >>temp_wifi.xml echo       ^</authEncryption^>
    >>temp_wifi.xml echo       ^<sharedKey^>
    >>temp_wifi.xml echo         ^<keyType^>passPhrase^</keyType^>
    >>temp_wifi.xml echo         ^<protected^>false^</protected^>
    >>temp_wifi.xml echo         ^<keyMaterial^>%PASSWORD%^</keyMaterial^>
    >>temp_wifi.xml echo       ^</sharedKey^>
    >>temp_wifi.xml echo     ^</security^>
    >>temp_wifi.xml echo   ^</MSM^>
    >>temp_wifi.xml echo ^</WLANProfile^>

    netsh wlan add profile filename="temp_wifi.xml" interface="%INTERFACE%" >nul
    del temp_wifi.xml

    echo 正在连接 %SSID% ...
    netsh wlan connect name="%SSID%" ssid="%SSID%" interface="%INTERFACE%"
)

echo [4/4] 完成！
timeout /t 3 >nul
