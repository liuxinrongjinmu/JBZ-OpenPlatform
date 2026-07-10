# 10.5会员余额修改

---

**接口说明**：会员余额修改

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`

**请求地址**：https://api.c3tech.cn/oauthentry/user/updateBalance?access_token=[token]

**请求参数**

_QueryString:_

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| agentId | 是 | integer | | 会员id |
| systemName | 是 | string | | 系统名称；   (系统名称会显示在备注中) |
| remarks | 否 | string | | 备注 |
| type | 是 | string | | 修改类型， thirdAddMoney ：第三方加余额， thirdSubMoney： 第三方减余额 |
| amount | 是 | number | | 金额 |

**响应参数**

_Body:_

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| response | 否 | object | | 响应数据 |
|   ├ code | 否 | string | | 返回码 |
|   └ msg | 否 | string | | 返回信息 |
| traceId | 否 | string | | 请求标识 |

**请求示例:**

POST [https://api.c3tech.cn/oauthentry/user/updateBalance](https://api.c3tech.cn/oauthentry/user/updateUserLevel)?agentId=10001&systemName=微乐播&type=thirdAddMoney&amount=0.01

**错误响应示例**：

```json
{
  "error_response": {
    "code": "1009",
    "msg": "用户不存在"
  }
}
```

