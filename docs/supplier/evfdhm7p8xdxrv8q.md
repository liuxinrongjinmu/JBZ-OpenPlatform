# 删除内容

---

**接口说明**：删除内容接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/cms/material/delete?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/cms/material/delete?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| id | Number | Y | 330 | 内容ID |
| tenantId | Number | N | 1003 | (JBZ)供应商ID |

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

