---
layout: post
title: "BarTender用VB代码 +-*/与显示对应条码数量"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- BT
- 打印
---


## 显示对某个值+-*/后的结果
举例，A是1   B自动变成1.4  （就是B=A+0.4）

## 用VB显示条码对应数量自动变化
代码如下

### 代码1（数值四则运算示例）
```vb
Value = Round(CDbl(Format.NamedSubStrings("A").Value) * 0.9144, 1)
```

### 代码2（统计非空条码字段数量）
```vb
Dim count
count = 0

If Len(Format.NamedSubStrings("Data1").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data2").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data3").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data4").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data5").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data6").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data7").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data8").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data9").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data10").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data11").Value) > 0 Then count = count + 1
If Len(Format.NamedSubStrings("Data12").Value) > 0 Then count = count + 1

Value = count
```