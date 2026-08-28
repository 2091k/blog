---
layout: post
title: "Codex 接入 Agnes-Ai 教程"
subtitle: ""
author: "每天要好心情哦，我的朋友"
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- Codex
- Agnes-Ai
---


# Codex 接入 Agnes-Ai 教程

## 1. 申请 API Key

1. 打开 [Agnes-Ai 官网](https://www.agnes-ai.com/)，注册并登录账号。
2. 登录后进入控制台，申请 API Key。

## 2. 下载 Codex++

1. 访问项目地址：[BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)
2. 点击 **Code** 按钮，选择 **Download ZIP** 下载压缩包。
3. 解压后，运行 codex-plus-plus-manager.exe 启动程序。

## 3. 配置供应商

1. 进入软件后，点击左侧菜单 **供应商配置**。
2. 点击 **添加供应商**，填写以下信息：

   | 字段 | 值 |
   |------|-----|
   | 名称 | 自定义（例如：Codex） |
   | 接入模式 | 纯API |
   | Base URL | https://apihub.agnes-ai.cn/v1 |
   | Key | 填入你申请的 API Key |
   | 上游协议 | Chat Completions |
   | 默认模型 | agnes-2.0-flash |

3. 点击 **保存**。

## 4. 测试连接

1. 在供应商列表中，点击刚刚添加的供应商。
2. 在发送框输入 hi，点击发送。
3. 如果返回状态码 200，说明配置成功。

## 5. 启用并完成

1. 勾选该供应商的 **使用** 选项。
2. 点击右上角 **重启 Codex++** 使配置生效。

---

![配置界面截图](https://jasuimg.2091k.cn/2091k/image/main/001/20260828100139_dhqx66nrnx.png)

现在你可以使用 Agnes-Ai 接入的 Codex 了！
