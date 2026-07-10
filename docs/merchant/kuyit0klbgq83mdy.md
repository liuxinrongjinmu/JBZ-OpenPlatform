# 5.19.修改售后金额

---

**接口说明**：修改售后金额

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/modifyRefundFee?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| tid | String | Y | 订单号 |
| refundNo | String | y | 售后单号 |
| refundFee | BigDecimal | Y | 退款金额 |
| remarks | String | N | 退款备注 |


### 正确响应示例

```json
{
  "response": true,
  "traceId": "bd0698d821f0576e"
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "902",
    "message": "退款失败"
  }
}
```

