# 2.2.接入流程

---

## **开放平台对接流程图：**
![](/images/merchant/f102828cc779d486.png)

## **一、申请应用**

联系客服或者平台技术人员申请自己的应用，根据自己的选择的鉴权方式（通过[2.2鉴权认证](https://www.kancloud.cn/youhelp/openapid/1874263)了解），授权码方式需要提供**<font style="color:#DF2A3F;">授权回调地址</font>** _(用于接收授权code，换取 access_token)_，平台将会为您开通应用，应用信息主要client_id和client_secret。此为测试账号，只能在开发测试阶段使用。请您保存应用的client_id和client_secret,并防止泄露。

_注意开发阶段申请的应用为测试账号(测试环境接口域名 _[_https://testapi.jubaozan.cn)_](http://api.jubaozan.cn))_ ，待应用测试完成后可以申请应用上线，平台会分配所属应用的正式账号，双方同步切换上线。_

## **二、使用凭证**

+ 使用client_id和client_secret调用凭证接口获取access_token和refresh_token信息；
+ access_token有效期为7天，可以提前5分钟获取新的授权令牌;
+ refresh_token有效期为28天，注意refresh_token不能重复使用，使用refresh_token调用刷新接口后请更新为最新的refresh_token;
+ 如access_token过期，可调用凭证刷新接口重新获取新的授权令牌；

## **三、系统测试**

+ 确保已经能获取到授权令牌
+ 调用开放平台接口，请求参数需要携带授权令牌
+ 开发完成之后可申请到线上正式环境测试
+ 应用测试完成之后可以申请上线

## **四、申请上线**

+ 上线审核通过之后，系统会为您分配正式的应用账号信息
+ 正式的应用账号会设置为上线运行状态，拥有已经授权接口权限
+ 上线之后客户端必须使用正式的应用信息，即应用的client_id和client_secret
+ 上线运行状态，应用的client_id和client_secret暂时不支持修改

