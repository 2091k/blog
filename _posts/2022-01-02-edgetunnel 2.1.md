---
layout: post
title: "edgetunnel 2.1部署"
subtitle: ""
author: "...."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- Vless
- Cloudflare
---

[蓝奏云下载](https://wwbda.lanzouv.com/izJKI3viiech)

# 🚀 edgetunnel 2.1

> 来源：[CMLiussss Blog - Edgetunnel2.0 全新版本](https://blog.cmliussss.com/p/edt2/)（发表于 2025-11-21，更新于 2026-08-25）
> Workers 部署教程来源：[cmliu/edgetunnel README - 快速部署](https://github.com/cmliu/edgetunnel)
> 项目仓库：<https://github.com/cmliu/edgetunnel>
> Demo 面板预览：[Edgetunnel2.0 WebUI](https://edt-pages.github.io/admin)

全新版本完全升级，集百家之所长，力求打造最强大的 Edgetunnel 解决方案！

![Edgetunnel2.0 封面](https://blog.cmliussss.com/img/edt2/edt2.png)

![demo](https://blog.cmliussss.com/img/edt2/demo.png)

---

## ✨ 有哪些改进呢？

1. **全新传输架构**：Edgetunnel 2.0 采用了全新的传输架构，提升了兼容和稳定性。
2. **更简化的配置流程**：新增了 WebUI 用户界面，修改配置无需改动变量重试部署，点击保存即刻生效。
3. **多协议支持**：一次部署，在线切换 VLESS、Trojan 传输协议，满足不同用户的需求。
4. 内置**三网优选 IP**，根据三网自动分配优选 IP，优选 IP 想要多少就有多少！
5. **自定义优选** 支持 **在线优选**，自选落地国家，手机浏览器一点就跑，跑完就用！
   - 感谢 [白嫖哥](https://t.me/Lfreea) 提供的服务支持在线优选功能
6. **自定义优选** 支持 **优选 API** 接入，搭配自动化实时优选！
7. 反代除了支持 ProxyIP，还支持 **SOCKS5/HTTP** 出口（**启用全局代理，即可实现链式代理效果**）！
   - 感谢 [AK大佬](https://t.me/Alexandre_Kojeve) 提供的 [SOCKS5/HTTP服务](https://t.me/Enkelte_notif)
   - 感谢 [OTC大佬](https://t.me/otc006) 提供的 [SOCKS5](https://socks5.qqqqqq.tk/)/[HTTP服务](https://http.qqqqqq.tk/)
8. 配置 **Telegram Bot 通知**设置，即可实时获取项目访问登录订阅等消息；
9. 配置 **CF Account ID / API Token** 通知设置，即可实时获取当天 **Workers/Pages 请求使用情况**；
10. 添加 **日志中心**，查看所有可疑登录订阅操作；

---

## 🛠️ 部署教程

支持 **Workers**、**Pages GitHub**、**Pages 上传** 三种部署方式。本教程将 **Workers 部署** 放在最前面（最轻量的部署方式，无需下载上传压缩包），随后给出 **Pages 上传** 的完整图文流程与 **Pages + GitHub** 部署方法。

### 方法一：⚙️ Workers 部署（推荐优先）

1. 部署 CF Worker：
   - 在 CF Worker 控制台中创建一个新的 Worker；
   - 将 [worker.js](https://github.com/cmliu/edgetunnel/blob/main/_worker.js) 的内容粘贴到 Worker 编辑器中；
   - 在左侧 `设置` 选项卡中，选择 `变量` > `添加变量`：
     变量名称填写 **ADMIN**，值则为你的管理员密码，然后点击 `保存` 即可。
2. 绑定 KV 命名空间：
   - 在 `绑定` 选项卡中选择 `添加绑定 +` > `KV 命名空间` > `添加绑定`，然后选择一个已有的命名空间或创建一个新的命名空间进行绑定；
   - `变量名称` 填写 **KV**，然后点击 `添加绑定` 即可。
3. 给 Workers 绑定自定义域：
   - 在 Workers 控制台的 `触发器` 选项卡下方点击 `添加自定义域`；
   - 填入你已转入 CF 域名解析服务的次级域名，例如 `vless.google.com`，后点击 `添加自定义域`，等待证书生效即可。
4. 访问后台：
   - 访问 `https://vless.google.com/admin`，输入管理员密码即可登录后台。

> ⚠️ 如遇 `Error 1101`（域名未接入 CF DNS），请参考 [视频解析](https://www.youtube.com/watch?v=r4uVTEJptdE)；部署成功但主页显示 `Welcome to nginx!` 只是默认伪装页，请访问 `/admin`。

### 方法二：🛠️ Pages 上传 部署（图文教程，无需任何门槛）

以下为 **Pages 上传** 方式的完整图文流程：

### 1️⃣ 创建 Pages 应用程序

1. 点击 [edgetunnel-main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) 下载最新版本项目压缩包备用；
2. 准备一个 Cloudflare 账号，点击 `计算和AI` > `Workers 和 Pages` > `创建应用程序`：

   ![创建Pages应用程序](https://blog.cmliussss.com/img/edt2/1-2-1.png)

   或

   ![创建Pages应用程序](https://blog.cmliussss.com/img/edt2/1-2-0.png)

3. 选择 `Pages` 选项卡，点击 `拖放文件` > `开始使用`：

   ![创建Pages应用程序](https://blog.cmliussss.com/img/edt2/1-3-1.png)

4. 项目名称**填写任意值**，**但必须是全新的名字**，**避免出现 1101 错误**，推荐末尾补上任意数字，如 `edt123123123`：

   ![创建Pages应用程序](https://blog.cmliussss.com/img/edt2/1-4-1.png)

5. 点击 `从计算机中选择` > `上传压缩文件`，选择第一步下载的 `edgetunnel-main.zip` 压缩包，等待上传完成：

   ![上传项目压缩包](https://blog.cmliussss.com/img/edt2/1-5-1.png)

6. 点击 `部署站点`，等待部署完成：

   ![部署Pages应用程序](https://blog.cmliussss.com/img/edt2/1-6-1.png)

7. 提示成功，代表初始化部署完成！点击 `继续处理项目` 进入下一步设置变量绑定 KV 的操作：

   ![部署成功](https://blog.cmliussss.com/img/edt2/1-7-1.png)

### 2️⃣ 设置管理员变量

1. 进入项目设置页面，点击 `设置` 选项卡，添加变量和机密：

   ![进入项目设置页面](https://blog.cmliussss.com/img/edt2/2-1-1.png)

2. 点击 `+ 添加`，类型 `文本`，变量名称 `ADMIN`，变量值为 **WebUI 管理员密码**，建议设置复杂密码，避免被暴力破解：

   ![添加ADMIN变量](https://blog.cmliussss.com/img/edt2/2-2-1.png)

3. 变量设置完成，如忘记密码可返回此页面查看：

   ![ADMIN变量设置完成](https://blog.cmliussss.com/img/edt2/2-3-1.png)

### 3️⃣ 绑定 KV 命名空间

1. 点击 `存储和数据库` > `Workers KV` > `+ Create Instance` 创建一个命名空间：

   ![创建KV命名空间](https://blog.cmliussss.com/img/edt2/3-1-1.png)

2. 命名空间名称可自定义，建议命名为 `EDT2` 以便区分，点击 `创建` 完成创建：

   ![命名空间创建完成](https://blog.cmliussss.com/img/edt2/3-2-1.png)

3. 返回项目设置页面，点击 `设置` > `绑定` > `+ 添加` > `KV 命名空间`：

   ![绑定命名空间](https://blog.cmliussss.com/img/edt2/3-3-1.png)

   ![绑定命名空间](https://blog.cmliussss.com/img/edt2/3-3-2.png)

4. 变量名称必须填写大写 **KV**，命名空间选择刚刚创建的 `EDT2`，点击 `保存` 完成绑定：

   ![完成绑定](https://blog.cmliussss.com/img/edt2/3-4-1.png)

5. 返回项目设置页面，确认绑定成功：

   ![绑定成功](https://blog.cmliussss.com/img/edt2/3-5-1.png)

### 4️⃣ 重试部署，使变量生效

1. 点击右上角 `创建部署`，上传**第一步刚刚下载**的 `edgetunnel-main.zip` 压缩包：

   ![重试部署](https://blog.cmliussss.com/img/edt2/4-1-1.png)

2. 部署环境选择 `生产`，点击 `从计算机中选择` > `上传压缩文件`，选择 `edgetunnel-main.zip` 压缩包，等待上传完成：

   ![重试部署上传压缩包](https://blog.cmliussss.com/img/edt2/4-2-1.png)

3. 点击 `保存并部署`，等待部署完成：

   ![重试部署保存并部署](https://blog.cmliussss.com/img/edt2/4-3-1.png)

   ![重试部署等待完成](https://blog.cmliussss.com/img/edt2/4-3-2.png)

> ⚠️ **注意**：如需修改管理员密码，修改完变量之后**必须重新上传部署，否则变量无法生效！**

### 5️⃣ 绑定自定义域名

**可免费注册的 CNAME 域名：**

| 注册商 | 地址 | 备注 |
| --- | --- | --- |
| DNSHE | <https://www.dnshe.com/> | 部分域名可托管 CF，邀请码：`CY483A4A4B` |
| DigitalPlat | <https://domain.digitalplat.org/> | 部分域名可托管 CF |
| ClouDNS | <https://www.cloudns.net/index/lang/chs> | |
| dynv6 | <https://dynv6.com/> | |
| ZoneABC | <https://zoneabc.net/> | |
| Dynu | <https://www.dynu.com/zh-CN/ControlPanel> | 注册门槛最低的域名 |
| Nodeloc | <https://domain.nodeloc.com/register?ref=7f5738b49c066dba> | 免费短域名 loc.cc |

更多免费域名资源汇总：[发哥整理](https://blog.zrf.me/p/Free-Domains/)

若无域名，可使用以上免费域名注册商注册一个 CNAME 域名使用（原文使用 ClouDNS 域名演示）：

1. 进入 Pages 应用程序，点击 `自定义域` 选项卡，点击 `设置自定义域`：

   ![设置自定义域](https://blog.cmliussss.com/img/edt2/5-1-1.png)

2. 添加自定义域。
   - 注意！你的域名如果是 `fxxk.cloudns.org`，则**必须必须必须**多加一级域名，例如 `edt2.fxxk.cloudns.org`：

   ![添加自定义域](https://blog.cmliussss.com/img/edt2/5-2-1.png)

3. 选择 `开始 CNAME 设置`：

   ![开始CNAME设置](https://blog.cmliussss.com/img/edt2/5-3-1.png)

4. 记录名称 `edt2` 和 CNAME 记录值 `edt123123123.pages.dev`：

   ![CNAME记录值](https://blog.cmliussss.com/img/edt2/5-4-1.png)

5. 前往域名服务商添加 CNAME 记录：

   ![添加自定义记录](https://blog.cmliussss.com/img/edt2/5-5-1.png)

6. 返回 `自定义域` 选项卡，点击 `稍后完成 DNS 设置`，等待域名验证成功：

   ![等待域名验证成功](https://blog.cmliussss.com/img/edt2/5-6-1.png)

7. **等待 10~30 分钟**，域名验证成功后即可看到域名绑定成功提示：

   ![域名绑定成功](https://blog.cmliussss.com/img/edt2/5-7-1.png)

### 6️⃣ 登录 EDT2 管理页面

- 访问 `/admin` 即可登录管理页面。例如绑定自定义域名 `edt2.fxxk.cloudns.org`，则需访问 `https://edt2.fxxk.cloudns.org/admin`；
1. 输入管理员密码，点击 `登录` 即可进入管理页面：

   ![登录](https://blog.cmliussss.com/img/edt2/6-1-1.png)

2. 登录成功后即可看到管理页面，如果您是小白，无需折腾，直接订阅使用即可：

   ![登录](https://blog.cmliussss.com/img/edt2/6-2-1.png)

### ⚠️ 注意事项

1. 部署成功后访问主页提示 `Welcome to nginx!`，这只是默认伪装页，说明你已部署成功，请访问 `/admin` 进入管理页面：

   ![nginx欢迎页](https://blog.cmliussss.com/img/edt2/7-1-1.png)

### 方法三：🛠 Pages + GitHub 部署

1. 部署 CF Pages：
   - 在 GitHub 上先 Fork 本项目 [cmliu/edgetunnel](https://github.com/cmliu/edgetunnel)，并点上 Star；
   - 在 CF Pages 控制台中选择 `连接到 Git`，选中 `edgetunnel` 项目后点击 `开始设置`；
   - 在 `设置构建和部署` 页面下方，选择 `环境变量（高级）` 后并 `添加变量`：
     变量名称填写 **ADMIN**，值则为你的管理员密码，然后点击 `保存并部署` 即可。
2. 绑定 KV 命名空间：
   - 在 `设置` 选项卡中选择 `绑定` > `+ 添加` > `KV 命名空间`，然后选择一个已有的命名空间或创建一个新的命名空间进行绑定；
   - `变量名称` 填写 **KV**，然后点击 `保存` 后重试部署即可。
3. 给 Pages 绑定 CNAME 自定义域（[视频教程](https://www.youtube.com/watch?v=LeT4jQUh8ok&t=851s)）：
   - 在 Pages 控制台的 `自定义域` 选项卡下方点击 `设置自定义域`；
   - 填入你的自定义次级域名，注意不要使用你的根域名，例如：
     你分配到的域名是 `fuck.cloudns.biz`，则添加自定义域填入 `lizi.fuck.cloudns.biz` 即可；
   - 按照 CF 的要求返回你的域名 DNS 服务商，添加该自定义域 `lizi` 的 CNAME 记录 `edgetunnel.pages.dev`，后点击 `激活域` 即可。
4. 访问后台：
   - 访问 `https://lizi.fuck.cloudns.biz/admin`，输入管理员密码即可登录后台。

---

## 🔀 自助优选订阅

当前 Edgetunnel 2.0 自带了三种优选订阅生成方式，分别是：

### 🎲 随机优选（简单）

- **内置三网优选 IP**，根据订阅时的网络自动分配对应三网优选 IP，优选 IP 想要多少就有多少！

![随机优选](https://blog.cmliussss.com/img/edt2/2-1-1-1.png)

- `随机优选数量`：**优选 IP 要多少就填多少**，但建议不要过多，过多会导致触发域名真链接响应 `-1`；
- `指定优选端口`：随机端口可抑制真链接响应 `-1`，也可指定 `443`、`2053`、`2083`、`2087`、`2096`、`8443` 端口；

> **注意**：更新订阅时**不可使用代理更新订阅**，否则会导致**无法识别对应三网优选 IP**，会自动降级为三网优选订阅，也就是**同时下发所有三网优选 IP**！

订阅呈现的效果如下：

![呈现效果](https://blog.cmliussss.com/img/edt2/2-1-1-2.png)

### ⚙️ 自定义优选（折腾）

自由度最高，适合喜欢折腾的选手，提供**在线优选**和**优选 API** 等多种优选接入方式，在线优选可以自选落地国家，使用优选 API 可以实现自动化实时优选！

#### ✍️ 手动添加

可以手动添加优选域名 IP，格式：`IP域名:端口#备注`，每行一条记录，例如：

```
104.18.38.47:2053#这是优选IPv4案例
104.18.42.98:2096
172.64.145.158

[2a06:98c1:3101::ac40:919e]:2087#这是优选IPv6案例
[2a06:98c1:3108::6812:2a62]:8443
[2a06:98c1:3108::6812:919e]

www.visa.cn:443#这是优选域名案例
mfa.gov.ua:8443
www.shopify.com
```

> **IPv6 地址**必须使用方括号 `[]` 括起来。
> 缺少 `端口` 时，默认为 `443`。
> 缺少 `备注` 时，将直接显示 `IP域名`。
> 更多优选域名可通过 [CloudFlare 优选域名汇总](https://cf.090227.xyz/) 获取。

![手动添加优选](https://blog.cmliussss.com/img/edt2/2-1-2-1.png)

订阅呈现的效果如下：

![呈现效果](https://blog.cmliussss.com/img/edt2/2-1-2-2.png)

#### 🌐 在线优选

- **在线优选**：点击 `在线优选` 按钮，注意必须关闭代理并且使用国内网络直连，才能进行在线优选！
  - **IP 库**：默认为 `CF官方列表`，推荐使用 `CM整理列表` 即可，该列表包含了大部分三网优选 IP 段，且会不定期更新维护；
  - **端口**：默认为 `443`，可自行修改为其他端口；
  - **测试线程数**：默认为 `8`，电脑浏览器推荐 `16` 线程以上，手机浏览器推荐 `8`~`16` 线程；

1. 选择好参数后，点击 `开始优选` 按钮，等待优选结果：

   ![在线优选-开始优选](https://blog.cmliussss.com/img/edt2/z2-1-1.png)

2. 点击你所需国家的标签，点击 `追加保存` 按钮后点击 `关闭` 返回上级菜单：

   ![在线优选-追加保存](https://blog.cmliussss.com/img/edt2/z2-1-2.png)

3. 点击 `保存` 自定义优选结果：

   ![在线优选-保存](https://blog.cmliussss.com/img/edt2/z2-1-3.png)

订阅呈现的效果如下：

![呈现效果](https://blog.cmliussss.com/img/edt2/z2-1-4.png)

> - 如果你当前网络非 `CN` 环境，将不被允许使用**在线优选**功能，因为在代理环境下进行在线优选只会得到你代理的优选，选出来的地区基本上都是你**代理所属地区**，而延迟也是你**代理延迟**，毫无意义。
> - 如果你身处国外并且直连尝试在线优选，也毫无意义，因为只有在 `CN` 环境下（国内没有 CF 数据中心），才能实现直连多国数据中心，所以才需要优选：
>
> ![直连与优选说明](https://blog.cmliussss.com/img/edt2/z2-1-0.png)

#### 🔌 优选 API

**1. 接入普通文本 API**

- 例如 `https://cf.090227.xyz/ct`，后点击 `可用性验证` 按钮：

  ![优选API-文本API可用性验证](https://blog.cmliussss.com/img/edt2/z3-1-1.png)

- 如返回格式符合 `IP域名:端口#备注`、每行一条记录，则代表 API 可用：

  ![优选API-文本API返回格式](https://blog.cmliussss.com/img/edt2/z3-2-1.png)

- 如果仅是一次性导入、无需实时自动更新，则点击 `追加结果`；需要实时获取数据，则点击 `追加API`，然后点击 `保存`：

  ![优选API-文本API追加保存](https://blog.cmliussss.com/img/edt2/z3-2-2.png)

- 订阅呈现的效果如下：

  ![呈现效果](https://blog.cmliussss.com/img/edt2/z3-3-1.png)

**2. 接入 [XIU2/CloudflareSpeedTest](https://github.com/XIU2/CloudflareSpeedTest) 项目，测速 CSV 结果文件**

- 例如 `https://github.com/cmliu/WorkerVless2sub/raw/refs/heads/main/CloudflareSpeedTest.csv`，填写测速对应的 `默认端口` 后，点击 `可用性验证` 按钮：

  ![优选API-XIU2可用性验证](https://blog.cmliussss.com/img/edt2/z4-1-1.png)

- 如返回格式符合 `IP域名:端口#备注`、每行一条记录，则代表 API 可用：

  ![优选API-XIU2返回格式](https://blog.cmliussss.com/img/edt2/z4-2-1.png)

- 一次性导入点击 `追加结果`，需要实时获取数据则点击 `追加API`，然后点击 `保存`：

  ![优选API-XIU2追加保存](https://blog.cmliussss.com/img/edt2/z4-2-2.png)

- 订阅呈现的效果如下：

  ![呈现效果](https://blog.cmliussss.com/img/edt2/z4-3-1.png)

**3. 接入 iptest 项目，测速 CSV 结果文件**

- 例如 `https://raw.githubusercontent.com/cmliu/WorkerVless2sub/refs/heads/main/addressescsv.csv`，点击 `可用性验证` 按钮：

  ![优选API-iptest可用性验证](https://blog.cmliussss.com/img/edt2/z5-1-1.png)

- 如返回格式符合 `IP域名:端口#备注`、每行一条记录，则代表 API 可用：

  ![优选API-iptest返回格式](https://blog.cmliussss.com/img/edt2/z5-2-1.png)

- 一次性导入点击 `追加结果`，需要实时获取数据则点击 `追加API`，然后点击 `保存`：

  ![优选API-iptest追加保存](https://blog.cmliussss.com/img/edt2/z5-2-2.png)

- 订阅呈现的效果如下：

  ![呈现效果](https://blog.cmliussss.com/img/edt2/z5-3-1.png)

### 🛋️ 优选订阅生成器（偷懒）

让大佬坐上来自己动，站在巨人的肩膀上，**直接使用大佬的优选订阅生成器的优选结果**。[CMLiussss 技术交流群](https://t.me/CMLiussss) 置顶里收集了众多大佬的优选订阅生成器，大家可以自行选择。

1. 加入 [CMLiussss 技术交流群](https://t.me/CMLiussss)，在群组置顶信息里找到**优选订阅按钮**：

   ![优选订阅生成器](https://blog.cmliussss.com/img/edt2/2-1-3-1.png)

2. 复制优选订阅器 `变量SUB` 对应的值备用：

   ![复制变量SUB](https://blog.cmliussss.com/img/edt2/2-1-3-2.png)

3. 填入**优选订阅生成器**，点击保存即可：

   ![填写优选订阅生成器](https://blog.cmliussss.com/img/edt2/2-1-3-3.png)

订阅呈现的效果如下：

![呈现效果](https://blog.cmliussss.com/img/edt2/2-1-3-4.png)

---

## 🧪 VLESS/Trojan 协议切换

![呈现效果](https://blog.cmliussss.com/img/edt2/vt1-1-0.png)

1. 返回 Edgetunnel2.0 管理页面，`⚙️ 详细配置信息` > `节点协议`，选择你需要的代理协议：

   ![协议切换](https://blog.cmliussss.com/img/edt2/vt1-1-1.png)

2. 点击 `保存` 后，更新订阅即可生效：

   ![保存协议](https://blog.cmliussss.com/img/edt2/vt1-2-1.png)

---

## 🔔 设置 Telegram Bot 通知

![可用请求数统计](https://blog.cmliussss.com/img/edt2/t1-1-0.png)

1. 添加 [@BotFather](https://t.me/BotFather)，发送 `/newbot` 创建 Bot，复制 `Bot Token` 备用；
   - 例如：`8598918055:AAH50RfGC9tGTRoNKu9GaNSWcEfawUk5eh0`

   ![创建Bot](https://blog.cmliussss.com/img/edt2/t1-1-1.png)

2. 点击你的 bot 链接（例如 `t.me/cm_edt2_bot`），点击 `开始 / start` 按钮，启用你的机器人：

   ![启用机器人](https://blog.cmliussss.com/img/edt2/t1-2-1.png)

3. 加入 [CMLiussss 技术交流群](https://t.me/CMLiussss)，发送 `/id@nmnmfunbot` 命令获取你的 `Chat ID`，复制备用；
   - 例如：`6946996027`

   ![获取Chat ID](https://blog.cmliussss.com/img/edt2/t1-3-1.png)

4. 返回 Edgetunnel2.0 管理页面，`🔔 消息通知设置` > `Telegram Bot 通知` > `⚙️参数配置`：

   ![参数配置](https://blog.cmliussss.com/img/edt2/t1-4-1.png)

5. 填写 `Bot Token` 和 `Chat ID` 参数，并点击 `可用性验证`：

   ![参数填写](https://blog.cmliussss.com/img/edt2/t1-5-1.png)

6. 如提示 `✅ Bot Token 和 Chat ID 均有效`，则代表配置无误，点击 `保存` 即可：

   ![保存](https://blog.cmliussss.com/img/edt2/t1-6-1.png)

   - 同时机器人也会同步提示 `✅ Telegram 通知配置已验证成功！`：

   ![机器人提示](https://blog.cmliussss.com/img/edt2/t1-6-2.png)

7. 配置完成后，勾选 `Telegram Bot 通知` > `启用` > `保存` 即可：

   ![启用通知](https://blog.cmliussss.com/img/edt2/t1-7-1.png)

之后**登录管理页面**或**获取订阅**等操作时，均会同步收到机器人通知。

---

## 📊 设置 Workers/Pages 可用请求数统计

![可用请求数统计](https://blog.cmliussss.com/img/edt2/cf1-0-1.png)

1. 登录 Cloudflare，点击 `计算和 AI` > `Workers 和 Pages`，复制右下角 `Account ID` 备用；
   - 例如：`9b03a30c471a952197b8b8bb6f113456`

   ![复制Account ID](https://blog.cmliussss.com/img/edt2/cf1-1-1.png)

2. 点击左侧 `管理账户` > `账户 API 令牌` > `创建令牌`：

   ![创建API令牌](https://blog.cmliussss.com/img/edt2/cf1-2-1.png)

3. **API 令牌模板** 选择 `阅读分析数据和日志`，点击 `使用模板`：

   ![选择API令牌模板](https://blog.cmliussss.com/img/edt2/cf1-3-1.png)

4. 区域资源选择 `账户的所有区域`，再选择你的 CF 账户邮箱后，点击 `继续以显示摘要`：

   ![选择区域资源](https://blog.cmliussss.com/img/edt2/cf1-4-1.png)

5. 点击 `创建令牌`：

   ![创建令牌](https://blog.cmliussss.com/img/edt2/cf1-5-1.png)

6. 复制 `API 令牌` 备用；
   - 例如：`UQjdE9xzvK4oq32IaYRX7Z1-123YQvl3qLNwLQxE`

   ![复制API令牌](https://blog.cmliussss.com/img/edt2/cf1-6-1.png)

7. 返回 Edgetunnel2.0 管理页面，`🔔 消息通知设置` > `Cloudflare Workers/Pages 可用请求数统计` > `⚙️参数配置`：

   ![进入参数配置](https://blog.cmliussss.com/img/edt2/cf1-7-1.png)

8. 填写 `Account ID` 和 `API Token` 参数，并点击 `可用性验证`：

   ![填写Account ID与API Token](https://blog.cmliussss.com/img/edt2/cf1-8-1.png)

9. 如提示 `✅ 验证成功！` 并显示出 `今天的请求配额`，则代表配置无误，点击 `保存` 即可：

   ![保存配置](https://blog.cmliussss.com/img/edt2/cf1-9-1.png)

10. 等待保存成功后自动刷新加载页面，即可看到 `Workers/Pages 可用请求数统计` 信息：

    ![可用请求数统计](https://blog.cmliussss.com/img/edt2/cf1-0-1.png)

Clash 订阅呈现的效果如下：

![可用请求数统计](https://blog.cmliussss.com/img/edt2/cf1-0-2.png)

---

## 🎉 彩蛋：10w 请求次数不够用？单面板管理多节点！

- **无敌！** 且可以有效降低 SNI 域名阻断情况（就是批量测试会出现 `-1` 的情况），就是这么简单！就是这么方便！！！

> **2 个账号**部署即可实现 **20w 请求数**，**同理 3 个就是 30w**，不够就自行续杯；

- 域名可以使用同一个域名绑定多个自定义域，如：
  - `edt2.fxxk.cloudns.org` 绑定 **第一个 EDT2.0** 作为 **面板**
  - `edt2-2.fxxk.cloudns.org` 绑定 **第二个 EDT2.0** 作为 **节点**
  - `edt2-3.fxxk.cloudns.org` 绑定 **第三个 EDT2.0** 作为 **节点**
  - …

### 部署 EDT2.0 节点并绑定 EDT2.0 面板

1. 前往 **Edgetunnel2.0 管理页面**，复制保存 `⚙️ 详细配置信息` 内的 `UUID` 参数备用，例如：
   - `UUID`：`8fc6a982-9862-4362-846f-a7039c5e2e47`

   ![复制UUID](https://blog.cmliussss.com/img/edt2/m1-1-1.png)

2. **换号换号换号**，用第二个 CF 账号部署第二个 **Edgetunnel2.0 节点**，依旧使用 [edgetunnel-main.zip](https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip) 压缩包（创建 Pages 应用 → 上传压缩包 → 部署）：

   ![创建Pages应用程序](https://blog.cmliussss.com/img/edt2/1-2-0.png)

   ![创建Pages应用程序](https://blog.cmliussss.com/img/edt2/1-3-1.png)

   ![创建Pages应用程序](https://blog.cmliussss.com/img/edt2/m1-2-1.png)

   ![上传项目压缩包](https://blog.cmliussss.com/img/edt2/1-5-1.png)

   ![部署Pages应用程序](https://blog.cmliussss.com/img/edt2/1-6-1.png)

   ![部署成功](https://blog.cmliussss.com/img/edt2/m1-2-2.png)

3. 进入项目设置页面，点击 `设置` 选项卡，添加变量和机密：

   ![进入项目设置页面](https://blog.cmliussss.com/img/edt2/2-1-1.png)

4. 点击 `+ 添加`，类型 `文本`，变量名称 `UUID`，变量值为刚才复制出来备用的 **UUID**，然后点击 `保存`：

   ![添加UUID变量](https://blog.cmliussss.com/img/edt2/m1-4-1.png)

5. 点击右上角 `创建部署`，重新上传项目压缩包 `edgetunnel-main.zip`：

   ![重试部署](https://blog.cmliussss.com/img/edt2/4-1-1.png)

6. 部署环境选择 `生产`，点击 `从计算机中选择` > `上传压缩文件`，选择 `edgetunnel-main.zip` 压缩包，等待上传完成：

   ![重试部署上传压缩包](https://blog.cmliussss.com/img/edt2/4-2-1.png)

7. 点击 `保存并部署`，等待部署完成：

   ![重试部署保存并部署](https://blog.cmliussss.com/img/edt2/4-3-1.png)

   ![重试部署等待完成](https://blog.cmliussss.com/img/edt2/m1-7-1.png)

8. 进入 Pages 应用程序，点击 `自定义域` 选项卡，点击 `设置自定义域`：

   ![设置自定义域](https://blog.cmliussss.com/img/edt2/m1-8-1.png)

9. 添加自定义域，**必须必须必须**不和面板域名一样即可，例如 `edt2-2.fxxk.cloudns.org`：

   ![添加自定义域](https://blog.cmliussss.com/img/edt2/m1-9-1.png)

   - 后续步骤同「绑定自定义域名」：绑定 CNAME 记录，等待域名验证成功即可：

   ![等待提示绑定成功](https://blog.cmliussss.com/img/edt2/m1-9-2.png)

10. 点击修改 `⚙️ 详细配置信息` 内的 `HOST` 参数，加上你的 **第二个 EDT2 节点** 的 **HOST**，例如 `edt2-2.fxxk.cloudns.org`，然后点击 `保存` 即可：

    ![修改HOST](https://blog.cmliussss.com/img/edt2/m1-10-1.png)

    ![修改HOST](https://blog.cmliussss.com/img/edt2/m1-10-2.png)

    ![修改HOST](https://blog.cmliussss.com/img/edt2/m1-10-3.png)

订阅呈现的效果如下：

![呈现效果](https://blog.cmliussss.com/img/edt2/m0-1-1.png)

---

## 参考链接

- 项目仓库：[https://github.com/cmliu/edgetunnel](https://github.com/cmliu/edgetunnel)
- 在线优选服务（白嫖哥）：[https://t.me/Lfreea](https://t.me/Lfreea)
- SOCKS5/HTTP 服务：[AK大佬](https://t.me/Alexandre_Kojeve)、[OTC大佬](https://socks5.qqqqqq.tk/)
- 优选 API 示例：[CloudFlare 优选域名汇总](https://cf.090227.xyz/)、[XIU2/CloudflareSpeedTest](https://github.com/XIU2/CloudflareSpeedTest)
- 技术交流群：[https://t.me/CMLiussss](https://t.me/CMLiussss)

> 版权：原文采用 CC BY-NC-SA 4.0 许可协议，转载自 [CMLiussss Blog](https://blog.cmliussss.com/p/edt2/)。
