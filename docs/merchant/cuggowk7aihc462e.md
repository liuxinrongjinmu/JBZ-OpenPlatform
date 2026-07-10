# 11.12.门店分组明细列表

---

**接口说明**：查询门店分组列表

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/queryStoreByGroup?access_token=[token]

**参数说明**：


| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| groupId | Long | Y | 分组ID |
| pageNo | Integer | Y | 页码 |
| pageSize | Integer | Y | 分页数 |

**返回结果**


`List&lt;StoreGroupVO&gt;`

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| storeId | Long | Y | 门店ID |
| storeName | String | Y | 门店名称 |
| storeStatus | Integer | Y | 门店状态描述 |


### 正确响应示例

```json
{
  "response": [
    {
      "storeId": 1195164,
      "storeName": "创建门店bt",
      "storeAddress": "河北省-石家庄市-桥西区-第三方",
      "storeStatus": "停用"
    }
  ],
  "traceId": "ee9d4c492bc5e693"
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": 902,
    "message": "门店查询失败"
  }
}
```
