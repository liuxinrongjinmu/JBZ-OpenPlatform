# 6.5.查询视频号小店TOKEN

---

**接口说明**：查询视频号小店TOKEN( 聚宝赞与视频号小店token每个整点五分（例如 08:05 ）刷新一次。  )

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn**/oauthentry/open/v2/sj/sphxd/getToken?access_token=<span v-pre>{{access_token}}</span>

**请求参数**

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |

Body（application/json）：

| appId | 是 | string | | 视频号小店appid |
| --- | --- | --- | --- | --- |

**响应参数**

_Body:_

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| response | 否 | object | | 响应数据 |
|   ├ code | 否 | string | | 返回码 |
|   ├ msg | 否 | string | | 返回信息 |
|   └ result | 否 | object | | 响应结果 |
|     ├ token | 是 | string | | token |
| traceId | 否 | string | | 请求标识 |

**错误响应示例**：

```json
{
  "error_response": {
    "code": "50000",
    "msg": "视频号小店id不存在"
  }
}
```

