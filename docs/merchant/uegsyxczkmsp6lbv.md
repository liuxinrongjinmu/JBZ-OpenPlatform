# 7.8.优选联盟订单消息

---

### 接口说明：平台推送消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会推送变更事件，在半个小时内每5分钟重推一次。


**消息类型**：LM_TRADE_ORDER_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| tid | String | LM231958349 | Y | 订单号 |
| type | String | FIXED | Y | 交易类型，<br/>FIXED （一口价）RECOMMEND  （礼包商品）<br/>VALET（代客下单） |
| status | String | WAIT_BUYER_PAY | N | 交易状态。TRADE_NO_CREATE_PAY (没有创建支付交易)<br/> WAIT_BUYER_PAY (等待买家付款) <br/>WAIT_PAY_RETURN (等待支付确认)<br/> WAIT_GROUP（等待成团，即：买家已付款，等待成团）WAIT_SELLER_SEND_GOODS (等待卖家发货，即：买家已付款)<br/>WAIT_BUYER_CONFIRM_GOODS (等待买家确认收货，即：卖家已发货) <br/>TRADE_BUYER_SIGNED (买家已签收) <br/>TRADE_CLOSED (付款以后用户退款成功，交易自动关闭) <br/>TRADE_CLOSED_BY_USER (付款以前，卖家或买家主动关闭交易) |
| updateTime | String | 2000-01-01 00:00:00 | Y | 交易更新时间。当交易的：状态改变、备注更改 等情况下都会刷新更新时间 |
| created | String | 2000-01-01 00:00:00 | Y | 交易创建时间 |
| payTime | String | 2000-01-01 00:00:00 | Y | 买家付款时间 |
| payType | String | ALIPAY | Y | 支付类型。取值范围：WEIXIN (微信自有支付)ALIPAY (支付宝支付)BANKCARDPAY (银行卡支付)PEERPAY (代付)CODPAY (货到付款)PRESENTTAKE (直接领取赠品)COUPONPAY（优惠券/码全额抵扣）UNIONPAY_WEIXIN（银联支付） |
| totalFee | Double | 200.02 | Y | 商品总价（商品价格乘以数量的总金额）。单位：元，精确到分 |
| discountFee | Double | 0.02 | Y | 交易优惠金额（不包含交易明细中的优惠金额）。单位：元，精确到分 |
| postFee | Double | 15.02 | N | 邮费 |
| payment | Double | 202.03 | Y | 实付金额。单位：元，精确到分 |
| refundAmount | Double |  | N | 退款金额。单位：元，精确到分 |
| consignTime | String | 2000-01-01 00:00:00 | N | 卖家发货时间 |
| outOrderNo | String |  | N | 优选联盟机构订单号 |
| orders | **orders[]** | **[]** | Y | 子订单明细 |
| agentInfo | AgentInfo |  | Y | 下单人信息 |
| zmrAgentInfo | AgentInfo |  | N | 推荐人信息 |
| talentInfo | LmAgentInfo |  | N | 主播信息 |
| sharerInfo  | LmAgentInfo |  | N | 达人信息（推客/带货）  |
| commissionInfo | Commission |  | N | 佣金信息 |


**orders[]子订单明细**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| oid | String | 1 | Y | 子订单ID |
| numiid | Long | 3424234 | N | 商品ID |
| skuUniqueCode | String | 42423-432221 | N | 商品Sku在系统中的唯一编码 |
| num | Long | 2 | Y | 商品购买数量 |
| title | String | 山寨版测试机器 | Y | 商品标题 |
| retailPrice | Double | 200.02 | Y | 商品销售价. 精确到2位小数；单位：元 |
| price | Double | 200.02 | Y | 商品价格。精确到2位小数；单位：元 |
| totalFee | Double | 200.02 | Y | 应付金额（商品价格乘以数量的总金额） |
| costFee | Double | 0.00 | Y | 成本价 单位：元  |
| supplyPrice | Double | 55.55 | Y | 结算价 |
| actualDiscountFee | Double | 0 | Y | 交易明细内的优惠金额。精确到2位小数，单位：元 |
| payment | Double | 200.02 | Y | 实付金额。精确到2位小数，单位：元 |
| skuPropertiesName | String | 颜色:桔色;尺码:M | Y | SKU的值，即：商品的规格。如：机身颜色:黑色;手机套餐:官方标配 |
| picThumbPath | String | [https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg](https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg) | N | 商品主图片缩略图地址 |
| goodsId | Long |  | N | 供应商商品ID |
| outProductId | Long |  | N | 商品外部productid |
| outSkuId | Long |  | N | 商品外部skuid |


**LmAgentInfo 达人信息**

| agentid | number |  | Y | 聚宝赞用户ID |
| --- | --- | --- | --- | --- |
| nick | String |  | N | 聚宝赞用户昵称 |
| orderid | String |  | Y | 聚宝赞会员编号 |
| id | String |  | N | ID |
| nickName | String |  | N | 昵称 |
| ratio | double |  | N | 佣金率 |
| amount | double |  | N | 佣金(单位 元， 保留2位小数) |


**AgentInfo 用户信息**

| agentid | number |  | Y | 用户ID |
| --- | --- | --- | --- | --- |
| nick | String |  | N | 昵称 |
| mobile | String |  | N | 手机号 |
| orderid | String |  | Y | 会员编号 |
| fxid | number |  | N | 等级Id |
| fxname | String |  | N | 等级名称 |
| externalId | String |  | N | 外部id |


**Commission 佣金信息**

| ratio | double |  | N | 佣金服务率 |
| --- | --- | --- | --- | --- |
| amount | String |  | N | 佣金服务费 |
| settlementTime | String |  | N | 佣金结算时间 |
| status | String |  | N | 佣金结算状态   20：未结算   100：已结算   200： 取消结算 |


### 公共请求示例


```json
{
  "id": "S20230728102*****",
  "client_id": "shex888",
  "type": " LM_TRADE_ORDER_STATE",
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

