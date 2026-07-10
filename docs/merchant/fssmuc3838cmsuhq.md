# 5.12.支付手续费查询

---

**接口说明**：通过支付查询号查询手续费

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn/oauthentry/trades/paymentInfo?access_token=[token]

**参数说明**：

query 参数

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |

body 参数

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| paymentQueryNOList | String[] | Y | 支付查询号 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| paymentInfos | PaymentInfo[] | Y | 交易成功日期 |

#### PaymentInfo
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| paymentQueryNo | String | Y | 交易查询号 |
| payFee | String | Y | 支付手续费（分） |
| realPayAmount | String | Y | 实付金额（分） |
| payTime | String | Y | 支付成功日期 |
| relatedOrderNOs | String[] | N | 关联订单号 |


### 正确响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "paymentInfos": [
        {
          "paymentQueryNo": "S20240510145025440057365",
          "payFee": 11,
          "realPayAmount": 3800,
          "payTime": "2025-05-10 14:50:25"
        }
      ]
    }
  },
  "msg": null
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "101",
    "msg": "支付查询号不能为空"
  }
}
```

