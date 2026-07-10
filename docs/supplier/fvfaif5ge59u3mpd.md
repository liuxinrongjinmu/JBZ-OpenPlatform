# 推送（商品）到店铺

---

**接口说明**：推送（商品）到店铺接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/goods/postToStore?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/goods/postToStore?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| supplierId | Number | Y | 123123 | (JBZ)供应商ID |
| goodsId | Number | Y | 123123 | (JBZ)商品ID |
| ~~externalGoodsId~~ | ~~String~~ | ~~Y~~ | ~~~~ | ~~外部商品ID~~ |
| hasPublish | Number | Y | | 上下架 1：出售中（上架） 0：仓库中（下架） |
| merchantIdList | **List** | Y | | 商户ID列表 |

**入参示例**：

```json
{
  "supplierId": 11,
  "goodsId": 13770,
  "merchantIdList": [
    111,
    222,
    333
  ]
}
```

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

