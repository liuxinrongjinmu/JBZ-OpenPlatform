# 10.2.会员微信渠道查询

---

**接口说明**：通过用户ID查询用户的openid，unionid等渠道信息

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn/oauthentry/user/getAgentSourceInfo?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| agentid | Long | Y | 123123 | 聚宝赞用户ID |

**返回结果**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| agentid | Long | Y | 用户ID |
| sourceObjectList | List | N | 渠道信息 list |
| sourceOpenid | String | N | openid |
| source | String | N | 来源：OFFICIAL 公众号，APPLET 小程序，APP APP，MOBILE 手机号 |
| sourceAppid | String | N | 来源appid |
| unionid | String | N | 小程序或公众号绑定微信开放平台账户才有 |

**成功响应示例**：

```plain
{
	"response": {
		"agentid": 2,
		"sourceObjectList": [ { "sourceOpenid":  "xxxx", "source":  OFFICIAL , "sourceAppid":  "xxxx", "unionid":  "xxxx" } } ]
	}
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "code": "100001",
    "msg": "参数校验错误"
  }
}
```

