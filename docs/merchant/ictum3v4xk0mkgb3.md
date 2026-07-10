# 5.18.售后二审

---

### 接口说明：支持审核，，退货退款，换货

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/refundFinalAudit?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| tid | String | Y | 订单号 |
| refundNo | String | y | 售后单号 |
| status | Integer | Y | 审核状态:   1:同意<br/>2:拒绝 |
| reason | String | N | 驳回原因(拒绝必填) |
| remarks | String | N | 备注 |
| inventory | Boolean | N | 是否入库 |
| refundStore | Boolean | N | 退款到店长/店老板( 不传值时退给店长/店老板  ) |
| refundTeamLeader | Boolean | N | 是否退款到团长( 不传值时退给用户  ) |

响应：  

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| errorInfo | ErrorInfo | Y | 失败原因 |
| orderList | `List<OrderVO>` | N | 订单列表 |

ErrorInfo

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| code | String | Y | 错误码 |
| value | String | Y | 失败原因 |

OrderVO

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| orderNo | String | Y | 订单号 |
| numIid | Long | Y | 商品ID |
| skuId | Long | N | 规格ID |
| skuUniqueName | String | N | 规格名称 |
| num | Long | N | 数量 |

### 正确响应示例

```json
{
  "response": {
    "result": true,
    "reissueTid": "xxx"
  },
  "traceId": "bd0698d821f0576e"
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": "902",
    "message": "退款失败"
  }
}
```