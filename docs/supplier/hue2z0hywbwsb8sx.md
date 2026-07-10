# 修改物流

---

**接口说明**：修改物流接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/order/modifyExpress?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/order/modifyExpress?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y | S202008111856449962295851 | 订单编号 |
| orderItemNo | String | Y | S202008111856449962295851 | 子订单编号 |
| expressCode | String | Y | YT | 物流公司编码 |
| expressName | String | Y | 圆通 | 物流公司名称 |
| expressNo | String | Y | YT2355422 | 运单号 |
| tenantId | String | Y | 202 | 租户ID |

**支持物流公司编码**：[https://market.aliyun.com/products/57126001/cmapi026963.html?#sku=yuncode2096300000](https://market.aliyun.com/products/57126001/cmapi026963.html?#sku=yuncode2096300000)

**发货成功响应**：

```json
{
  "response": true
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

