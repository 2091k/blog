---
layout: post
title: "DeepSeek++ 连接 Reqable MCP 完整教程"
subtitle: ""
author: "每天要好心情哦，我的朋友"
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- Ai
- DeepSeek
- Reqable
---

# DeepSeek\+\+ 连接 Reqable MCP 完整教程

## 一、工具简介

**Reqable** 是一款轻量化、全平台、无广告的新一代 API 调试工具，整合了 **Fiddler \+ Charles \+ Postman** 核心能力，支持多协议抓包、接口测试、流量篡改、脚本扩展等功能，是开发者一站式网络调试利器。

通过 **Reqable MCP 服务** 可实现 DeepSeek\+\+ 与 Reqable 联动，AI 可直接操控 Reqable 完成抓包、调试、改包、接口测试等自动化操作。

## 二、MCP 联动核心能力

DeepSeek\+\+ 可远程操控 Reqable 实现以下所有能力，无需手动操作客户端：

### 1\. 流量抓包与分析

- 开启/关闭实时抓包，一键捕获 HTTP/HTTPS/WebSocket 流量

- 按域名、请求方法、状态码、应用、数据类型多条件筛选流量

- 查看完整请求/响应详情：请求头、响应头、请求体、响应体、耗时、IP 等

### 2\. 断点调试能力

- 创建、修改、删除自定义断点规则

- 拦截网络请求/响应，手动篡改参数、报文、状态码

- 精准复现 BUG 网络场景

### 3\. 流量重写规则

- 配置 URL 重定向、请求/响应内容替换

- 支持本地映射、远程映射，适配开发联调场景

- 无需改代码，快速模拟接口异常、替换返回数据

### 4\. Python 脚本扩展

- 创建、编辑、运行自定义 Python 脚本

- 拦截请求/响应，自定义篡改、校验、日志打印逻辑

- 适配复杂、个性化的网络测试场景

### 5\. API 集合与接口测试

- 创建/删除 API 集合、自定义文件夹分类管理接口

- 支持从 URL、cURL、抓包记录一键生成测试接口

- 批量编辑请求头、参数、授权、请求体，一键重发测试

- 支持请求响应对比，快速定位接口差异问题

### 6\. 自定义技能固化

可将重复性抓包、改包、测试任务固化为专属 Skill，实现指令一键复用。

## 三、前置环境准备

1. **安装 Node\.js**：确保本地已安装 Node 环境（支持 npx 命令）

2. **下载安装 Reqable**：[https://reqable\.com/zh\-CN/](https://reqable.com/zh-CN/)

3. 记录本地 Reqable 安装目录，找到 `mcp-server.exe` 文件路径

## 四、MCP 服务启动方式

### 参数说明

- `--scope minimal`：默认模式，仅注册常用核心工具（推荐新手/日常使用）

- `--scope all`：注册全部工具，包含高级脚本、反向代理、证书配置等全功能

### 方式一：CMD 临时启动（常用工具版）

打开 CMD，替换为自己本地的 `mcp-server.exe` 绝对路径，执行以下命令：

```bash
npx -y supergateway --stdio "D:\软件\小黄鸟抓包reqable-app-windows-x86_64\mcp-server.exe --scope minimal" --outputTransport streamableHttp --port 9999
```

### 方式二：BAT 一键启动脚本（推荐长期使用）

新建文本文件，粘贴以下代码，修改 exe 路径后，重命名为 `Reqable-MCP启动.bat`，双击即可启动：

```batch
@echo off
echo 【Reqable MCP桥 - 仅加载常用工具】
echo =============================================
npx -y supergateway --stdio "D:\软件\小黄鸟抓包reqable-app-windows-x86_64\mcp-server.exe --scope minimal" --outputTransport streamableHttp --port 9999
pause
```

### deepseek++ MCP配置

| 传输 | 服务 URL | 结果字节 |
| --- | --- | --- |
| Streamable HTTP | http://localhost:9999/mcp | 1000000 |


## 五、常用联动指令示例

可直接对 DeepSeek\+\+ 发送指令，自动操控 Reqable：

- 用 Reqable 抓一下 `api.example.com` 的请求，查看完整响应数据

- 创建重写规则，将所有 http 请求重定向为 https

- 拦截接口请求，修改响应状态码为 200

- 抓取 POST 类型请求，筛选域名包含 google 的流量

- 根据现有接口生成 Python 测试脚本

## 六、工具优势总结

- **一站式整合**：替代 Fiddler/Charles/Postman，无需多软件切换

- **AI 自动化**：通过 MCP 实现 AI 操控抓包、改包、测试，大幅提升调试效率

- **轻量高效**：安装包小、启动快、无广告、免登录，性能优于同类工具

- **全场景适配**：支持桌面/移动端调试、多协议、脚本扩展、批量接口测试

> （注：部分内容可能由 AI 生成）
