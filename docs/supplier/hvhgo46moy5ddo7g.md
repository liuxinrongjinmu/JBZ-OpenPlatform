# 查询支付单报关状态

---

**接口说明**：跨境订单，查询支付单报关状态

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/queryCustomsByTid?access_token=[token]

**参数说明**：
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| tid | String | Y | 订单号 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| ~~goodsId~~ | ~~LONG~~ | ~~Y~~ | ~~商品ID~~ |
| ~~goodsName~~ | ~~String~~ | ~~Y~~ | ~~商品名称~~ |
| ~~goodsNum~~ | ~~NUMBER~~ | ~~Y~~ | ~~商品数量~~ |
| ~~price~~ | ~~Double~~ | ~~Y~~ | ~~单价~~ |
| ~~discountAmount~~ | ~~Double~~ | ~~N~~ | ~~折扣金额~~ |
| orderAmount | Double | Y | 支付金额 |
| goodsAmount | Double | Y | 商品总价 |
| freight | Double | Y | 运费 |
| tax | Double | Y | 税费 |
| customsType | String | Y | 海关通道 |
| merchantCommerceCode | String | Y | 海关企业备案号 |
| merchantCommerceName | String | Y | 海关企业备案名称 |
| tid | String | Y | 订单号 |
| orderNo | String | Y | 支付公司商户订单号 |
| status | String | Y | PREPARE:待报关(数据准备); INIT: 待报送（实名认证及扣费成功）; FAIL: 失败（实名认证失败）; CUSTOMSSEND: 海关已报国检无须报; CUSSENDINSNO: 海关已报国检待报; CUSSENDINSSEND: 海关已报国检已报; PUSHAPPLYBLOCK: 风控阻断; CANCELED: 取消 |
| message | String | N | 错误消息 |


### 正确响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "goodsId": 308045,
      "goodsName": "naturie娥佩兰薏仁水保湿控油爽肤水500ml收缩毛孔化妆水 500g/mL",
      "goodsNum": 1,
      "price": 0.05,
      "orderAmount": 0.05,
      "discountAmount": 0,
      "goodsAmount": 0.05,
      "freight": 0,
      "tax": 0,
      "customsType": "SUZHOU",
      "merchantCommerceCode": "34119**0H",
      "merchantCommerceName": "宿州***网络科技有限公司",
      "tid": "BC1207144059625759228",
      "orderNo": "202112071441280522988098274",
      "status": "CUSTOMSSEND"
    }
  }
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "103",
    "msg": "报关记录不存在"
  }
}
```

