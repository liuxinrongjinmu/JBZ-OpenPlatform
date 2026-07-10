# 10.11.获取会员Token

---

**接口说明**：获取用户token

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn/oauthentry/user/getH5Token?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |
| unionId | Number | O | 123456 | 聚宝赞用户unionId<br/>(用户ID或unionId必传其一) |
| userId | Number | O |  | 聚宝赞用户ID<br/>(用户ID或unionId必传其一) |
| type | String | O | H5 | token类型: 未上线   H5:  h5Token   APP：appToken   （不传默认H5 Token） |

**

**响应参数**

_Body:_

| 名称 | 必选 | 类型 | 描述 |
| --- | --- | --- | --- |
| traceId | 是 | string | 请求号 |
| response | 否 | object | 响应数据 |
|   ├ token | 否 | string | h5token |
|   ├ expiresAt | 否 | long | 过期时间 |

**正确响应示例**：

```json
{
  "response": {
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXlsb2FkIjoie1wibWVyY2hhbnRJZFwiOlwiOTUzOFwiLFwiZXhwaXJlXCI6NjAsXCJ0b2tlblRpbWVcIjowLFwidXNlclR5cGVcIjpcIjBcIixcImtleVR5cGVcIjpcInVzZXJpZFwiLFwidXNlcktleVwiOlwiMTEwMDA0OTY5NlwifSIsImV4cCI6MTc0OTc5NDAwNiwiaWF0IjoxNzQ5NzkzOTQ2fQ.o3wcg4VDoEGpO7zAwwFqPlXk5uLNTJBD5mvKvobMZS0",
    "expiresAt": 1749794006000
  },
  "traceId": "6596f0ca72d44c17"
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "code": "101",
    "message": "用户不存在",
    "msg": "用户不存在"
  },
  "traceId": "108915b415859721"
}
```

