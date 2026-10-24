---
layout: post
title: "BarTender打印数据保存成Excel"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- BT
- 打印
---

#### 使用VB代码直接实现

```sh
Dim logPath, fso, fieldName, fieldValue
Dim logFields, fieldNames
Dim xlApp, xlBook, xlSheet, lastRow, iCol
Dim WshShell, desktopPath
Dim errMsg, retry, bSuccess

Set WshShell = CreateObject("WScript.Shell")
desktopPath = WshShell.SpecialFolders("Desktop")
logPath = desktopPath & "\print_log.xlsx"

fieldNames = Array("条形编码", "幅宽", "层数", "接头", "日期", "重量")
Set logFields = CreateObject("Scripting.Dictionary")
errMsg = ""

On Error Resume Next
For Each fieldName In fieldNames
    logFields(fieldName) = Format.Objects(fieldName).Value
    If Err.Number <> 0 Then
        errMsg = errMsg & "【" & fieldName & "】对象不存在！;"
        Err.Clear
    End If
Next
On Error GoTo 0

If errMsg <> "" Then
    MsgBox "读取模板对象失败：" & vbCrLf & errMsg, vbExclamation, "对象缺失"
End If

If Trim(logPath) = "" Or logFields.Count = 0 Or UBound(fieldNames) < 0 Then
    MsgBox "日志路径未配置、无日志字段或字段名数组未同步！", vbCritical, "错误"
    Exit Sub
End If

Set fso = CreateObject("Scripting.FileSystemObject")
bSuccess = False
For retry = 1 To 5 '最多重试5次，解决文件抢占
    On Error Resume Next
    Set xlApp = CreateObject("Excel.Application")
    xlApp.Visible = False
    xlApp.DisplayAlerts = False
    If fso.FileExists(logPath) Then
        Set xlBook = xlApp.Workbooks.Open(logPath)
        Set xlSheet = xlBook.Sheets(1)
        lastRow = xlSheet.UsedRange.Rows.Count + 1
    Else
        Set xlBook = xlApp.Workbooks.Add
        Set xlSheet = xlBook.Sheets(1)
        lastRow = 1
        For iCol = 0 To UBound(fieldNames)
            xlSheet.Cells(lastRow, iCol + 1).Value = fieldNames(iCol)
            xlSheet.Cells(lastRow, iCol + 1).Font.Bold = True
        Next
        lastRow = lastRow + 1
    End If

    For iCol = 0 To UBound(fieldNames)
        fieldName = fieldNames(iCol)
        fieldValue = Trim(logFields(fieldName))
        xlSheet.Cells(lastRow, iCol + 1).Value = fieldValue
    Next
    xlSheet.UsedRange.Columns.AutoFit

    If fso.FileExists(logPath) Then
        xlBook.Save
    Else
        xlBook.SaveAs logPath, 51
    End If
    xlBook.Close
    xlApp.Quit
    On Error GoTo 0
    Set xlSheet = Nothing
    Set xlBook = Nothing
    Set xlApp = Nothing
    If Err.Number = 0 Then
        bSuccess = True
        Exit For
    End If
    Err.Clear
    WScript.Sleep 150 '重试前等待150ms
Next

Set fso = Nothing
Set logFields = Nothing
Set WshShell = Nothing

If Not bSuccess Then
    MsgBox "写入日志多次失败，文件被占用！", vbCritical, "错误"
End If
```

#### CSV格式，速度快，无格式

```
Dim logPath, fso, ts
Dim fieldName, fieldValue
Dim logFields, fieldNames
Dim WshShell, desktopPath
Dim errMsg

Set WshShell = CreateObject("WScript.Shell")
desktopPath = WshShell.SpecialFolders("Desktop")
logPath = desktopPath & "\print_log.tsv" '后缀改成tsv也可以，或者继续csv

fieldNames = Array("序号","条形编码","幅宽","层数","接头","日期","重量")
Set logFields = CreateObject("Scripting.Dictionary")
errMsg = ""

On Error Resume Next
For Each fieldName In fieldNames
    logFields(fieldName) = Format.Objects(fieldName).Value
    If Err.Number <> 0 Then
        errMsg = errMsg & "【" & fieldName & "】对象不存在！;"
        Err.Clear
    End If
Next
On Error GoTo 0

If errMsg <> "" Then
    MsgBox "读取模板对象失败：" & vbCrLf & errMsg, vbExclamation, "对象缺失"
End If

If Trim(logPath) = "" Or logFields.Count = 0 Then
    MsgBox "日志路径未配置、无日志字段！", vbCritical, "错误"
    Exit Sub
End If

Set fso = CreateObject("Scripting.FileSystemObject")
Dim lineText
lineText = ""

'用 vbTab 制表符分隔，不再用逗号
For Each fieldName In fieldNames
    fieldValue = Replace(Trim(logFields(fieldName)), vbCrLf, " ")
    lineText = lineText & fieldValue & vbTab
Next
lineText = Left(lineText, Len(lineText)-1) '删掉末尾多余Tab

If Not fso.FileExists(logPath) Then
    Dim header
    header = ""
    For Each fieldName In fieldNames
        header = header & fieldName & vbTab
    Next
    header = Left(header, Len(header)-1)
    Set ts = fso.CreateTextFile(logPath, True, True)
    ts.WriteLine header
    ts.WriteLine lineText
    ts.Close
Else
    Set ts = fso.OpenTextFile(logPath, 8, True, -1)
    ts.WriteLine lineText
    ts.Close
End If

Set ts = Nothing
Set fso = Nothing
Set logFields = Nothing
Set WshShell = Nothing
```

#### 带公式，示例

```
Dim logPath, fso, fieldName, fieldValue
Dim logFields, fieldNames
Dim xlApp, xlBook, xlSheet, lastRow, iCol
Dim WshShell, desktopPath
Dim errMsg, retry, bSuccess

Set WshShell = CreateObject("WScript.Shell")
desktopPath = WshShell.SpecialFolders("Desktop")
logPath = desktopPath & "\print_log.xlsx"

' 现在只需要读取【条形编码】这一个BT对象，写入B列
fieldNames = Array("条形编码")
Set logFields = CreateObject("Scripting.Dictionary")
errMsg = ""

On Error Resume Next
For Each fieldName In fieldNames
    logFields(fieldName) = Format.Objects(fieldName).Value
    If Err.Number <> 0 Then
        errMsg = errMsg & "【" & fieldName & "】对象不存在！;"
        Err.Clear
    End If
Next
On Error GoTo 0

If errMsg <> "" Then
    MsgBox "读取模板对象失败：" & vbCrLf & errMsg, vbExclamation, "对象缺失"
End If

If Trim(logPath) = "" Or logFields.Count = 0 Or UBound(fieldNames) < 0 Then
    MsgBox "日志路径未配置、无日志字段或字段名数组未同步！", vbCritical, "错误"
    Exit Sub
End If

Set fso = CreateObject("Scripting.FileSystemObject")
bSuccess = False
For retry = 1 To 5 '最多重试5次，解决文件抢占
    On Error Resume Next
    Set xlApp = CreateObject("Excel.Application")
    xlApp.Visible = False
    xlApp.DisplayAlerts = False
    If fso.FileExists(logPath) Then
        Set xlBook = xlApp.Workbooks.Open(logPath)
        Set xlSheet = xlBook.Sheets(1)
        lastRow = xlSheet.UsedRange.Rows.Count + 1
    Else
        Set xlBook = xlApp.Workbooks.Add
        Set xlSheet = xlBook.Sheets(1)
        '新建文件，写入表头
        xlSheet.Cells(1, 1).Value = "序号"
        xlSheet.Cells(1, 2).Value = "条形编码"
        xlSheet.Cells(1, 3).Value = "幅宽"
        xlSheet.Cells(1, 4).Value = "层数"
        xlSheet.Cells(1, 5).Value = "接头"
        xlSheet.Cells(1, 6).Value = "日期"
        xlSheet.Cells(1, 7).Value = "重量"
        xlSheet.Cells(1, 8).Value = "正确错误"
        xlSheet.Cells(1, 9).Value = "重复"
        '表头加粗
        xlSheet.Range("A1:I1").Font.Bold = True
        lastRow = 2 '第一行是表头，数据从第2行开始
    End If

    ' ========== 写入B列条码值 ==========
    fieldValue = Trim(logFields("条形编码"))
    xlSheet.Cells(lastRow, 2).Value = fieldValue
    
    ' ========== 本行全部公式，自动写入，行号跟随lastRow动态变化 ==========
    'A列 序号
    xlSheet.Cells(lastRow, 1).Formula = "=IF(B" & lastRow & "="""","""",MID(B" & lastRow & ",1,3))"
    'C列 幅宽
    xlSheet.Cells(lastRow, 3).Formula = "=IF(B" & lastRow & "="""","""",--MID(B" & lastRow & ",4,4))"
    'D列 层数
    xlSheet.Cells(lastRow, 4).Formula = "=IF(B" & lastRow & "="""","""",--MID(B" & lastRow & ",8,1))"
    'E列 接头
    xlSheet.Cells(lastRow, 5).Formula = "=IF(B" & lastRow & "="""","""",--MID(B" & lastRow & ",9,1))"
    'F列 日期
    xlSheet.Cells(lastRow, 6).Formula = "=IF(B" & lastRow & "="""","""",MID(B" & lastRow & ",10,6))"
    'G列 重量
    xlSheet.Cells(lastRow, 7).Formula = "=IF(B" & lastRow & "="""","""",--RIGHT(B" & lastRow & ",LEN(B" & lastRow & ")-15))"
    'H列 正确错误
    xlSheet.Cells(lastRow, 8).Formula = "=IF(B" & lastRow & "="""","""",IF(OR(LEN(B" & lastRow & ")=18,LEN(B" & lastRow & ")=19),""✅长度正常"",""❌条码位数错误""))"
    'I列 重复校验
    xlSheet.Cells(lastRow, 9).Formula = "=IF(COUNTIF($B:$B,B" & lastRow & ")>1,""⚠️重复"",""✅唯一"")"

    xlSheet.UsedRange.Columns.AutoFit

    If fso.FileExists(logPath) Then
        xlBook.Save
    Else
        xlBook.SaveAs logPath, 51
    End If
    xlBook.Close
    xlApp.Quit
    On Error GoTo 0
    Set xlSheet = Nothing
    Set xlBook = Nothing
    Set xlApp = Nothing
    If Err.Number = 0 Then
        bSuccess = True
        Exit For
    End If
    Err.Clear
    WScript.Sleep 150 '重试前等待150ms
Next

Set fso = Nothing
Set logFields = Nothing
Set WshShell = Nothing

If Not bSuccess Then
    MsgBox "写入日志多次失败，文件被占用！", vbCritical, "错误"
End If
```
 
 
 
#### 注意⚠️：具名数据源改成对应名称

脚本事件：
OnNewRecord 读取数据库记录之后在打印时执行
数据库多行记录打印（每条记录一张标签，内容不一样）

OnIdenticalCopies：每打印一张副本都会执行，哪怕内容相同