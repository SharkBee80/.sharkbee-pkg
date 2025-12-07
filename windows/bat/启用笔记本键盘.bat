::获取管理员权限运行cmd.exe
%1 mshta vbscript:CreateObject("Shell.Application").ShellExecute("cmd.exe","/c %~s0 ::","","runas",1)(window.close)&&exit
@echo off

cd /d "%~dp0"


start cmd /k"sc config i8042prt start= demand"