# 退款地址同步

---

**接口说明**：退款地址同步接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/order/refund/returnAddress?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/order/refund/returnAddress?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/O/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y | S202008111856449962295851 | 订单编号 |
| sjId | String | Y | 202 | 商家ID |
| provinceName | String | Y | 湖南省 | 省 |
| cityName | String | Y | 长沙市 | 市 |
| districtName | String | Y | 岳麓区 | 区 |
| refundNo | String | Y | | 退款流水号 |
| returnReceiveAddress | String | O | | 退货地址 |
| returnReceiveMobile | String | O | | 退货联系号码 |
| returnReceiveName | String | O | | 退货联系人 |

**返回结果**：

**成功响应**：

```json
{
  "response": true,
  "msg": null
}
```

**错误响应示例**：

```plain
{
"code": 101,
"message": "系统错误",
"description": "\[E\]open-service, /oauthentry/supplier/order/refund/returnAddress, 未查到相关售后信息",
"traceId": "7b35d14e709733d1",
"body": null,
"summary": null,
"timestamp": 1666703269,
"redirect": null,
"links": null,
"success": false
}
```

