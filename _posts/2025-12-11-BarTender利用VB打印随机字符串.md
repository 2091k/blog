---
layout: post
title: "BarTender利用VB打印随机字符串"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- BT
- 打印
---

## 说明
1. 每次单次打印时可随机输出数字或字母
2. 数字、字母、字符串长度可自行修改调整

## 完整VB代码（8位自定义随机串）
```vb
Dim charList,s,i,c
charList = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
s=""
Rnd(- Timer * Rnd() * Rnd() * Rnd())
For i=1 To 8
    c = Int(Rnd() * Len(charList)) + 1
    s = s & Mid(charList,c,1)
Next
Value = s
```

### 使用方法
1. 在BarTender中新建文本对象，数据源选择「Visual Basic脚本」
2. 粘贴上方代码
3. 调整数组下标可修改总位数，打印时每次自动生成不重复随机字符串