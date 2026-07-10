# SUPPLIER_TRADE_ORDER_REFUND-售后消息事件参数

---

消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会继续推送事件，推送规则：5、10、20、40、80、160分钟推送 ，共重推6次

**接口说明**：平台推送订单消息事件msg说明

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

**订单事件Msg参数说明**：

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | S20210309173048477535421 | Y | 订单编号 |
| middleId | Long | 11011 | N | 中台id |
| refundNo | String | R20210309173034324 | Y | 退款流水号 |
| money | Double | 0.00 | Y | 退款金额(按子单计算金额) |
| postFee | Double | 0.00 | Y | 运费 |
| reason | String | 无 | N | 原因 |
| type | String | REFUND_ONLY | Y | 类型: REFUND_ONLY - 仅退款     RETURN_REFUND - 退货退款    MERCHANT_REFUND-主动退款   EXCHANGE_REFUND-换货    REIMBURSE_REFUND-补偿    REISSUE_REFUND-补发 |
| refundAll | String | 1 | Y | 是否全额退款  0-否，1-是 |
| status | String | 101 | Y | 状态:    101：用户申请退款；   102：商家同意；   103：商家拒绝退款；   104：退款成功；   201：申请退货退款 ;   202：商家同意申请 ;   203：商家拒绝申请;   204：买家填写物流 ;   205：商家确认收货 ;   206：商家拒绝收货;   207：退款成功    301：主动退款；   302：已退款   501：申请换货   502：同意换货   503：拒绝换货   504：填写物流   505：确认收货   506：商家拒绝   601：申请补发   602：补发成功   603：商家拒绝补发   999：打款中   888：用户撤销；   889：（未填写物流）超时自动撤销 |
| exchangeTid | String | S20220310095448751788667 | N | 绑定换货订单号 |
| list | array | ["https://image.jbzyun.cn/xxx/xxx/material/image/678dcbe2379c4b4694f4325b4b6f5293"] | N | 售后图片 |
| createAt | Date | 2021-03-09 19:04:20 | Y | 创建时间 |
| updateAt | Date | 2021-03-11 14:56:01 | N | 更新时间 |
| retailType | Integer |  | Y | 分销商类型;(未上线)   1-商家   2-供应链 |
| retailId | Integer |  | Y | 分销商ID(未上线) |
| retailName | String |  | Y | 分销商名称(未上线) |
| items | object[] | | Y | 子订单信息 |

| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| orderItemNo | String | S202103091730484775354211 | Y | 子订单编号 |
| barcode | String | 0 | Y | 商品条码 |
| skuUniqueCode | String | 701 | Y | code |
| skuPropertiesName | String | saber | Y | SKU属性名 |
| quantity | number | 1 | Y | 售后数量 |
| express | object | | N | 物流信息 |

| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| expressCode | String | 343543543 | N | 物流单号 |
| expressName | String | 圆通 | N | 物流公司名 |
| expressType | String | YTO | N | 物流类型 |

**公共请求示例**：

```json
{
  "id": "E20141119131459763628",
  "client_id": "shex888",
  "type": " SUPPLIER_TRADE_ORDER_REFUND",
  "msg": "UrlEncode(订单msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```

**msg示例**：

```json
{
  "orderNo": "S20211115103952599630171",
  "refundNo": "R2021111510395259345345",
  "money": 20,
  "reason": "不喜欢",
  "type": 1,
  "createAt": "2021-11-18T09:11:26",
  "updateAt": "2021-11-18T09:11:26",
  "items": [
    {
      "orderItemNo": "S202111151039525996301711",
      "barcode": "3263",
      "skuPropertiesName": "灰色",
      "skuUniqueCode": "101"
    }
  ],
  "express": {
    "expressCode": "123456456",
    "expressName": "圆通",
    "expressType": "YTO"
  }
}
```

