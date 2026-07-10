# 10.3.会员等级变更

---

**接口说明**：会员等级修改

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`

**请求地址**：https://api.c3tech.cn/oauthentry/user/updateUserLevel?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| agentid | Long | Y | 123 | 聚宝赞用户ID |
| level | String | Y | 代言人 | 聚宝赞等级名称 |

**发货成功响应**：

```json
{
  "response": "成功;"
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "code": "1009",
    "msg": "用户不存在"
  }
}
```

