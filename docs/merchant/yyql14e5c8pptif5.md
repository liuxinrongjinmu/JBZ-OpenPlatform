# 10.16.查询会员卡权益等级

---

**接口说明**：查询用户会员卡权益等级

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/queryMemberLevel?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |

### 返回结果

`List&lt;MemberLevelVO&gt;`

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |

#### MemberLevelVO

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| levelId | Long | Y | 等级ID |
| levelName | String | Y | 等级名称 |
| weights | Integer | Y | 等级权重 |

### 正确响应示例

```json
{
  "response": [
    {
      "levelId": 10,
      "levelName": "粉丝",
      "weights": 1
    },
    {
      "levelId": 11,
      "levelName": "VIP",
      "weights": 2
    },
    {
      "levelId": 12,
      "levelName": "VIP2",
      "weights": 3
    },
    {
      "levelId": 14,
      "levelName": "Vip6",
      "weights": 4
    },
    {
      "levelId": 13,
      "levelName": "12312321",
      "weights": 8
    }
  ],
  "traceId": "d5dcefecaab352b8"
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": 500003,
    "msg": "查询失败"
  }
}
```
