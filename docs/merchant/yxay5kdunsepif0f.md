# 9.3.积分余额查询

---

**接口说明**：查询个人积分余额接口

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn/oauthentry/score/getAgentScore?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| agentId | Integer(64) | Y | 1000123 | 会员id |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | Integer(32) | Y | 130 | 用户的积分余额 |

### 成功响应

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": 130
  }
}
```

