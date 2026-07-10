# 批量发货

---

订单批量发货(多物流单号)

> 支持一个订单多个物流单号批量发货，以及多个订单多个物流单号批量发货。最多支持10个物流单号。
>

>> [点击进入在线调试](https://jubaozan.apifox.cn/api-107007226)

  
**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/supplier/order/batchDelivery?access_token=[token]

_**response code**_:400

批量发货失败！

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

**请求Body:**

| name | | type | required | desc |
| --- | --- | --- | --- | --- |
| | | array | | |
| | | object | | |
|  |   ├ orderNo | string | Y | 订单编号 |
|  |   ├ orderItemNo | string | Y | 子订单编号 |
|  |   ├ sjId | integer | Y | 商家id |
|  |   ├ expressNo | string | Y | 运单号 |
|  |   ├ expressName | string | Y | 快递公司名称 |
|  |   ├ expressCode | string | Y | 快递公司编码 |
|  |   └ expressTime | string | Y | 发货时间 |

_**支持物流公司编码(外部链接)**__：__/

**请求体示例:**

```json
[
  {
    "orderNo": "S202008111856449962295851",
    "orderItemNo": "S202008111856449962295851",
    "sjId": 9675,
    "expressNo": "YT2355422",
    "expressName": "圆通",
    "expressCode": "YT",
    "expressTime": "2021-10-26 11:12:45"
  }
]
```

> ### 响应部分

**Body:**

| name | | type | desc |
| --- | --- | --- | --- |
| traceId | | string | 请求标识 |
| response | | object | 响应数据 |
|  |   ├ code | string | 返回码 |
|  |   ├ msg | string | 返回信息 |
|  |   └ result | object | 响应结果 |
|  |     ├ errorNum | integer | 错误数量 |
|  |     └ errorInfos | array | 错误信息描述 |
|  |       └  | object |  |
|  |         ├ orderNo | string | 订单编号 |
|  |         ├ orderItemNo | string | 子订单编号 |
|  |         ├ tenantId | integer | 租户ID |
|  |         ├ expressNo | string | 运单号 |
|  |         ├ expressName | string | 快递公司名称 |
|  |         ├ expressCode | string | 快递公司编码 |
|  |         └ errorDesc | string | 错误信息描述 |

**成功响应示例:**

```json
{
  "traceId": "xxxxxx-xx-xx-xx",
  "response": {
    "code": "200000",
    "msg": "success",
    "result": {
      "errorNum": "10",
      "errorInfos": [
        {
          "orderNo": "S202008111856449962295851",
          "orderItemNo": "S202008111856449962295851",
          "tenantId": "202",
          "expressNo": "YT2355422",
          "expressName": "圆通",
          "expressCode": "YT",
          "errorDesc": ""
        }
      ]
    }
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

