# 批量覆盖物流发货

---

批量覆盖订单物流发货(多物流单号)

> 支持一个订单多个物流单号批量覆盖发货，以及多个订单多个物流单号批量覆盖发货。最多支持10个物流单号。
>

>>[点击进入在线调试](https://jubaozan.apifox.cn/api-107007227)

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/supplier/order/batchUpdateDelivery?access_token=[token]

_**response code**_:400

批量更新物流失败！

响应内容:

```json
{
  "traceId": "",
  "error_response": {
    "code": "",
    "msg": "",
    "result": null
  }
}
```

> ### 请求部分

**请求头**：`Content-Type：application/json`

| name | value | required | desc |
| --- | --- | --- | --- |
| Content-Type | application/json | YES | |

**请求参数:**

| name | value | required | desc |
| --- | --- | --- | --- |
| access_token | 66452a82-4b0b-4ace-8cd5-06288f86e923 | YES | 授权令牌 |

**请求body:**

| name | | type | required | desc |
| --- | --- | --- | --- | --- |
| | | array | | |
| | | object | | |
|  |   ├ orderNo | string | Y | 订单编号 |
|  |   ├ orderItemNo | string | Y | 子订单编号 |
|  |   ├ tenantId | integer | N | 租户ID |
|  |   ├ sjId | integer | Y | 商家id |
|  |   ├ phone | string | Y | 收货人电话 |
|  |   ├ expressNo | string | Y | 运单号 |
|  |   ├ expressName | string | Y | 快递公司名称 |
|  |   └ expressCode | string | Y | 快递公司编码 |

_**支持物流公司编码(外部链接)**__：__/

**请求体示例:**

```json
[
  {
    "orderNo": "S202008111856449962295851",
    "orderItemNo": "S202008111856449962295851",
    "tenantId": "202",
    "phone": "17673134006",
    "expressNo": "YT2355422",
    "expressName": "圆通",
    "expressCode": "YT"
  }
]
```

> ### 请求响应

**响应body:**

| name | | type | desc |
| --- | --- | --- | --- |
| traceId | | string | 请求标识 |
| response | | object | 响应数据 |
|  |   ├ code | string | 返回码 |
|  |   ├ msg | string | 返回信息 |
|  |   └ result | object | 响应结果 |

**成功响应示例:**

```json
{
  "traceId": "xxxxxx-xx-xx-xx",
  "response": {
    "code": "200000",
    "msg": "success",
    "result": null
  }
}
```

## 响应结构说明
> 可以用简单的逻辑区分请求调用成功或者失败，在请求响应`json`数据中，返回则包含`response`属性为成功，返回包含`error_response`属性为失败。请求标识`traceId`可以用来追踪程序的详细错误，当您调用接口异常时可以将该字段值反馈给我们。返回码的含义请参照以下表格：
>

| **code** | **返回码描述** |
| --- | --- |
| 200000 | 请求成功 |
| 400001 | 参数校验失败 |
| 500000 | 服务内部异常 |
| 500001 | 服务远程调用失败 |

