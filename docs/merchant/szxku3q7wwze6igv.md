# 7.3.订单消息

---

### 接口说明：平台推送订单消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会推送订单最后订单状态变更事件，在半个小时内每5分钟重推一次。

**消息类型**：TRADE_ORDER_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| tid | String | E231958349 | Y | 订单号 |
| num | Long | Y | 1 | 商品购买数量。当一个trade对应多个order的时候，值为所有商品购买数量之和(除礼包商品(type= RECOMMEND)外,礼包商品num是礼包的数量。) |
| num_iid | Long | 3424234 | Y | 商品数字编号。当一个trade对应多个order的时候，值为第一个交易明细中的商品的编号 |
| title | String | 新款连衣裙 | Y | 交易标题，以首个商品标题作为此标题的值 |
| type | String | FIXED | Y | 交易类型，FIXED （一口价）RECOMMEND  （礼包商品）VALET（代客下单） |
| status | String | WAIT_BUYER_PAY | N | 交易状态。TRADE_NO_CREATE_PAY (没有创建支付交易) WAIT_BUYER_PAY (等待买家付款) WAIT_PAY_RETURN (等待支付确认) WAIT_GROUP（等待成团，即：买家已付款，等待成团）WAIT_SELLER_SEND_GOODS (等待卖家发货，即：买家已付款)<br/>WAIT_BUYER_CONFIRM_GOODS (等待买家确认收货，即：卖家已发货) TRADE_BUYER_SIGNED (买家已签收) TRADE_CLOSED (付款以后用户退款成功，交易自动关闭) TRADE_CLOSED_BY_USER (付款以前，卖家或买家主动关闭交易) |
| update_time | String | 2000-01-01 00:00:00 | Y | 交易更新时间。当交易的：状态改变、备注更改 等情况下都会刷新更新时间 |
| created | String | 2000-01-01 00:00:00 | Y | 交易创建时间 |
| pay_time | String | 2000-01-01 00:00:00 | Y | 买家付款时间 |
| pay_type | String | ALIPAY | Y | 支付类型。取值范围：WEIXIN (微信自有支付)ALIPAY (支付宝支付)BANKCARDPAY (银行卡支付)PEERPAY (代付)CODPAY (货到付款)PRESENTTAKE (直接领取赠品)COUPONPAY（优惠券/码全额抵扣）UNIONPAY_WEIXIN（银联支付） |
| feedback | Long | 0 | Y | 交易维权状态。0 无维权，1 顾客发起维权，2 顾客拒绝商家的处理结果，3 顾客接受商家的处理结果，9 商家正在处理,101 维权处理中（买家首次发起维权后）,102等待卖家同意退款申请（维权失败过），103卖家不同意退款申请（卖家拒接），104已经申请维权有客服介入中，105卖家已经同意退款，106已经退货等待卖家确认收货，107维权关闭（买家主动取消维权），109等待买家退货,110 退款成功（卖家同意退款成功，维权结束）。 |
| refund_state | String | NO_REFUND | Y | 退款状态。取值范围：NO_REFUND（无退款）PARTIAL_REFUNDING（部分退款中）PARTIAL_REFUNDED（已部分退款）PARTIAL_REFUND_FAILED（部分退款失败）FULL_REFUNDING（全额退款中）FULL_REFUNDED（已全额退款）FULL_REFUND_FAILED（全额退款失败） |
| total_fee | Double | 200.02 | Y | 商品总价（商品价格乘以数量的总金额）。单位：元，精确到分 |
| discount_fee | Double | 0.02 | Y | 交易优惠金额（不包含交易明细中的优惠金额）。单位：元，精确到分 |
| post_fee | Double | 15.02 | N | 邮费 |
| payment | Double | 202.03 | Y | 实付金额。单位：元，精确到分 |
| total_score | Double |  | N | 积分 |
| consign_time | String | 2000-01-01 00:00:00 | N | 买家签收时间 |
| ~~sign_time~~ | ~~String~~ | ~~2000-01-02 12:00:00~~ | ~~N~~ | ~~买家签收时间~~ |
| receiver_state | String | 浙江省 | N | 收货人的所在省份 |
| receiver_city | String | 杭州市 | N | 收货人的所在城市 |
| receiver_district | String | 西湖区 | N | 收货人的所在地区 |
| receiver_street | String | xx街道 | N | 收货人的所在街道 |
| receiver_name | String | 东方败家 | N | 收货人的姓名 |
| receiver_address | String | 华夏路#12 | N | 收货人的详细地址 |
| receiver_zip | String | 223700 | N | 收货人的邮编 |
| receiver_mobile | String | 13512501826 | N | 收货人的手机号码 |
| openid | String | wxllkkksssd | N | 下单人Openid |
| buyer_nick | String | Hunter | N | 下单人昵称 |
| mobile | String | 13116278956 | N | 下单人手机号 |
| buyer_message | String | 快点发货 | N | 买家留言 |
| orderid | String | 888 | N | 下单人会员编号 |
| deptId | Long |  | N | 门店ID |
| deptName | String |  | N | 门店名称 |
| shipping_type | String | express | Y | 取值范围：   express（快递），fetch（到店自提），   local（同城配送）,   express_none（不需要物流）, logistics(快运 <font style="color:#DF2A3F;">待未上线</font>) |
| order_type | Integer | 0 | Y | 订单类型参考<br/>[《3.3订单类型》](./evrohk7tzsgeglez.md) |
| orders | **orders[]** | **[]** | Y | 子订单明细 |
| messages | **messages[]** | **[]** | N | 自定义留言 |
| **expressVOS** | **expressVO**[] |  | Y | 子订单物流信息 |
| nature | Integer | 0 | Y | 订单性质,0=自营,1=分销采购单,2=外部分销采购单 |
| ~~outOrderNo~~ | ~~String~~ | ~~12323~~ | ~~N~~ | ~~视频号小店订单号~~ |
| ~~appid~~ | ~~String~~ | ~~13123~~ | ~~N~~ | ~~视频号小店appid~~ |
| datafrom | String |  | N | 0=聚宝赞订单 <br/>1=第三方订单 <br/>01=聚宝赞视频号<br/>8=视频号小店<br/>15=优选联盟订单 |
| inviter_id | number |  | N | 邀请人ID |
| salesman_id | number |  | N | 业务员ID |
| agentInfo | AgentInfo |  | Y | 下单人信息<font style="color:#DF2A3F;"></font> |
| zmrAgentInfo | AgentInfo |  | N | 推荐人信息<font style="color:#DF2A3F;"></font> |
| paymentQueryNO | String |  | Y | 支付查询号 |
| real_name | String | *尚 | N | 身份证姓名 |
| cert_no | String | 1201***********78301 | N | 身份证号码 |
| topAgentInfo | AgentInfo |  | N | 渠道商信息 |

**orders[]子订单明细**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| num_iid | Long | 3424234 | N | 商品ID |
| ~~sku_id~~ | ~~Long~~ | ~~32221~~ | ~~Y~~ | ~~规格ID~~ |
| sku_unique_code | String | 42423-432221 | N | 商品Sku在系统中的唯一编码 |
| num | Long | 2 | Y | 商品购买数量 |
| title | String | 山寨版测试机器 | Y | 商品标题 |
| retail_price | Double | 200.02 | Y | 商品销售价. 精确到2位小数；单位：元<font style="color:#DF2A3F;"></font> |
| price | Double | 200.02 | Y | 商品价格。精确到2位小数；单位：元 |
| total_fee | Double | 200.02 | Y | 应付金额（商品价格乘以数量的总金额） |
| cost_fee | Double | 0.00 | Y | 成本价 单位：元<font style="color:#DF2A3F;"> </font> |
| ~~discount_fee~~ | ~~Double~~ | ~~0~~ | ~~Y~~ | ~~交易明细内的优惠金额。精确到2位小数，单位：元~~ |
| actual_discount_fee | Double | 0 | Y | 交易明细内的优惠金额。精确到2位小数，单位：元<font style="color:#DF2A3F;"></font> |
| payment | Double | 200.02 | Y | 实付金额。精确到2位小数，单位：元 |
| ~~score~~ | ~~Integer~~ | ~~0~~ | ~~N~~ | ~~积分（单个商品积分）~~~~<font style="color:#DF2A3F;"></font>~~ |
| total_score | Double |  | N | 积分 |
| sku_properties_name | String | 颜色:桔色;尺码:M | Y | SKU的值，即：商品的规格。如：机身颜色:黑色;手机套餐:官方标配 |
| pic_thumb_path | String | [https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg](https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg) | N | 商品主图片缩略图地址 |
| item_refund_state | String | NO_REFUND | N | 退款状态:NO_REFUND 无退款FULL_REFUNDED 全部退款FULL_REFUND_FAILED 退款失败FULL_REFUNDING 退款中 |
| sjCode | String | AJLJDF | N | 商品自定义条码 |
| oid | String | 1 | Y | 子订单ID   子订单号 =  订单号+子订单ID |
| supply_price | Double | 55.55 | Y | 结算价 |
| <font style="color:rgb(32, 74, 135);">sub_type</font> | Integer | 0 | Y | 子订单类型 0=默认子订单 1=赠品子订单 2=换货子订单 3=补发子订单 4=加价购子订单 |
| deliverStatus | String | 1 | Y | 发货状态：0-未发货 1-已发货 2-备货中 9-已发货(无需物流) |
| deliverTime | Date | 2020-10-10 | N | 发货时间 |

**messages[]自定义留言**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| messageType | String | Text | Y | 字段类型 |
| messageName | String | 合同 | Y | 自定义名称 |
| message | String | A123456 | Y | 用户填写内容 |

**expressVO[] 物流信息**

| orderItemId | String |  | Y | 子订单id，与oid保持一致 |
| --- | --- | --- | --- | --- |
| consigneeMobile | String |  |  | 收货人手机号 |
| expressNo | String |  |  | 物流单号 |
| expressCode | String |  |  | 物流编码 |
| expressName | String |  |  | 物流公司名称 |

**AgentInfo 用户信息**

| agentid | number |  | Y | 用户ID |
| --- | --- | --- | --- | --- |
| name | String |  | N | 名称 |
| nick | String |  | N | 昵称 |
| mobile | String |  | N | 手机号 |
| orderid | String |  | Y | 会员编号 |
| fxid | number |  | N | 等级Id |
| fxname | String |  | N | 等级名称 |
| headurl | String |  | N | 头像 |
| status | number |  | Y | 用户状态 <br/>1=正常 <br/>2=冻结 <br/>10=注销 |
| idcard | String |  | N | 身份证;仅限渠道商用户信息 |

### 公共请求示例

```json
{
  "id": "S20230728102*****",
  "client_id": "shex888",
  "type": " TRADE_ COMMISION_STATE ",
  "msg": "UrlEncode(订单msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0",
  "supplierId": "20232123"
}
```

### 订单msg示例

```json
{
  "tid": "S20230728102*****",
  "num": 1,
  "type": "FIXED",
  "feedback": "0",
  "status": "WAIT_SELLER_SEND_GOODS",
  "payment": 25.5,
  "created": "2023-07-28+10:22:28",
  "title": "siloam+dawn多巴胺球球挂件手机包多色任选****",
  "orderid": "002466",
  "datafrom": "0",
  "super_unionid": null,
  "mobile": "131****",
  "buyer_nick": "田**",
  "openid": "oBzYx5hgtRXEI******",
  "nature": 0,
  "orders": [
    {
      "num": 1,
      "title": "siloam+dawn多巴胺球球挂件手机包多色任选****",
      "price": 25.5,
      "payment": 25.5,
      "paymentQueryNO": "S20230728102*****",
      "sjCode": null,
      "oid": "1",
      "deliverStatus": "0",
      "num_iid": "1607657",
      "sku_id": "48132835",
      "sku_unique_code": "100240552",
      "total_fee": 25.5,
      "sku_properties_name": "波密紫",
      "pic_thumb_path": "https://xs.c3tech.cn/11232/2023/material/image/7ca23d603b77496a811729c51a64a7dd.png",
      "discount_fee": 0.0,
      "item_refund_state": "NO_REFUND",
      "deliver_time": null,
      "supply_price": null,
      "sub_type": 0
    }
  ],
  "messages": null,
  "num_iid": null,
  "receiver_mobile": "131***",
  "total_fee": 25.5,
  "post_fee": 0.0,
  "receiver_name": "田**",
  "receiver_address": "大庸桥******",
  "receiver_city": "张家界市",
  "receiver_district": "永定区",
  "receiver_state": "湖南省",
  "receiver_zip": "",
  "pay_type": "WEIXIN",
  "refund_state": "NO_REFUND",
  "refunded_fee": null,
  "buyer_message": "无",
  "seller_flag": null,
  "shipping_type": "express",
  "discount_fee": 0.0,
  "pay_time": "2023-07-28+10:22:42",
  "consign_time": null,
  "sign_time": null,
  "update_time": "2023-07-28+10:22:42",
  "order_type": "0",
  "seller_remark": null,
  "supplier_id": "10000**",
  "supplier_name": "浙江金华****",
  "real_name": null,
  "cert_no": null
}
```