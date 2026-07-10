# 10.14.修改会员信息

---

**接口说明**：会员信息修改

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/update?access_token=[token]

**请求参数**

| 参数 | | 类型 | 必传 | 示例值 | 说明 |
| --- | --- | --- | --- | --- | --- |
| userId | | Long | Y | 11123 | 聚宝赞用户ID |
| nick | | String | Y | 鱼干不知道 | 昵称 |
| headUrl | | String | Y |  | 头像 |

**响应参数**

_Body:_

| 名称 | 类型 | 必选 | 描述 |
| --- | --- | --- | --- |
| response | boolean | 是 | 修改成功/失败 |

**成功响应：**

```json
{
  "response": true,
  "traceId": "5dcfd6300ec1a28c"
}
```

**错误响应示例：**

```json
{
  "error_response": {
    "code": "300001",
    "message": "参数校验错误，参数不能为空",
    "msg": "参数校验错误，参数不能为空"
  },
  "traceId": "a9a5f72b29f026d1"
}
```

