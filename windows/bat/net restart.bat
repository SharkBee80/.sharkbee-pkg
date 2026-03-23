chcp 65001

::获取管理员权限运行cmd.exe
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit

@echo off
setlocal enabledelayedexpansion

net stop winnat
net start winnat

timeout 2 > NUL
