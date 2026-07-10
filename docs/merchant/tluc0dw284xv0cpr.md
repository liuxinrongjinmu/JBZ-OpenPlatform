# 10.18.修改用户会员卡等级

---

**接口说明**：会员信息批量查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/member/updateLevel?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |
| userId | Long | Y | 13321 | 聚宝赞用户ID |
| levelId | Long | Y | 1 | 聚宝赞会员卡等级 |
| endTime | LocalDateTime | N | 2026-01-01 00:00:00 | 到期时间 |

**返回结果**：

java.lang.Boolean

**正确响应示例**：

```json
{
  "response": true,
  "traceId": "75853702274ee529"
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "code": "500003",
    "msg": "查询失败"
  }
}
```

