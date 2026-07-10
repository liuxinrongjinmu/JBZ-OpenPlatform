# 5.16.订单退款

---

**接口说明**：商家主动退款给用户; 若订单全额退款最后笔子订单默认退运费

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/merchantRefund?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| orderNo | String | Y | 订单号 |
| orderItemNo | String | y | 子订单号 |
| reason | Integer | Y | 退款原因:   1： 质量问题     2:    不想要了     3:    多买/买错     4:    小额补偿     5:     特殊处理    6:     未发货     7:     其他     8:     快递停发 |
| remarks | String | N | 退款备注 |
| refundTeamLeader | Boolean | N | 是否退款到团长( 不传值时退给用户  ) |
| refundStore | Boolean | N | 退款到店长/店老板( 不传值时退给店长/店老板  ) |
|  goodsNum   | Integer | N | 退款商品数量 |


### 正确响应示例

```json
{
  "response": true
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

