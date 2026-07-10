# 批量备货

---

**接口说明**：订单批量备货接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/order/batchPrepare?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/order/batchPrepare?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |

**请求Body:**

| name | | type | required | desc |
| --- | --- | --- | --- | --- |
| | | array | | |
| | | object | | |
|  |   └ orderNo | string | Y | 订单编号 |
| | <s>─tenantId</s> | <s>string</s> | <s>Y</s> | <s>商家ID(订单信息中sjid)</s> |
|  |   ├ sjid | Long | Y | 商家ID（待上线） |
|  |   └ items | String[] | Y | 子订单编号 |

**请求体示例:**

```json
[
  {
    "orderNo": "S20241201202314821308671",
    "tenantId": "10941",
    "items": [
      "S202412012023148213086711"
    ]
  },
  {
    "orderNo": "S20241202083423110539756",
    "tenantId": "10941",
    "items": [
      "S202412020834231105397561"
    ]
  }
]
```

**备货成功响应**：

```json
{
  "response": {
    "errorNum": 0,
    "errorInfos": []
  },
  "msg": null
}
```

**错误响应示例**：

```plain
业务错误：
{
	"response": {
		"errorNum": 1,
		"errorInfos": [{
			"code": "S202210141017319956105131",
			"value": "售后中订单不能备货"
		}]
	},
	"msg": null
}

系统错误：
{
"code": 101,
"message": "系统错误",
"description": "子订单号不能为空",
"traceId": "d5974ea827562714",
"body": null,
"summary": null,
"timestamp": 1666324543,
"redirect": null,
"links": null,
"success": false

}
```

