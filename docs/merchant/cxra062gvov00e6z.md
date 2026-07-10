# 13.2.卡券核销

---

### 接口说明：<font style="color:rgb(51, 51, 51);">第三方通过接口核销聚宝赞卡券</font>


**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/userCard/writeOff?access_token=[token]

### 请求参数
#### query 参数
| 名称 | 位置 | 类型 | 必选 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| access_token | query | string | 是 |  | none |


#### body 参数
| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| cardCode | string | true | none |  | 卡券编码 |
| clerkId | integer(int64) | true | none |  | 核销员id |
| num | integer(int32) | true | none |  | 核销数 |
| outCardCode | string | true | none |  | 第三方核销券码 |
| storeId | integer(int64) | true | none |  | 核销门店 |


> Body 请求参数示例
>

```json
{
  "cardCode": "string",
  "clerkId": 0,
  "num": 0,
  "outCardCode": "string",
  "sjid": 0,
  "storeId": 0
}
```

### 返回结果返回结果
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| response | boolean | Y | 是否核销成功 |


### 正确响应示例

```json
{
  "response": true,
  "traceId": "35b8884f29ef433f"
}
```


