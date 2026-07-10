# 订单取消

---

**接口说明**：<font style="color:rgb(51, 51, 51);">用于主动取消已支付待发货的订单，取消成功后，商家端同步退款给用户</font>

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/supplier/order/cancel?access_token=[token]

**参数说明**：

| r | 类型 | 必传(Y/O/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y |  | 订单编号 |
| orderItemNo | String | Y |  | 子订单编号 |
| sjid | number | Y |  | 商家ID |
| reason | number | Y | | 取消原因：   1： 质量问题     2:    不想要了     3:    多买/买错     4:    小额补偿     5:     特殊处理    6:     未发货     7:     其他     8:     快递停发  |
| remarks | string | N |  | 取消原因备注 |

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

