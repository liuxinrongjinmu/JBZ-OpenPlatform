# 商品内容关联

---

**接口说明**：商品内容关联接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/cms/material/goods/add?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/cms/material/goods/add?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| materialId | Number | Y | 330 | 内容ID |
| tenantId | Number | N | 1003 | (JBZ)供应商ID |
| goodsId | Number | Y | 100021 | 商品ID |

**成功响应**：

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": true
  }
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "msg": "错误信息",
    "code": 123005
  }
}
```

