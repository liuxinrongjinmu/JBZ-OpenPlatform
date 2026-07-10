# 11.7.查询用户归属门店

---

## 接口说明

查询用户归属门店

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/getUserStore?access_token=[token]
## 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| userIds | List&lt;Long&gt; | Y | 用户ID |

## 返回结果

`List&lt;UserStoreVO&gt;`

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| userId | Long | N | 用户ID |
| storeId | Long | N | 归属门店ID |
| storeName | String | N | 归属门店名称 |
| clerkUserId | Long | N | 归属店员ID |
| clerkBindTime | LocalDateTime | N | 归属店员绑定时间 |


### 正确响应示例

```json
{
  "response": [
    {
      "storeId": 123,
      "storeName": "门店名称"
    }
  ],
  "traceId": "fbf3dabe7b13dbd7"
}
```


### 错误响应示例

```json
{}
```
