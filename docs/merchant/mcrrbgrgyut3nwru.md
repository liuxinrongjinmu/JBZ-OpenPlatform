# 10.12.达人等级变更

---

**接口说明**：达人等级变更

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/updateSharerLevel?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| userId | Long | Y | 123 | 聚宝赞用户ID |
| levelId | String | Y | 1001 | 聚宝赞达人等级ID |

**成功响应**：

```json
{
  "response": true
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "code": "21001",
    "msg": "用户等级变更失败"
  }
}
```

