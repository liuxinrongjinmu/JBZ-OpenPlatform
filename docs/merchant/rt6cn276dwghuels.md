# 10.8.查询会员顶级经销商

---

**接口说明**：会员顶级经销商信息查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn**/oauthentry/open/v2/sj/agent/getTopChannelAgent?access_token=<span v-pre>{{access_token}}</span>

**请求参数**

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |

Body（application/json）：

| agentId | 是 | integer | | 会员id |
| --- | --- | --- | --- | --- |

**响应参数**

_Body:_

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| response | 否 | object | | 响应数据 |
|   ├ code | 否 | string | | 返回码 |
|   ├ msg | 否 | string | | 返回信息 |
|   └ result | 否 | object | | 响应结果 |
|     ├ headUrl | 是 | string | | 头像地址 |
|     ├ orderId | 是 | string | | 会员编号 |
|     ├ mobile | 是 | string | | 手机号 |
|     ├ nick | 否 | string | | 昵称 |
| traceId | 否 | string | | 请求标识 |

**错误响应示例**：

```json
{
  "error_response": {
    "code": "1009",
    "msg": "用户不存在"
  }
}
```

