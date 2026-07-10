# 10.13.会员余额批量修改

---

**接口说明**：会员余额修改

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/batchUpdateBalance?access_token=[token]

**请求参数**

| 参数 | | 类型 | 必传 | 示例值 | 说明 |
| --- | --- | --- | --- | --- | --- |
| batchNo | | String | Y |  | 业务操作批次号(需唯一) |
| items | | List | Y |  |  |
|  |   ├ userId | Long | Y | YT | 会员ID（聚宝赞用户ID） |
|  |   ├ remarks | String | Y | 圆通 | 备注 |
|  |   ├ type | string | Y |  | 修改类型:    thirdAddMoney ：第三方加余额    thirdSubMoney： 第三方减余额 |
|  |   └ amount | number | 是 |  | 金额 |

**响应参数**

_Body:_

| 名称 | | 类型 | 必选 | 描述 |
| --- | --- | --- | --- | --- |
| response | | object | 是 | 响应数据 |
|  |   ├ success | boolean | 是 |  |
|  |   ├ errorNum | integer | 是 | 错误数量 |
|  |   └ errorInfos | array | 否 | 错误信息描述 |
|  |     └  | object |  |  |
|  |       ├ userId | string | 是 | 用户ID |
|  |       ├ errorDesc | string | 是 | 错误信息描述 |
|  |       └ errorCode | string | 是 | 错误信息编码   10001:用户不存在   10002:用户余额不足 |

**成功响应：**

```json
{
  "response": true
}
```

**错误响应示例：**

```json
{
  "error_response": {
    "code": "101",
    "message": "处理用户余额修改异常",
    "msg": "处理用户余额修改异常"
  },
  "traceId": "90e8271d6bc0739e"
}
```

