# 5.23.门店确认收货同步接口

---

**接口说明**：门店确认收货同步接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/storeConfirmReceipt?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| orderId | String | Y | 订单号 |
| refundNo | String | y | 售后单号 |
| status | Integer | Y | 门店确认收货：1、确认收货 |
| remarks | String | Y | 备注信息 |
| images | List | Y | 凭证图片，限制 6 张 |

### 请求示例

```json
{
  "orderId": "202604270001",
  "refundNo": "RF202604270001",
  "status": 1,
  "remarks": "门店已确认收货",
  "images": [
    "https://example.com/proof/img_01.jpg",
    "https://example.com/proof/img_02.jpg"
  ]
}
```

可以通过传递空字符串来清除数据。

### 成功响应

```json
{
  "code": "200",
  "msg": "成功",
  "data": true
}
```

### 错误响应

```json
{
  "code": "400",
  "msg": "参数校验失败: orderId不能为空; refundNo不能为空; status不能为空",
  "data": null
}
```

