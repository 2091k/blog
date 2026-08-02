---
layout: post
title: "win系统软链接命令mklink"
subtitle: ""
author: "...."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- win
- mklink
---


#### 下面以`Stem`为例

1.先把`C:\Program Files (x86)\Steam`目录下的`Steam`文件夹全部复制到你要放的位置，比如`D:\软件\Steam`

2.然后把`C:\Program Files (x86)\`目录下的文件的`Steam`文件夹全部删掉，不然会提示目录已存在。


#### 命令如下

`WIN+R` 输入`cmd`


```
mklink /D "C:\Program Files (x86)\Steam" "D:\软件\Steam"
```


#### 删除链接方法


```
rmdir "C:\Program Files (x86)\Steam"
```

参数	管理员权限	跨分区 / 网络共享	适用场景
/D	需要	✅ 支持	开发、需要访问网络文件夹、跨硬盘挂载
/J	不需要	❌ 仅本地磁盘	C 盘迁移软件缓存、游戏目录（最稳）