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
Dim logPath, fso, logLine, fieldName, fieldValue
Dim logFields, fieldNames
Dim xlApp, xlBook, xlSheet, lastRow, iCol
On Error Resume Next

Set WshShell = CreateObject("WScript.Shell")
desktopPath = WshShell.SpecialFolders("Desktop")
logPath = desktopPath & "\print_log.xlsx"

WScript.Echo "日志文件路径：" & logPath

fieldNames = Array("员工姓名", "员工工号", "所属部门", "打印时间")
Set logFields = CreateObject("Scripting.Dictionary")
logFields("员工姓名") = Format.NamedSubStrings("员工姓名").Value
logFields("员工工号") = Format.NamedSubStrings("员工工号").Value
logFields("所属部门") = Format.NamedSubStrings("所属部门").Value
logFields("打印时间") = FormatDateTime(Now(), 2) & " " & FormatDateTime(Now(), 3)

If Trim(logPath) = "" Or logFields.Count = 0 Or UBound(fieldNames) < 0 Then
    MsgBox "日志路径未配置、无日志字段或字段名数组未同步！", vbCritical, "错误"
    Exit Sub
End If

Set fso = CreateObject("Scripting.FileSystemObject")

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

Set xlSheet = Nothing
Set xlBook = Nothing
Set xlApp = Nothing
Set fso = Nothing
Set logFields = Nothing

If Err.Number <> 0 Then
    MsgBox "Excel日志写入失败：" & Err.Description & vbCrLf & "请检查：1.路径权限/文件是否被占用 2.是否安装Excel 3.路径无中文/空格", vbCritical, "错误"
    Err.Clear
End If
```
 
 
 
#### 注意⚠️：具名数据源改成对应名称

脚本事件：OnNewRecord 读取数据库记录之后在打印时执行