# 7.3.查询订阅消息列表

---

**接口说明**：消息订阅

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/subscriber/getSubList?access_token=[token]](https://api.c3tech.cn/oauthentry/subscriber/getSubList?access_token=[token])

**参数说明**：
| 参数 | 类型 | 必传(Y/N) | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 3dcf37d6-735f-4289-9e31-891ba8944c74 | 授权令牌 |

### 返回结果
正确响应示例：

```json
{
  "response": {
    "eventList": [
      "TRADE_ORDER_STATE",
      "USER_INFO_STATE"
    ],
    "url": "xxxxx"
  }
}
```

错误响应示例：

```json
{
  "error_response": {
    "code": "100001",
    "msg": "参数校验错误"
  }
}
```

