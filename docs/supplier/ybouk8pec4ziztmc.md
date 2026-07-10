# 售后申请审核

---

**接口说明**：用于用户发起售后申请的审核

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/order/refundApplyAudit?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/order/refund?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/O/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y |  | 订单编号 |
| refundNo | String | Y | | 售后号 |
| sjid | number | Y |  | 商家ID |
| type | number | Y | 1 | 同意:1   拒绝:2 |
| reason | String | N | | 拒绝原因 |
| remarks | string | N | | 备注 |
| provinceName | String | O | 湖南省 | 省 |
| cityName | String | O | 长沙市 | 市 |
| districtName | String | O | 岳麓区 | 区 |
| returnReceiveAddress | String | O | | 退货地址 |
| returnReceiveMobile | String | O | | 退货联系号码 |
| returnReceiveName | String | O | | 退货联系人 |

**返回结果**：

**成功响应**：

```json
{
  "response": {
    "code": "success",
    "msg": "成功"
  }
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "msg": "失败",
    "code": 123005
  }
}
```

