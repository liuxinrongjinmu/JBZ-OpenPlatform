# 2.1.开发前必读

---

## **一、概念说明**

OAuth2.0

[OAuth 2.0](https://oauth.net/2/)是用于授权的行业标准协议。OAuth 2.0取代了在2006年创建的原始OAuth协议上所做的工作。 OAuth 2.0专注于客户端开发人员的便捷性，同时为web应用程序、桌面应用程序、移动电话和客厅设备提供特定的授权流。

应用信息  
   代表为客户端授予的身份及权限认证信息。  
   一个应用拥有一对client_id和client_secret。  
   client_id及client_secret用于获取access_token 。  
   应用信息不可泄露，请妥善保管 。

**client_id**

企业申请的应用身份标识

**client_secret**

企业申请的应用秘钥

**access_token**

客户端可通过client_id和client_secret请求服务器获取授权令牌access_token。客户端便可以使用access_token访问接口等，服务器根据access_token来鉴权调用者的身份。  

## **二、接口说明**

1. 请使用HTTPS协议、UTF-8编码
2. 生产环境访问域名为[[https://api.c3tech.cn](https://api.c3tech.cn))
3. 测试环境访问域名为[[https://testapi.jubaozan.cn](http://api.jubaozan.cn))
4. 调用聚宝赞业务接口，请在请求参数中携带授权令牌 access_token 信息。

