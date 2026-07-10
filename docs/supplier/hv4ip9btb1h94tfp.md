# 商品上下架接口

---

**接口说明**：商品上下架接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/goods/updateGoodsPublish?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/goods/updateGoodsPublish?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| supplierId | Number | N | 123123 | (JBZ)供应商ID |
| goodsId | Number | Y | 123123 | (JBZ)商品ID |
| ~~externalGoodsId~~ | ~~String~~ | ~~Y~~ | ~~~~ | ~~外部商品ID~~ |
| hasPublish | Number | Y | | 上下架 1：出售中（上架） 0：仓库中（下架） |
| goodsPushRelList | **GoodsPushRel** | N | | 商品发布关系集合,未指定则发布所有分销商(根据2.3供应商绑定列表获取分销商ID) |

**GoodsPushRel 商品发布关系**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| retailId | Number | Y | | 需要发布的分销商ID |
| relationType | Number | Y | | 发布关系: 1->供应商到商家,2->供应商到中台 |

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

