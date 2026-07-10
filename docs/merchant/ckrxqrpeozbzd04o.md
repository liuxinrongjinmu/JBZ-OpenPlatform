# 5.24.订单支付

---

**接口说明**：开放平台订单支付回调通知接口。第三方支付完成后，通过此接口将支付结果通知到订单系统，触发订单状态流转（待付款 → 已付款）。

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/v2/trades/orders/payment/notify?access_token=[token]](https://api.c3tech.cn/oauthentry/v2/trades/orders/payment/notify?access_token=[token])

**参数说明**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y | S20220214103724410190116 | 订单号 |
| payWay | String | Y | WXPAY | 支付渠道编码；<br/>参考文档[3.5 支付渠道(未上线)](./isswpbvivkurrq9s.md) |
| payTime | LocalDateTime | Y | 2026-06-08 14:30:00 | 支付成功时间   yyyy-MM-dd HH:mm:ss |
| money | BigDecimal | Y | 99.50 | 实际支付金额 |
| wxBgStatus | Integer | N | 0 | 微信报关状态：0-通过 1-实名信息检验未通过 2-支付单待推送至海关 3-微信推单失败 |

返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | boolean | Y | true | 支付通知是否成功 |


### 正确响应示例

```json
{
  "code": "200",
  "message": "success",
  "response": true,
  "error_response": null
}
```

错


### 错误响应示例

```json
{
  "code": "102",
  "message": "系统错误",
  "response": null,
  "error_response": {
    "code": "102",
    "msg": "订单服务调用失败"
  }
}
```

