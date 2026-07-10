# 5.25.订单取消

---

接口说明

开放平台批量取消未付款订单接口。第三方可通过此接口批量取消未付款订单，释放库存。支持部分成功部分失败。

**请求方式**：POST（HTTPS）

**请求头**：Content-Type：application/json

**请求地址**：[https://api.c3tech.cn/oauthentry/v2/trades/orders/cancel?access_token=[token]](https://api.c3tech.cn/oauthentry/v2/trades/orders/cancel?access_token=[token])

参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNoList | `List<String>` | Y | ["S20220214103724410190116", "S20220214103724410190117"] | 订单号列表 |

返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| successCount | Integer | Y | 2 | 取消成功数量 |
| failCount | Integer | Y | 1 | 取消失败数量 |
| failList | `List<FailInfo>` | Y |  | 失败订单明细 |

FailInfo

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | Y | S20220214103724410190118 | 失败的订单号 |
| reason | String | Y | 订单已付款，不可取消 | 失败原因 |

### 正确响应示例

```json
{
  "code": "200",
  "message": "success",
  "response": {
    "successCount": 2,
    "failCount": 1,
    "failList": [
      {
        "orderNo": "S20220214103724410190118",
        "reason": "订单已付款,不可取消"
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