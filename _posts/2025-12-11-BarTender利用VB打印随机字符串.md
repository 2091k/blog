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

## 完整VB代码（8位自定义随机串，每一位字符池独立）
```vb
' 定义8位串码的每一位字符集（对应：数字+2小写+1大写+2小写+2大写）
Dim charPools(7) ' 索引0-7对应串码第1-8位
charPools(0) = "0123456789"          ' 第1位：数字
charPools(1) = "abcdefghijklmnopqrstuvwxyz" ' 第2位：小写
charPools(2) = "abcdefghijklmnopqrstuvwxyz" ' 第3位：小写
charPools(3) = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ' 第4位：大写
charPools(4) = "abcdefghijklmnopqrstuvwxyz" ' 第5位：小写
charPools(5) = "abcdefghijklmnopqrstuvwxyz" ' 第6位：小写
charPools(6) = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ' 第7位：大写
charPools(7) = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" ' 第8位：大写

Dim randomStr, i, poolLen, randomIndex
randomStr = ""
Randomize Timer ' 初始化随机数（避免重复）

' 逐位生成随机字符并拼接
For i = 0 To 7
    poolLen = Len(charPools(i)) ' 当前位字符集长度
    randomIndex = Int(Rnd() * poolLen) ' 生成0~poolLen-1的随机索引
    randomStr = randomStr & Mid(charPools(i), randomIndex + 1, 1) ' 拼接字符（Mid从1开始索引）
Next

' 将生成的随机串赋值给文本对象
Value = randomStr
```

### 使用方法
1. 在BarTender中新建文本对象，数据源选择「Visual Basic脚本」
2. 粘贴上方代码，按需修改每一位`charPools`内的字符内容
3. 调整数组下标可修改总位数，打印时每次自动生成不重复随机字符串