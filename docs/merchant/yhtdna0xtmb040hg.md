# 5.7.订单添加卖家备注

---

**接口说明**：订单添加卖家备注

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/addSellerRemark?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| tid | String | Y | S202008111856449962295851 | 订单ID |
| seller_remark | String | Y | 延到2月29发货 | 卖家备注 |

### 成功响应

```json
{
  "response": "success"
}
```

### 错误响应

```json
{
  "error_response": {
    "msg": "系统异常",
    "code": 123005
  }
}
```

