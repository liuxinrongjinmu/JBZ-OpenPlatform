# 备货

---

**接口说明**：订单备货接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/order/prepare?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/order/prepare?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y | S202008111856449962295851 | 订单编号 |
| items | String[] | Y | S2020081118564499622958511 | 子订单信息(订单编码+oid) |

**备货成功响应**：

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

