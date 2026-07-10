# 5.2.订单发货

---

**接口说明**：订单发货接口，根据子订单号可拆单发货，<font style="color:#DF2A3F;">注意：此接口多次调用会产生多次发货记录，不会覆盖原有的发货信息</font>

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/trades/orders/delivery?access_token=<span v-pre>{{access_token}}</span>

### Params参数说明
| 参数 | 类型 | 必传 | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | Y | S202008111856449962295851 | 订单号 |
| itemNo | String | Y | S2020081118564499622958511 | 子订单号(订单号+子订单id) |
| expressName | String | Y | 圆通 | 物流公司名称 |
| expressNo | String | Y | YT2355422 | 快递单号 |
| expressCode | String | Y | YT | 物流公司编码（参考下方物流公司编码链接,该值影响物流轨迹） |
| expressTime | String | N | 2024-07-12 12:00:00 | 发货时间 |
| quantity | Integer | N | 1 | 发货数量（默认为购买数量） |
| noExpress | boolean | N | false | true:无需物流   无需物流发货情况，物流信息不必填 |

_**支持物流公司编码(外部链接)**__：__/

### 成功响应

```json
{
  "response": {
    "deliver": {
      "expressCode": "YTO",
      "expressName": "圆通速递",
      "expressNo": "YT7478245407054",
      "expressTime": "2024-07-12 12:00:00",
      "oid": 1,
      "orderNo": "S20240710160529892832676",
      "quantity": 0
    },
    "success": true
  }
}
```

### 异常响应

```json
{
  "error_response": {
    "message": "发货失败",
    "code": 123005
  }
}
```

