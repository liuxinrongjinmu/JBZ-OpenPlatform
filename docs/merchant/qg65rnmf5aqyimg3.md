# 7.1.消息订阅(新)

---

覆盖更新

---

### 接口说明：消息订阅

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/subscriber/message?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 3dcf37d6-735f-4289-9e31-891ba8944c74 | 授权令牌 |
| eventList | `List<String>` | Y |  | 消息事件（参考消息公共参数） |
| url | String | Y |  | 消息推送地址 |

### 返回结果

正确响应示例：

```json
{
  "response": {
    "shopId": 9538,
    "platForm": "JBZ",
    "clientId": "local",
    "url": "xxxxxx",
    "events": [
      {
        "event": "TRADE_ORDER_STATE",
        "code": 0,
        "msg": "成功"
      },
      {
        "event": "SUPPLIER_RETAIL_BIND",
        "code": 101,
        "msg": "无订阅权限"
      }
    ]
  },
  "traceId": "94ba5bffe996da2d"
}
```