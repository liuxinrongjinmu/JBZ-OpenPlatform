# 5.17.售后一审

---

### 接口说明：支持审核，仅退款，退货退款，补发，换货售后申请

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/<font style="color:rgb(33, 33, 33);">refundApplyAudit</font>?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| tid | String | Y | 订单号 |
| refundNo | String | y | 售后单号 |
| status | Integer | Y | 审核状态:   102:同意<br/>103:拒绝 |
| reason | String | N | 驳回原因(拒绝必填) |
| remarks | String | N | 备注 |
| returnMethod | Integer | Y | <font style="color:rgb(51, 51, 51);">退货方式；１、物流退回；２、退回门店</font> |
| refundStore | Boolean | N | <font style="color:rgb(51, 51, 51);">退款到店长/店老板( 不传值时退给店长/店老板  )</font> |
| refundTeamLeader | Boolean | N | 是否退款到团长( 不传值时退给用户  ) |

响应：  

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| result | Boolean | Y | 成功或失败 |
| reissueTid | String | N | 补发新订单号 |

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