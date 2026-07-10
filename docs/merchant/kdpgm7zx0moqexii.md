# 5.4.订单退款审核

---

**接口说明**：第三方可通过此接口，处理订单售后审核(仅支持 仅退款)

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/refundAudit?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| tid | String | Y | | JBZ订单号 |
| refundNo | String | Y | | 售后单号 |
| status | String | Y | 103 | 同意退款:102;<br/>拒绝退款:103; <br/>用户取消退款:105; |
| reason | String | N | | 拒绝原因 |
| remarks | String | N | | 备注 |

### 成功响应

```json
{
  "response": true
}
```

### 错误响应

```json
{
  "error_response": {
    "msg": "失败",
    "code": 123005
  }
}
```

