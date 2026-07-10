# 5.22.退货退款-立即退款

---

**接口说明**：仅限用户申请退货退款,未上传物流前可用

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/fastRefundSkipReceive?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| refundNo | String | y | 售后单号 |
| refundTeamLeader | boolean | N | 是否退款到团长( 不传值时退给用户  ) |
| refundStore | boolean | N | 退款到店长/店老板( 不传值时退给店长/店老板  ) |


### 正确响应示例

```json
{
  "response": true,
  "traceId": "bd0698d821f0576e"
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "902",
    "message": "调用异常"
  }
}
```

