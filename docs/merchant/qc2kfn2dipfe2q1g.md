# 10.10.会员注销

---

**接口说明**：会员信息查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：**application/json**`

**请求地址**：https://api.c3tech.cn/oauthentry/user/cancelAgent?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |
| userId | Number | Y | 123456 | 聚宝赞用户ID(agentId) |

**返回结果**：

**正确响应示例**：

```json
{
  "response": true,
  "traceId": "604871410361e543"
}
```

**错误响应示例**：

```json
{
  "response": false,
  "traceId": "353a5acfb12d5a04"
}
```

