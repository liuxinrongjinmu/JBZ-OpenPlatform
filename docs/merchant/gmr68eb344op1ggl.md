# 10.9.会员账号校验

---

**接口说明**：校验用户账号与密码是否正确

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/info/verityUser?access_token=<span v-pre>{{access_token}}</span>

**请求参数**

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |

Body（application/json）：

| mobile | 是 | String | | 会员手机号 |
| --- | --- | --- | --- | --- |
| password | 是 | String | | 会员密码 MD5值 |

**响应参数**

_Body:_

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| traceId | 是 | string |  | 请求号 |
| response | 否 | object | | 响应数据 |
|   ├ code | 否 | string | | 返回码 |
|   ├ msg | 否 | string | | 返回信息 |
|   └ result | 否 | object | | 响应结果 |
|     ├ headurl | 是 | string | | 头像地址 |
|     ├ orderid | 是 | string | | 会员编号 |
|     ├ mobile | 是 | string | | 手机号 |
|     ├ nick | 否 | string | | 昵称 |
|     ├ agentid | 是 | number | | 会员id |
|     ├ fxid | 是 | number | | 等级id |
|     ├ fxname | 是 | string | | 等级名称 |
|     ├ name | 是 | string | | 会员名称 |
|     ├ sjid | 是 | number | | 商家ID |
|     ├ zmrid    | 否 | number | | 招募人 |
|     ├ status | 是 | number | | 用户状态 0:待审  1:通过 2:冻结 |
|     ├ createdate | 是 | string | | 创建时间 |

**正确响应示例：**

```json
{
  "traceId": "4caea2a1f16981cf",
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "agentid": 320078471,
      "mobile": "17352800165",
      "fxid": 4444,
      "sjid": 9601,
      "fxname": "粉丝",
      "name": "17352800165",
      "zmrid": 0,
      "nick": "17352800165",
      "createdate": "2024-12-05T15:33:35",
      "orderid": "YS37172",
      "status": 1
    }
  }
}
```

**错误响应示例**：

```json
{
  "traceId": "178899eaa231d123",
  "error_response": {
    "code": "20002",
    "msg": "用户不存在"
  }
}
```

错误码列表：

| 20001 | 参数错误 |
| --- | --- |
| 20002 | 用户不存在 |
| 20003 | 用户密码未设置 |
| 20004 | 用户密码验证频繁,需等待后重试 |
| 20005 | 用户账号密码验证失败 |
