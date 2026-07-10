# 5.27.虚拟商品核销

---

接口说明

开放平台虚拟商品核销接口。第三方可通过此接口对虚拟商品（如电子卡券、充值等）进行子订单级别的核销操作。支持部分成功部分失败。

**请求方式**：POST（HTTPS）

**请求头**：Content-Type：application/json

**请求地址**：https://api.c3tech.cn/oauthentry/v2/trades/orders/item/verify?access_token=[token]

参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| userId | Long | N | 10001 | 操作人用户ID |
| storeId | Long | N | 2001 | 核销门店ID |
| itemRecords | `List<ItemRecord>` | Y |  | 核销记录列表 |

ItemRecord

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | Y | S20220214103724410190116 | 订单号 |
| oid | Integer | Y | 1 | 子订单ID |
| num | Integer | Y | 1 | 核销数量 |

返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | Y | S20220214103724410190116 | 订单号 |
| oid | Integer | Y | 1 | 子订单ID |
| errorMsg | String | N | 商品库存不足 | 错误信息，为空表示核销成功 |

### 正确响应示例

```json
{
  "code": "200",
  "message": "success",
  "response": [
    {
      "orderNo": "S20220214103724410190116",
      "oid": 1,
      "errorMsg": null
    },
    {
      "orderNo": "S20220214103724410190117",
      "oid": 1,
      "errorMsg": "商品库存不足"
    }
  ],
  "error_response": null
}
```

### 错误响应示例

```json
{
  "code": "102",
  "message": "系统错误",
  "response": null,
  "error_response": {
    "code": "102",
    "msg": "订单服务调用失败"
  }
}
```