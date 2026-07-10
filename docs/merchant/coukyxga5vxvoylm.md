# 3. 服务商转账

---

**接口说明**：服务商转账

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/v2/account/agency/transfer?access_token=[token]](https://api.c3tech.cn/oauthentry/trades/orders/batchDelivery?access_token=%5Btoken%5D)

**参数说明**：
| 参数 | | 类型 | 必传 | 示例值 | 说明 |
| --- | --- | --- | --- | --- | --- |
| userId | | Long | Y |  | 用户ID |
| money | | Double | Y |  | 金额 |
| businessNo | | String |  |  | 业务单号 |
| remarks | | String |  |  | 备注 |

### 接口调用Demo

```http
Post https://api.c3tech.cn/v2/oauthentry/account/balance/recharge/batch?access_token=[token]
{
  "userId" : 100081,
  "money": 10.3,
  "remarks": "奖励发放"
}
```

### 成功响应

```json
{
  "response": "success"
}
```
