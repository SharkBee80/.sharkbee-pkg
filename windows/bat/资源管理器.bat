@echo off
taskkill /f /im explorer.exe
start explorer.exe
timeout 5 > NUL