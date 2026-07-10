# 1.4.H5直播间嵌入到第三方APP红包提现

---

## 时序交互图

![H5直播间红包提现时序图](/images/merchant/h5_withdraw_sequence.svg)

## 业务流程说明

## 场景一

### 阶段一：入口与授权
1. 用户在 **H5直播间** 点击「提现」
2. H5 唤起 **第三方APP**（携带：提现金额）

```javascript
const data = { 
    money: 提现金额
}
if (isIframe) {
  appBridge.$callRootExposed('withdrawRedEnvelope', {
    type: 'WITHDRAW_RED_ENVELOPE',
    data,
  })
}
else {
  postToMessage({
    type: 'WITHDRAW_RED_ENVELOPE',
    data,
  })
}
```

### 阶段二：提现申请
1. **第三方APP → 第三方后端**
    - 发起提现请求（openid +appId+ 金额+用户ID）
2. **第三方后端 → 聚宝赞开放平台**
    - 转发提现请求
3. **开放平台处理核心逻辑（重点）**
    - 校验提现条件（余额 / 风控）
    - 生成提现申请
    - 扣减余额
    - 记录资金流水
    - 清理缓存

### 阶段三：调用微信提现
1. **开放平台 → 微信服务端**
    - 发起转账请求（appid + openid + amount+用户ID）
2. **微信服务端 → 开放平台**
    - 返回转账参数
3. **开放平台 → 第三方后端 → 第三方APP**
    - 下发微信提现参数

### 阶段四：用户确认提现
1. **第三方APP → 微信APP**
+ 调用SDK发起提现；参考微信转账文档：[https://pay.weixin.qq.com/doc/v3/merchant/4012719576](https://pay.weixin.qq.com/doc/v3/merchant/4012719576))
1. 用户在微信确认提现
2. 微信展示结果

### 阶段五：回调处理（仍在开放平台）⭐
1. **微信服务端 → 开放平台（异步回调）**
2. **开放平台处理结果：**
+ ✅ 成功 → 更新提现状态
+ ❌ 失败 → 回退余额 + 记录流水 + 更新状态
+ 清理缓存

## 场景二

### 场景定义
用户第一次发起提现后：

+ 未完成收款（中断 / 退出微信 / 未点击确认）
+ 或在“提现记录”中看到**待收款状态**
+ 用户再次点击「待收款」触发该流程

### 阶段一：入口
1. 用户在 **H5直播间**
    - 点击「提现记录」
    - 点击某条「待收款」记录
2. **H5 → 第三方APP**
    - 发送通讯消息（提现记录信息包含：微信提现参数）

```javascript
const data = {
  "createdTime": 创建时间,
  "id": 提现记录id,
  "mchId": 商户号,
  "money": 提现金额,
  "packageInfo": 转账参数,
  ...
}
if (isIframe) {
  appBridge.$callRootExposed('withdrawRedEnvelope', {
    type: 'WITHDRAW_RED_ENVELOPE',
    data,
  })
}
else {
  postToMessage({
    type: 'WITHDRAW_RED_ENVELOPE',
    data,
  })
}
```

### 阶段二：参数获取
+ **第三方APP**
    - 接收提现参数（无需再请求后端）
+ **第三方APP → 微信APP**
    - 直接调用微信SDK发起收款

### 阶段三：完成收款
1. **第三方APP → 微信APP**
    - 调用SDK发起收款；参考微信转账文档：[https://pay.weixin.qq.com/doc/v3/merchant/4012719576](https://pay.weixin.qq.com/doc/v3/merchant/4012719576))
2. 用户在微信完成确认
3. 微信展示结果

### 阶段四：结果处理（仍在开放平台）
1. **微信服务端 → 开放平台（异步回调）**
2. **开放平台处理：**
+ ✅ 成功 → 更新状态
+ ❌ 失败 → 回退资金 + 记录流水
+ 清理缓存

## 功能分工
  
一、聚宝赞方  
1.点击提现按钮向第三方AP发送通讯消息  
2.开放平台提供发起转账接口，返回微信收款参数（需要提供appid openid amount 用户ID）  
3.点击待收款按钮向第三方AP发送通讯消息

二、第三方  
1.第三方服务端调用聚宝赞开放平台获取用户是否已授权  
2.第三方APP拉起微信授权获取openid  
3.第三方服务端调用聚宝赞开放平台获取微信收款参数  
4.第三方APP拉起微信sdk收款操作  
5.收款完成返回直播间  
6.第三方服务端调用聚宝赞开放平台同步查询微信提现状态

