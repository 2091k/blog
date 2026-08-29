---
layout: post
title: "DeepSeek Harness安装与 接入免费Token Agnes-Ai 教程"
subtitle: ""
author: "每天要好心情哦，我的朋友"
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- DeepSeek Harness
- Agnes-Ai
---


# DeepSeek Harness安装与 接入免费Token Agnes-Ai 教程
![image](https://jasuimg.2091k.cn/2091k/image/main/001/20260829093402_0nvdbuolpe.png)
## 1. 申请 API Key

1. 打开 [Agnes-Ai 官网](https://www.agnes-ai.com/)，注册并登录账号。
2. 登录后进入控制台，申请 API Key。

## 2. 安装 DeepSeek Harness

#### 方法1：

1. 访问项目地址：[DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)
2.官网地址：[https://www.deepseek.com/harness/](https://www.deepseek.com/harness/)

---

#### 方法2：
国内快速官方安装命令：
大部分时间官网命令`npx @deepseek-ai/dsh web`不好安装

先全局安装pnpm
```
npm install -g pnpm
```
在要安装的目录运行
```
pnpm add @deepseek-ai/dsh
```
 如果遇到红色报错

看到类似这样的提示：

```
Run "pnpm approve-builds" to pick which dependencies should be allowed to run scripts.
```

那就运行：

```bash
pnpm approve-builds --all
```

再次安装，问题迎刃而解 🎉

---

#### 方法3：
- 看官网教程安装，或下载我打包好的，打开就能用。

- 云盘链接：链接: https://yun.139.com/shareweb/#/w/i/2xop2gaEtph7g  提取码:5dyz

- 直链下载：[CMCC云盘](https://cmcc.521156.xyz?share_token=5e50135eaebb43198615102d1bec918c)

- 下载：`A_Harness_MCP_win_0.12.0.zip`  `mcp_servers.json`  插件-`DeepSeek_Harness.rar`
主程序与json放同一个文件夹，启动后加载，选插件 勾选 插件里的 DeepSeek_Harness，启动服务，再暂停。目录自动创建插件目录。把解压的`DeepSeek_Harness`文件夹放进去，然后在重新启动服务即可。会自动打开浏览器，进入`DeepSeek_Harness`


## 3. 配置自定义模型提供方

1. 进入软件后，点击顶部菜单 **设置** → **模型**。
2. 点击 **添加自定义提供方**，填写以下信息：

    | 字段 | 值 |
    |------|-----|
    | Provider ID | agnes-ai |
    | API 地址 | https://apihub.agnes-ai.cn/v1 |
    | API 协议 | openai-completions |
    | API 密钥 | 填入你申请的 API Key |
    | 模型 | agnes-2.0-flash |

3. 点击 **保存**。

![image](https://jasuimg.2091k.cn/2091k/image/main/001/20260829093323_g8i1ijwrfw.png)

---



现在你可以使用 Agnes-Ai 接入的 DeepSeek Harness 了！
