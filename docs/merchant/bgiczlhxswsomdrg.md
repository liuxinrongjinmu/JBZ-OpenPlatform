# 7.9.订单销售消息

---

### 接口说明：订单收益明细消息, 此消息触发场景为: 订单支付，部分退款，全额退款，订单核销，订单纠错
  
平台推送消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会推送变更事件，在半个小时内每5分钟重推一次。


**消息类型**：TRADE_SALE_DETAIL_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| tid | String | LM231958349 | Y | 订单号 |
| sjid | Long | 9601 | Y | 商家ID |
| agentid | Long | 777712 | Y | 用户ID |
| orderid | String | JBZ001 | Y | 会员编号 |
| nick | String | 用户昵称 | N | 用户昵称 |
| payTime | Date |  2024-08-03 12:34:56   | Y | 支付时间 |
| profitMoney | Double | 79.99 | Y | 订单剩余总收益 |
| businessType | String |  | Y | 推送场景:   PAY_ORDER: 订单支付   PARTIAL_REFUND：部分退款   FULL_REFUND：全额退款   ORDER_VERIFICATION：订单核销   ORDER_CORRECTION：订单纠错 |
| orderSalesDetails   | OrderSalesDetail[] |  | Y | 订单销售明细 |


**OrderSalesDetail[] 订单销售明细**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| title | String | 测试商品 | Y | 商品标题 |
| numIid | Long | 3424234 | N | 商品ID |
| skuUniqueCode | String | 42423-432221 | N | 商品Sku在系统中的唯一编码 |
| num | Long | 2 | Y | 商品购买数量 |
| payment | Double | 200.02 | Y | 实付金额。精确到2位小数，单位：元 |
| costFee | Double | 0.00 | Y | 成本价 单位：元  |
| commissionMoney | Double | 20 | Y | 已分润金额 |
| profitMoney | Double | 79.99 | Y | 剩余收益 |


### 公共请求示例


```json
{
  "id": "S20230728102*****",
  "client_id": "shex888",
  "type": "TRADE_SALE_DETAIL_STATE",
  "msg": "UrlEncode(订单msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0",
  "supplierId": 20232123
}
```


### 订单msg示例


```json
{}
```

