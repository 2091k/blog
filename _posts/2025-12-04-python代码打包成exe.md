---
layout: post
title: "python代码打包成exe"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- python
- exe
---

## python代码打包成exe
### 1.以win7为例，已安装好py环境，win7py支持到3.8
### 2. 安装兼容版本
安装 PyInstaller 4.10（你之前用的是对的）和对应版本的 pyinstaller-hooks-contrib，版本不要太新：
```bash
pip install pyinstaller==4.10 pyinstaller-hooks-contrib==2021.2
```

### 3.在代码目录下放置以下文件：
- app.py（你的Python文件）
- logo.ico（图标文件）

执行打包命令（在命令行中）：
```bash
pyinstaller --onefile --windowed --icon=logo.ico --add-data "logo.ico;." app.py
```

### 4.第三步：验证打包结果
生成的exe文件会出现在 dist/ 目录

## 双击运行测试功能是否正常

### 虚拟环境
1.建立虚拟环境 激活环境
```python
py -m venv myvenv
myvenv\Scripts\activate.bat
```
2.安装 PyInstaller（如果未安装）
在激活的虚拟环境中安装 PyInstaller：
```python
pip install pyinstaller
```
3.执行打包命令
进入你的 Python 脚本（1.py）所在目录，执行打包命令（根据程序类型选择）：

如果是 GUI 程序（无控制台窗口）：
```python
pyinstaller --onefile --windowed 1.py
```
如果是命令行程序（需要控制台）：
```python
pyinstaller --onefile 1.py
```
如需要生成文件夹形式绿色文件：
```python
pyinstaller -w --noconsole 1.py
```

1. 打包结果
打包完成后，会在脚本所在目录生成 dist 文件夹，里面的 1.exe 就是可执行文件（可独立运行，无需依赖虚拟环境）。

py图形界面代码是tkinter

### 代码拓展
#### exe打开窗口添加logo通用代码
```python
import sys  # 1. 导入sys模块，用于获取临时目录
import os   # 2. 导入os模块，用于拼接路径
# 添加到其他self后面
self.icon_path = self.get_icon_path("logo.ico")  # 替换为你的图标文件名
self.root.iconbitmap(default=self.icon_path)  # 用动态路径设置窗口图标


    # self结束后 添加“获取图标路径”的方法
    def get_icon_path(self, icon_filename):
        """动态获取图标路径：单文件模式用临时目录，文件夹模式用当前目录"""
        if hasattr(sys, "_MEIPASS"):
            # 单文件模式：图标在临时目录（sys._MEIPASS指向临时目录）
            return os.path.join(sys._MEIPASS, icon_filename)
        else:
            # 文件夹模式/直接运行代码：图标在当前目录
            return os.path.join(os.path.dirname(__file__), icon_filename)
```