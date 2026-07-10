# 售后完成审核

---

**接口说明**：用于退货退款、换货的二审，以及仅退款、补发的售后审核

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/order/refund?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/order/refund?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/O/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y | S202008111856449962295851 | 订单编号 |
| status | String | Y | 103 | 同意:103;拒绝:104 |
| refundNo | String | Y | | 售后号 |
| reason | String | N | | 拒绝原因 |
| remarks | String | N | | 备注 |

**返回结果**：

**成功响应**：

```json
{
  "response": {
    "code": "success",
    "msg": "成功"
  }
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "msg": "失败",
    "code": 123005
  }
}
```

