# 查询库存接口

---

**接口说明**：查询库存接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/goods/stock?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/goods/stock?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| supplierId | Number | Y | 123123 | (JBZ)供应商ID |
| goodsId | Number | Y | 123123 | 商品ID |
| skuId | String | N | | skuID |

**返回结果**：

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| | 否 | object[] | | |
|   ├ supplierId | 否 | integer | | 供应商id |
|   ├ goodsId | 否 | string | | 商品id |
|   ├ skuId | 否 | integer | | skuId |
|   ├ stockNum | 否 | integer | | 库存数量 |

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

