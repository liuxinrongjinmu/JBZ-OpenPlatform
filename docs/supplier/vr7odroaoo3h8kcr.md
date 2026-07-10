# SUPPLIER_RETAIL_BIND 供货商和分销商关系

---

**接口说明**：供货商和分销商关系

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| supplierId | Number | Y | 123123 | (JBZ)供应商ID |
| merchantId | String | Y | | 分销商ID，对应分销商的商家ID（sjid） |
| name | String | Y | | 分销商名称 |
| sjname | String | N | | 分销商（店铺）名称 |
| merchantPhone | String | Y | | 分销商手机号码 |

7.2 平台推送公共参数

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

