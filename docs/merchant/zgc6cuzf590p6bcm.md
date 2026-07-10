# 11.2.删除门店

---

**接口说明**：创建或修改门店

**请求方式**：DELETE（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/deleteStore?access_token=[token]

### 请求参数（Query）
| 名称 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| storeId | Integer | true | 聚宝赞门店id修 |

### 返回结果

| 名称 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| response | boolean | false | 是否删除成功 |
| traceId | string | false | traceId |


### 正确响应示例

```json
{
  "response": true,
  "traceId": "string"
}
```

