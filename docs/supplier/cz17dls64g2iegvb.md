# 库存变更接口

---

**接口说明**：库存变更接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/goods/stockUpdate?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/goods/stockUpdate?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| ~~supplierId~~ | ~~Number~~ | ~~N~~ | ~~123123~~ | ~~(JBZ)供应商ID~~ |
| goodsId | Number | Y | 123123 | (JBZ)商品ID |
| ~~externalGoodsId~~ | ~~String~~ | ~~Y~~ | ~~~~ | ~~外部商品ID~~ |
| skuList | **StructurizationSKUList** | Y | | SKU列表 |

**StructurizationSKUList商品SKU**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuUniqueCode | String | N | 1001-2001 | sku编码(编码/名称必须传一个) |
| skuUniqueName | String | N | 黑色,XL | sku名称(编码/名称必须传一个) |
| quantity | Number | Y | 10 | 数量 |

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

