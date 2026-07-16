# 1.3.第三方APP对接技术方案-(APP支付)

---

## 对接步骤：
1. 开通聚宝赞商家系统
    - 自有APP对接聚宝赞商家开放平台
    - 通过开放平台打通用户、积分、优惠券、订单等信息
2. 自有APP支付信息配置在聚宝赞商城后台
3. 自有APPP集成聚宝赞商城H5（包含商城、私域直播能力）
4. 自有APP支付对接

## 业务流程
![](/images/merchant/296246aa8375890c.svg)

---

## 开放平台对接说明
### 1、开放平台商家版
+ 前置条件：  
 1、开户聚宝赞商户  
 2、聚宝赞商户开放平台授权至自有APP，参见《开放平台对接文档》
+ 用户信息：   
 接受：7.4.用户消息  
 推送：6.2.第三方会员同步
+ 积分信息：   
 接受：7.16. 积分消息（批量）  
 推送：9.1.增加积分、 9.2.扣减积分、 9.3.积分余额查询
+ 订单信息：  
 接受：7.3.订单消息  
 推送：6.1.第三方订单推送
+ 优惠券信息：  
  接受：7.14 优惠券发放消息  
  推送：10.1 优惠券模板列表查询、10.2 优惠券发放
+ 直播数据：  
  接受：7.13 直播时长消息

### 2、开放平台商家版会员接口
+ 用户AccessToken：10.11 获取会员Token

---

## 自有APP集成聚宝赞商城H5
```html
<webview src="${domain}/mall?siteId=${siteId}&token=${token}&schema=${}" ></webview>
```

| 名称 | 字段 | 是否必填 | 描述 |
| --- | --- | --- | --- |
| 访问域名 | `domain` | 是 | 系统配置的商城域名 |
| 商户ID | `siteId` | 是 | 系统对应的商户ID |
| 凭证 | `token` | 是 | 系统用户登录AccessToken |
| app的schema | `schema` | 是 | 打开app的schema |
| UA | `userAgentString` | 是 | 系统UA+‘ JUBAOZAN’ |


---

## 自有APP支付对接
### 1、聚宝赞H5商城->自有APP通讯支付参数
#### 接口说明
##### 调用方式
H5 页面通过 `webView.postMessage` 方法向原生 App 发送支付请求。

 1.1微信原生支付

```javascript
webView.postMessage({
      type: 'APP_WX_PAY',
    data:{
        "paymentNo": "支付单号"
        "timeStamp": "时间戳",
        "package": "prepay_id=wx190955123617785bf44c3bfbbcc2c00000", // 预支付id
        "mchid": "商户号",
        "paySign": "支付签名",
        "success": true,
        "bizcode": "订单号",
        "appId": "wx41890aбeс3025e06"
        "signType": "签名方式"
        "tid": "订单号",
        "nonceStr": "随机字符串"
  }
})
```

1.2微信小程序支付

```javascript
webView.postMessage({
    type: "APP_WX_PAY",
    data: {
        paymentNo: "S20260206172642636996671",
        prePayUrl: "{\"miniProgramPath\":\"pages/fromAppPay/index\",\"appId\":\"2021004124643335\",\"prePayTn\":\"alipays://platformapi/startapp?appId=2021004124643335&page=pages%2FfromAppPay%2Findex%3Fstate%3D0150724a-571a-484d-8aeb-519c5e00f932%26customerNo%3D10089508496%26orderAmount%3D11.0%26customerRequestNo%3DS20260206172642636996671%26goodsName%3D%E9%97%B2%E4%BD%99%E5%A4%8D%E7%8E%B0&thirdPartSchema=jubaozan%3A\"}",
        companay: "yeepay",
                },
    tid: "S20260206172642636996671"
})
```

1.3支付宝小程序支付

```javascript
webView.postMessage({
    type: "ALIPAY_XCX",
    data: {
        paymentNo: "S20260206172642636996671",
        prePayUrl: "{\"miniProgramPath\":\"pages/fromAppPay/index\",\"appId\":\"2021004124643335\",\"prePayTn\":\"alipays://platformapi/startapp?appId=2021004124643335&page=pages%2FfromAppPay%2Findex%3Fstate%3D0150724a-571a-484d-8aeb-519c5e00f932%26customerNo%3D10089508496%26orderAmount%3D11.0%26customerRequestNo%3DS20260206172642636996671%26goodsName%3D%E9%97%B2%E4%BD%99%E5%A4%8D%E7%8E%B0&thirdPartSchema=jubaozan%3A\"}",
        companay: "yeepay",
                },
    tid: "S20260206172642636996671"
})

```

---

#### 请求参数
##### 顶层参数
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | String | 是 | 消息类型，固定值：`message` |
| data | Object | 是 | 业务消息类型 |


##### data参数类型
| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| type | String | 是 | 业务消息类型，固定值：`APP_WX_PAY` |
| data | Object | 是 | 预支付参数 |


#### 调用示例
##### JavaScript 代码示例
```javascript
// 构建支付参数
const params = {
  type: "APP_WX_PAY",
  data: {}
}

// 发送支付请求
webView.postMessage({
  type: 'message',
  data: params
})
```

##### 完整请求数据结构示例
```json
{
  "type": "message",
  "data": {
    "type": "APP_WX_PAY",
    "data": {}
  }
}
```

### 2、自有APP唤起微信APP支付
iOS为列：

```plain
PayReq *req = [[PayReq alloc] init];
    req.partnerId = payParams[@"partnerid"];   // 商户号
    req.prepayId = payParams[@"prepayid"];     // 预支付ID
    req.nonceStr = payParams[@"noncestr"];     // 随机串
    req.timeStamp = [payParams[@"timestamp"] intValue];  // 时间戳
    req.package = @"Sign=WXPay";               // 固定值
    req.sign = payParams[@"sign"];             // 签名
    
    // 4. 发起支付
    [WXApi sendReq:req completion:nil];
```



### 3、APP支付成功消息通知h5
```plain
// 消息定义
window.onAppMessage(JSON.stringify({
  type: string, // 消息类型
  data: object  // 消息数据
}))

type AppMessage = {
  type: 'PAY_RESULT';  // 消息类型，标识“支付结果通知”
  data: PayResultData; // 支付数据
}

type PayResultData = {
  status: 'success' | 'fail';  // 支付状态
  timestamp?: number;  // 时间戳（App 通知时间）
}
```

Android / iOS 调用：

```java
// 构建 JSON 字符串
String payResultJson = "{"
    + "\"type\":\"PAY_RESULT\","
    + "\"data\":{"
    +     "\"status\":\"success\","
    +     "\"timestamp\":1731223334000"
    + "}"
    + "}";

webView.evaluateJavascript("window.onAppMessage && window.onAppMessage('" + payResultJson + "')", null);
```

### 4、H5接收消息
```html
&lt;script&gt;
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  export const payResult = writable(null);

  onMount(() => {
    window.onAppMessage = (msg) => {
      try {
        const message = JSON.parse(msg);
        if (message.type === 'PAY_RESULT') {
          console.log(' 收到支付结果:', message.data);
          payResult.set(message.data);

          if (message.data.status === 'success') {
            alert('支付成功！');
          } else if (message.data.status === 'fail') {
            alert('支付失败：' + (message.data.msg || '未知错误'));
          }
        }
      } catch (e) {
        console.error('解析App消息失败:', msg);
      }
    };
  });
&lt;/script&gt;

```

