---
layout: post
title: "BarTender设置默认打开方式"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- BT
- 打印
---


有的电脑默认打开方式无法修改
1. 采用修改注册表方法，指定软件路径作为默认打开程序
2. 修改注册表内程序路径后保存导入注册表
3. 重启资源管理器生效

## 注册表reg完整代码
```reg
Windows Registry Editor Version 5.00

; ====================== 只需要修改这里的路径 ======================
; 把下面双引号里的路径改成你电脑上 bartend.exe 的真实路径
; 只改这一行！其他全部自动套用
#define BARTENDER_PATH "C:\Program Files\Seagull\BarTender 2019\bartend.exe"
; ==================================================================

; 删除锁定的UserChoice（解决无法修改默认打开方式问题）
[-HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\FileExts\.btw\UserChoice]

; 关联.btw文件后缀
[HKEY_CLASSES_ROOT\.btw]
@="Bartender.Document"

; 设置默认打开程序（自动使用上方定义的路径）
[HKEY_CLASSES_ROOT\Bartender.Document\shell\open\command]
@=strreplace("%BARTENDER_PATH%", "\", "\\") "%1"

; 注册到系统打开方式列表（自动使用上方定义的路径）
[HKEY_CLASSES_ROOT\Applications\bartend.exe\shell\open\command]
@=strreplace("%BARTENDER_PATH%", "\", "\\") "%1"
```

## 重启资源管理器命令
按下 Win+R 输入 cmd 执行下面命令：
```cmd
taskkill /f /im explorer.exe && start explorer.exe
```

### 操作流程
1. 新建文本文档，粘贴上面注册表代码
2. 修改 `BARTENDER_PATH` 为你本地bartend.exe真实安装路径
3. 另存为，编码ANSI，文件名：BT默认打开.reg
4. 双击reg文件导入注册表
5. 打开CMD执行重启资源管理器命令即可生效