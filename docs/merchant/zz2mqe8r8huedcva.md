# 5.26.订单确认收货

---

接口说明

开放平台批量确认收货接口。第三方可通过此接口对快递/配送订单进行批量确认收货操作。支持部分成功部分失败。

**请求方式**：POST（HTTPS）

**请求头**：Content-Type：application/json

**请求地址**：[https://api.c3tech.cn/oauthentry/v2/trades/orders/confirm?access_token=[token]](https://api.c3tech.cn/oauthentry/v2/trades/orders/confirm?access_token=[token])

参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderList | `List<String>` | Y | ["S20220214103724410190116", "S20220214103724410190117"] | 订单号列表 |
| remark | String | N | 用户已签收 | 备注 |

返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| successOrderNoList | `List<String>` | Y | ["S20220214103724410190116"] | 确认收货成功的订单号列表 |
| failOrderNoList | `List<FailInfo>` | Y |  | 确认收货失败的订单明细 |

FailInfo

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | Y | S20220214103724410190117 | 失败的订单号 |
| failReason | String | Y | 订单未发货，不可确认收货 | 失败原因 |

### 正确响应示例

```json
{
  "code": "200",
  "message": "success",
  "response": {
    "successOrderNoList": [
      "S20220214103724410190116"
    ],
    "failOrderNoList": [
      {
        "orderNo": "S20220214103724410190117",
        "failReason": "订单未发货,不可确认收货"
      }
    ]
  },
  "error_response": null
}
```

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