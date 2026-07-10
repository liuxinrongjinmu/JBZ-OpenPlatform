# 4.7.库存变更

---

### 接口说明：通过此接口可增减商品库存

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/goods/external/stockUpdate?access_token=[token]](https://api.c3tech.cn/oauthentry/goods/external/stockUpdate?access_token=%5Btoken%5D)

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| numIid | Number | Y | 123123 | (JBZ)商品ID |
| ~~externalNumberId~~ | ~~String~~ | ~~N~~ | ~~~~ | ~~外部商品ID~~ |
| skuList | **StructurizationSKUList** | Y |  | SKU列表 |
| quantity | Number | N | 101 | 数量(无SKU时) |

**StructurizationSKUList商品SKU**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuUniqueCode | String | Y | 01001-02001 | sku规格编码 |
| skuUniqueName | String | Y | 黑色,XL | sku名称 |
| sjCode | String | N |  | 商品自定义编码 |
| quantity | Number | Y | 10 | 变更数量，正数表示增加库存数，负数表示减少库存数 |

### 成功响应

```json
{
  "response": {
    "code": "success",
    "msg": "成功"
  }
}
```

### 错误响应示例

```json
{
  "error_response": {
    "msg": "失败",
    "code": 123005
  }
}
```