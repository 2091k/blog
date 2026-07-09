---
layout: post
title: "CloudFlare内网穿透教程"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- CloudFlare
- cf
---

# CloudFlare内网穿透教程

## 下载程序到盒子里：
[https://github.com/cloudflare/cloudflared/releases](https://github.com/cloudflare/cloudflared/releases)
自己选择对应版本下载，
32位arm平台选择【cloudflared-linux-arm】
64位arm平台选择【cloudflared-linux-arm64】

### 我打包了arm和arm64位的，可供下载
### 蓝奏下载地址cloudflared.zip
[cloudflared.zip](https://wwi.lanzoup.com/i5JQ61z8plwd)

下载好命名cloudflared放到放到/usr/bin/

## 给权限和登陆
```sh
chmod -R 0777 /usr/bin/cloudflared
cloudflared login
```
此时终端会显示一个https:// 的网址，复制到浏览器打开，登录自己的cloudflare账号，选择要绑定的域名，并获取自动下载的授权文件

## 创建一个隧道
cloud 是你创建的隧道名称，记好，后面要用，这个名称可自定义
得到隧道的id
```sh
cloudflared tunnel create cloud
```

## 配置文件config.yml到/etc/cloudflared/
```yaml
tunnel: 275fe7bb-5948-45a0-bda7-30da7d154ddf
credentials-file: /root/.cloudflared/275fe7bb-5948-45a0-bda7-30da7d154ddf.json

ingress:
  - hostname: cloud.2091k.cn
    service: http://127.0.0.1
  - service: http_status:404
```
#这个ID在/root/.cloudflared里
```sh
mkdir -p /etc/cloudflared/
vi /etc/cloudflared/config.yml
```

## 在运行
```sh
cloudflared tunnel route dns cloud cloud.2091k.cn
```
这时就可以在CF平台DNS看到解析的记录

## 配置最后自启动
```sh
cloudflared service install    #运行自启动安装
systemctl start cloudflared    #启动服务
systemctl status cloudflared   #查看运行状态  可随时ctrl + c 中止。
```

## 输入cloud.2091k.cn就可以访问了
[cloud.2091k.cn](https://cloud.2091k.cn/)