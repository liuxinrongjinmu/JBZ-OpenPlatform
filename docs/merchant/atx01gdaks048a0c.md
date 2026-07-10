# 1. 账户余额批量充值

---

**接口说明**：账户余额批量充值

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/v2/account/balance/recharge/batch?access_token=[token]](https://api.c3tech.cn/oauthentry/trades/orders/batchDelivery?access_token=%5Btoken%5D)

**参数说明**：
| 参数 | | 类型 | 必传 | 示例值 | 说明 |
| --- | --- | --- | --- | --- | --- |
| items | | List | Y |  | 充值信息 |
|  |   ├ agentid | Number | Y |  | 用户ID |
|  |   ├ money | Double | Y |  | 金额 |
|  |   ├ businessNo | String | Y |  | 业务单号(唯一) |
|  |   ├ bizType | String | Y | VIEBO_REWARD | VIEBO_INVITE_SHARE_VIEW(45, "邀请分享观看"), VIEBO_RESERVE(46, "预约直播"), VIEBO_PAY(47, "购买商品"), VIEBO_COMMENT(48, "直播间评论"), VIEBO_REWARD(49, "直播间打赏"), VIEBO_WATCH_DURATION(50, "观看时长"), VIEBO_ADD_MONEY(51, "加余额"), VIEBO_INVITATION_LEADERBOARD_REWARD(52, "邀请榜奖励") |
|  |   └ description | String | N |  | 描述 |

### 接口调用Demo

```http
Post https://api.c3tech.cn/v2/oauthentry/account/balance/recharge/batch?access_token=[token]
{
  "items": [
    {
      "agentid": 9538,
      "bizType": "VIEBO_ADD_MONEY",
      "money": 100,
      "businessNo": "S20240710160529892832676",
    }
  ]
}
```

### 成功响应

```json
{
  "response": true
}
```

### 失败响应

```json
{
  "response": false
}
```

### 异常响应

```json
{
  "error_response": {
    "message": "余额充值失败",
    "code": "100"
  }
}
```

