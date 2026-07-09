---
layout: post
title: "阿里智能插座YKYC-001刷巴法云平台教程"
subtitle: ""
author: "..."
header-img: "img/tu/home-blue.jpg"
header-mask: 0.4
tags:
- 阿里
- 插座
---

#### 让失效的插座恢复智能

前言： 浙江云控物联科技有限公司 这款因为厂家没了，所以导致无法远程控制 找过很多平台，最终发现了`巴法云`这个宝藏平台[https://bemfa.com/](https://bemfa.com/) 让不能智能的插座恢复智能


- 可微信小程序远程控制
- 巴法app远程控制
- 小爱音响 小爱同学 语音控制（提前用米家绑定巴法云平台）


简单讲一下刷机教程：


- 参考视频

<embed src="https://aweme.snssdk.com/aweme/v1/play/?video_id=v2700fgi0000d49j26vog65gjr7jon60&amp;ratio=1080p&amp;line=0" autostart="true" loop="true" width="100%" height="300">


#### 用到的工具

- CH341A编程器（或其它USB转TTL板子）
- 若干杜邦线

> 可以去某宝自行购买，大概十来块钱


#### TTL串口刷机接线

<b>ESP-12F(ESP8266</b>     | <b>编程器CH341A</b>
-------- | -----
[当贝桌面IPV6.apk](/dbzmIPV6.apk)    | $1600
GND  | GND
VCC  | 3.3V
IO0  | GND
RX0  | TX
TX0  | RX

![1](https://jasuimg.2091k.cn/2091k/image/main/001/20251116221333_0lhgo5e1rc.jpg)



刷机工具与固件：密码：6666[https://wwqo.lanzouo.com/b02sg6ywpa](https://wwqo.lanzouo.com/b02sg6ywpa)

> 为防止滥用，固件加入了验证码效验功能，刷入后需要输入对应验证码方可正常远程控制，否则只能手动控制


刷机完成联网成功电脑后登录巴法云后台输入验证码

![2](https://jasuimg.2091k.cn/2091k/image/main/001/20251117084845_pimzrclrwy.png)
![3](https://jasuimg.2091k.cn/2091k/image/main/001/20251117084938_p0j28o1fga.png)

---

远程控制命令：

- on 打开
- off 关闭
- rec 恢复出厂设置
- update 升级固件
- update:https//:xxxxxx.xxxxx.bin 升级固件地址保存
- key:xxxxxx 验证码


设备控制：

- 短接：控制开关
- 长按5s以上：恢复出厂设置
- 电源插拔10次：恢复出厂设置


灯光：

- 蓝灯红灯闪烁：配网状态
- 蓝灯长亮：开关打开
- 无灯亮：开关关闭
- 下面为抖音群友刷机经验，仅供参考

> 分享一下弯路，后来者共勉
> - 1，模块耗电也不低，要用供电足够的USB转TTL板
> - 2，模块与USB转TTL之间导线用足够好的线，导线线细电组大也模块供电会不稳定。
> - 3，接口报通讯错误，排除以上先插拔一下，不行换U口
> - 4，还不行检查TR接口是否接错
> - 5，模块位置RT通讯口与金属屏蔽罩太近，注意RT导线引出角度很容易碰到屏蔽壳
> - 6，无线名不要中文和2.4+5融合，最好也别用字母数字以外字符

- 验证码可在抖音群里获取

![image](https://jasuimg.2091k.cn/2091k/image/main/001/20251116222925_tr4mryfvh7.jpg)