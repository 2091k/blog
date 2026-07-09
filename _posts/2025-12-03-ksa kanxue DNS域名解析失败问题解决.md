---
layout: post
title: "ksa kanxue DNS域名解析失败问题解决"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- ksa
- dns
---

## 解决KSA启动失败，DNS域名解析失败问题
今天使用时发现不能用了，网也正常啊

解决方案是在电脑host配置好域名指向的IP

- 在电脑 `C:\Windows\System32\drivers\etc\hosts` 加入

```sh
47.92.108.254 nat.kanxue.com
```
- 也可以ksa公共服务地址改成47.92.108.254
- 测试显示 UDP链路测试成功  即可正常使用
- 官网：[https://ksa.kanxue.com/](https://ksa.kanxue.com/)

![1](https://ksa.kanxue.com/view/img/product/pic/01.PNG)