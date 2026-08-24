---
layout: post
title: "Windows 使用 Cloudflare Tunnel（cloudflared）内网穿透"
subtitle: ""
author: "每天要好心情哦，我的朋友"
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- Cloudflare
- Windows
- 内网穿透
---

> 前置条件
1. 域名托管在 Cloudflare（NS记录已经生效，域名状态Active）
2. Windows 内网机器，不需要公网IP；需要暴露的本地服务（例如 `http://127.0.0.1:8080`）
3. 免费 Zero‑Trust 账号（无需信用卡）

> 两种模式：
- **本地管理隧道（命令行创建，推荐，下面教程）**：全部在Windows cmd/powershell操作
- **Dashboard管理隧道**：网页后台创建隧道，复制token到Windows运行客户端

## 一、安装 cloudflared（Windows）
### 方式1 winget（Win10/11，最简单）
以管理员打开PowerShell
```powershell
winget install -e --id Cloudflare.cloudflared
```
安装完成**新开一个终端窗口**，验证：
```powershell
cloudflared --version
```
输出版本号即成功

### 方式2 手动下载exe
下载：https://github.com/cloudflare/cloudflared/releases
下载 `cloudflared‑windows‑amd64.exe`，放到 `C:\Windows\System32`，重命名为 `cloudflared.exe`

## 二、登录授权Cloudflare账号
```powershell
cloudflared tunnel login
```
会自动打开浏览器，登录Cloudflare账号，**选择你的域名授权**。
授权完成后，会在用户目录生成证书：
`C:\Users\你的用户名\.cloudflared\cert.pem`
> 不要删除这个文件，用于创建隧道

## 三、创建隧道
自定义隧道名字，示例名字 `win‑tunnel`
```powershell
cloudflared tunnel create win‑tunnel
```
执行成功输出类似：
```
Created tunnel win‑tunnel with id: xxxxxxxx‑xxxx‑xxxx‑xxxx‑xxxxxxxxxxxx
Created credentials file at C:\Users\你的用户名\.cloudflared\xxxxxxxx‑xxxx‑xxxx‑xxxx‑xxxxxxxxxxxx.json
```
**记下隧道UUID，以及json凭证文件路径，后面配置要用**

## 四、编写配置文件 config.yml
进入目录 `C:\Users\你的用户名\.cloudflared\`
新建文本文件，改名 `config.yml`（**把后缀 .txt 改成 .yml**），粘贴下面内容：
```yaml
tunnel: win‑tunnel
credentials-file: C:\Users\你的用户名\.cloudflared\xxxxxxxx‑xxxx‑xxxx‑xxxx‑xxxxxxxxxxxx.json

ingress:
  # 外网域名映射本地内网服务，示例：web.mydomain.com 访问本机8080
  - hostname: web.mydomain.com
    service: http://127.0.0.1:8080

  # 可以添加多条，实现一条隧道代理多个服务
  #‑ hostname: file.mydomain.com
  #  service: http://192.168.1.100:9000

  # 必须保留兜底规则，否则启动报错
  - service: http_status:404
```
> 修改：tunnel名称、credentials-file路径、hostname域名、service本地地址端口

校验配置是否正确：
```powershell
cloudflared tunnel ingress validate
```

## 五、绑定域名DNS路由
> 执行这条命令，cloudflared自动在Cloudflare后台创建CNAME解析记录，**不需要手动去DNS页面添加**
```powershell
cloudflared tunnel route dns win‑tunnel web.mydomain.com
```
输出 `Added CNAME` 代表成功。
> ⚠️ 如果报错1003：说明该子域名已经存在解析，到Cloudflare DNS面板删除旧A/CNAME记录，重新执行命令。

## 六、前台运行测试（调试用，关闭窗口就断开）
```powershell
cloudflared tunnel --config C:\Users\你的用户名\.cloudflared\config.yml run win‑tunnel
```
看到 `Connection established` 代表隧道连接成功。
浏览器访问 `https://web.mydomain.com`，即可访问本地8080服务，自带HTTPS证书。

## 七、写一个bat 自动启动cloudflared.exe
> 放到cloudflared.exe同一个目录
```cmd
@echo off
chcp 65001 >nul
:: 切换到脚本所在当前目录
cd /d "%~dp0"

echo 当前目录：%cd%
echo 执行：cloudflared tunnel run
echo.
cloudflared tunnel run
pause
```
> 自动启动电脑端的没弄好，就这样手动启动吧
