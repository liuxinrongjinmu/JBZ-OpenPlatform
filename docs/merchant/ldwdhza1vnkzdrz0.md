# 5.1.订单查询

---

### 接口说明：订单列表及订单详细信息查询接口，跨境订单信息中包含下单人身份信息

注：若查询时间内获取的订单分页大于100，需使用【深度分页】参数进行查询.

取每页最后数据【创建时间】，【订单号】进行查询.使用【深度分页】(第一页数据根据pageNo=1获取)

**请求方式**：GET（HTTPS）

**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/query?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| page_no | Number | N | 页码， 超过100页强制返回第100页的数据   |
| page_size | Number | N | 每页条数，默认最大100个 |
| tid | String | N | 订单号（订单号精确查找,不过滤订单状态, 交易状态条件无效o） |
| start_update | String | N（传了订单号或者time_type可不传，否则必传） | 订单更新的开始时间 例:2017-01-01 12:00:00; 开始时间和结束时间的跨度不能大于3个月; 结束时间必须大于开始时间; 开始时间和结束时间必须成对出现 |
| end_update | String | N（传了订单号或者time_type可不传，否则必传） | 订单更新的结束时间，例:2017-01-01 12:00:00; 开始时间和结束时间的跨度不能大于3个月; 结束时间必须大于开始时间; 开始时间和结束时间必须成对出现 |
| time_type | Integer | N | 时间类型(1下单时间 2备货时间 3发货时间 4支付时间 5完成时间)<br/>开始和结束时间传到 start_created 和 end_created 里。time_type不传时，下面的开始时间和结束时间默认为订单创建时间 |
| start_created | String | N（传了time_type则必传） | 开始时间 例:2017-01-01 12:00:00; 开始时间和结束时间的跨度不能大于3个月; 结束时间必须大于开始时间; 开始时间和结束时间必须成对出现 |
| end_created | String | N（传了time_type则必传） | 结束时间，例:2017-01-01 12:00:00; 开始时间和结束时间的跨度不能大于3个月; 结束时间必须大于开始时间; 开始时间和结束时间必须成对出现 |
| status | String | N | 交易状态。TRADE_NO_CREATE_PAY (没有创建支付交易) WAIT_BUYER_PAY (等待买家付款) WAIT_PAY_RETURN (等待支付确认) WAIT_GROUP（等待成团，即：买家已付款，等待成团）WAIT_SELLER_SEND_GOODS (等待卖家发货，即：买家已付款)<br/>WAIT_SELLER_SEND_GOODS_20(待提货;自提订单)<br/>WAIT_BUYER_CONFIRM_GOODS (等待买家确认收货，即：卖家已发货) TRADE_BUYER_SIGNED (买家已签收) TRADE_CLOSED (付款以后用户退款成功，交易自动关闭) TRADE_CLOSED_BY_USER (付款以前，卖家或买家主动关闭交易) |
| buyer_nick | String | N | 下单人昵称 |
| receiver_mobile | String | N | 收货人手机号 |
| mobile | String | N | 下单人手机号 |
| orderid | String | N | 下单人编号 |
| datafrom | String | N | 为空时查询所有来源订单1=第三方订单 0=聚宝赞订单 01=聚宝赞视频号 8 = 视频号小店 |
| order_type | String | N | 0=默认订单 99=跨境代购 98=跨境保税仓<br/>其余类型参考<br/>[《3.3订单类型》](./evrohk7tzsgeglez.md) |
| ext_info | Integer | N | 附加信息<br/>1 下单人等级<br/>示例:1 |
| store_id_list | Array | N | 门店ID集合（未上线） |
| deep_query_time | Long | N   深度分页必传 | 深度分页查询时间（时间戳） |
| deep_query_tid | String | N   深度分页必传 | 深度分页查询订单 |

注：deep_query_time与deep_query_tid字段使用  

例如：  

获取第一页数据: 开始与结束时间 + pageNo=1 + pageSize=100   

后续数据获取： 开始与结束时间 + pageSize=100 + deep_query_time(上次查询最后数据的创建时间戳)+ deep_query_tid(上次查询数据的订单号)  

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| total_results | Number | Y | 搜索到的交易总条数 |
| trade | **TradeDetail[]** | N | 搜索到的交易列表 |

**TradeDetail基本信息**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| tid | String | E231958349 | Y | 订单号 |
| outOrderNo | String | v | N | 第三方订单号 |
| num | Long | Y | 1 | 商品购买数量。当一个trade对应多个order的时候，值为所有商品购买数量之和(除礼包商品(type= RECOMMEND)外,礼包商品num是礼包的数量。) |
| num_iid | Long | 3424234 | Y | 商品数字编号。当一个trade对应多个order的时候，值为第一个交易明细中的商品的编号 |
| title | String | 新款连衣裙 | Y | 交易标题，以首个商品标题作为此标题的值 |
| type | String | FIXED | Y | 交易类型，FIXED （一口价）RECOMMEND  （礼包商品）VALET（代客下单） |
| status | String | WAIT_BUYER_PAY | N | 交易状态。TRADE_NO_CREATE_PAY (没有创建支付交易) WAIT_BUYER_PAY (等待买家付款) WAIT_PAY_RETURN (等待支付确认) WAIT_GROUP（等待成团，即：买家已付款，等待成团）WAIT_SELLER_SEND_GOODS (等待卖家发货，即：买家已付款)WAIT_BUYER_CONFIRM_GOODS (等待买家确认收货，即：卖家已发货) TRADE_BUYER_SIGNED (买家已签收) TRADE_CLOSED (付款以后用户退款成功，交易自动关闭) TRADE_CLOSED_BY_USER (付款以前，卖家或买家主动关闭交易) |
| update_time | String | 2000-01-01 00:00:00 | Y | 交易更新时间。当交易的：状态改变、备注更改 等情况下都会刷新更新时间 |
| created | String | 2000-01-01 00:00:00 | Y | 交易创建时间 |
| pay_time | String | 2000-01-01 00:00:00 | Y | 买家付款时间 |
| pay_type | String | ALIPAY | Y | 支付类型。取值范围：   WEIXIN (微信自有支付)   ALIPAY (支付宝支付)   BANKCARDPAY (银行卡支付)   PEERPAY (代付)   CODPAY (货到付款)   PRESENTTAKE (直接领取赠品)   COUPONPAY（优惠券/码全额抵扣）UNIONPAY_WEIXIN（银联支付）<br/>OWNACCOUNT(账户支付)<br/>OFFLINE_PAYMENT(线下付款) |
| feedback | Long | 0 | Y | 交易维权状态。0 无维权，1 顾客发起维权，2 顾客拒绝商家的处理结果，3 顾客接受商家的处理结果，9 商家正在处理,101 维权处理中（买家首次发起维权后）,102等待卖家同意退款申请（维权失败过），103卖家不同意退款申请（卖家拒接），104已经申请维权有客服介入中，105卖家已经同意退款，106已经退货等待卖家确认收货，107维权关闭（买家主动取消维权），109等待买家退货,110 退款成功（卖家同意退款成功，维权结束）。 |
| refund_state | String | NO_REFUND | Y | 退款状态。取值范围：NO_REFUND（无退款）PARTIAL_REFUNDING（部分退款中）PARTIAL_REFUNDED（已部分退款）PARTIAL_REFUND_FAILED（部分退款失败）FULL_REFUNDING（全额退款中）FULL_REFUNDED（已全额退款）FULL_REFUND_FAILED（全额退款失败） AFTER_SALES_REFUNDING(售后中,换货中状态) |
| total_fee | Double | 200.02 | Y | 商品总价（商品价格乘以数量的总金额）。单位：元，精确到分 |
| discount_fee | Double | 0.02 | Y | 交易优惠金额（明细优惠金额叠加）。单位：元，精确到分 |
| post_fee | Double | 15.02 | N | 邮费 |
| payment | Double | 202.03 | Y | 实付金额。单位：元，精确到分 |
| total_score | Double |  | N | 积分 |
| consign_time | String | 2000-01-01 00:00:00 | N | 订单完成时间 |
| sign_time | String | 2000-01-02 12:00:00 | N | 买家签收时间 |
| receiver_state | String | 浙江省 | N | 收货人的所在省份 |
| receiver_city | String | 杭州市 | N | 收货人的所在城市 |
| receiver_district | String | 西湖区 | N | 收货人的所在地区 |
| receiver_street | String | xx街道 | N | 收货人的所在街道 |
| receiver_name | String | 东***家 | N | 收货人的姓名 |
| receiver_address | String | 华夏***12 | N | 收货人的详细地址 |
| receiver_zip | String | 223700 | N | 收货人的邮编 |
| receiver_mobile | String | 1351*****26 | N | 收货人的手机号码 |
| openid | String | wxllkkksssd | N | 下单人Openid |
| buyer_nick | String | Hunter | N | 下单人昵称 |
| buyer_message | String | 快点发货 | N | 买家留言 |
| orderid | String | 888 | N | 下单人会员编号 |
| agentId | Long | 1112 | Y | 下单人会员id |
| shipping_type | String | express | Y | 取值范围：<br/>express（快递），<br/>fetch（到店自提），local（同城配送）,<br/>express_none（不需要物流）, logistics(快运) |
| order_type | Number | 0 | Y | 0=默认订单 2=供货市场 3=三方供应商 10=代理订单 20=提货单 30=面对面付款订单 40=转赠送订单 50=零售云仓订单 60=课程订单 61=专栏订单 110=换货订单 98=海淘保税仓 99=海淘直邮<br/>其余类型参考<br/>[《3.3订单类型》](./evrohk7tzsgeglez.md) |
| messages | [] | | N | 自定义留言 |
| deptId | Long | | N | 门店ID |
| deptName | String | | N | 门店名称 |
| supplier_id | String | 88 | N | 供应商ID |
| supplier_name | String |  | N | 供应商名称 |
| seller_remark | String | 已部分退款 | N | 卖家备注 |
| real_name | String | *尚 | N | 身份证姓名 |
| cert_no | String | 1201***********78301 | N | 身份证号码 |
| datafrom | String |  | N | 为空时查询所有来源订单1=第三方订单 0=聚宝赞订单 01=聚宝赞视频号 8 = 视频号小店 |
| nature | Integer | 0 | Y | 订单性质,0=自营,1=分销采购单,2=外部分销采购单 |
| orders | **orders[]** | **[]** | Y | 订单明细 |
| paymentQueryNO | **String** | **V3721579966586811234** | N | 支付查询号 |
| fxid | **Long** | **1234** | N | 下单人等级 |
| fxName | **String** | **王者** | N | 等级名称 |
| expresses | **`List<ExpressVO>`** | **** | N | 订单物流信息<font style="color:#DF2A3F;"></font> |
| topAgentInfo | **AgentInfo** | **** | N | 渠道商信息<br/>(未上线) |

**orders[]订单明细**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| num_iid | Long | 3424234 | Y | 商品ID |
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
| item_refund_state | String | NO_REFUND | N | 退款状态:NO_REFUND 无退款FULL_REFUNDED 全部退款FULL_REFUND_FAILED 退款失败FULL_REFUNDING 退款中 EXCHANGE_REFUNDING 换货中 EXCHANGE_REFUNDED 换货成功 EXCHANGE_REFUND_FAILED 换货失败 |
| sjCode | String | AJLJDF | N | 商品自定义条码 |
| oid | String | 1 | Y | 子订单ID |
| deliverStatus | String | 1 | Y | 发货状态：0-未发货 1-已发货 2-备货中  9-已发货(无需物流) |
| sub_type | Integer | 0 | Y | 子订单类型 0=默认子订单 1=赠品子订单 2=换货子订单 3=补发子订单 4=加价购子订单 |
| deliverTime | Date | 2020-10-10 | N | 发货时间 |
| supply_price | Double | 55.55 | Y | 结算价 |
| zmrOrderId | String | 123 | Y | 直属上级编号<br/><font style="color:rgb(217, 0, 27);">（</font><font style="color:#DF2A3F;">该字段暂未上线）</font> |

**ExpressVO 物流信息**

| orderItemId | String | | Y | 子订单ID |
| --- | --- | --- | --- | --- |
| expressNo | String | | | 物流单号 |
| expressCode | String | | | 物流编码 |
| expressName | String | | | 物流公司名称 |

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
| idcard | String |  | N | 身份证 |


### 正确响应示例

```json
{
  "response": {
    "total_results": 1,
    "trade": [
      {
        "tid": "S20200811185644996229585",
        "num": 1,
        "type": "FIXED",
        "feedback": "0",
        "status": "WAIT_SELLER_SEND_GOODS",
        "payment": 1,
        "created": "2020-08-11 18:56:45",
        "title": "QQ化妆包111",
        "orderid": "377",
        "datafrom": "0",
        "mobile": "12311111111",
        "openid": "ozxbt0beWJ0s7O9bS4NRa4TvgvyM",
        "orders": [
          {
            "num": 1,
            "title": "QQ化妆包111",
            "price": 1,
            "payment": 1,
            "sjCode": "A9190",
            "oid": "1",
            "num_iid": "279014",
            "total_fee": 1,
            "pic_thumb_path": "https://image-c.weimobwmc.com/saas-wxbiz/0f586380a7704121af10c3622e09add6.jpeg",
            "discount_fee": 0,
            "item_refund_state": "NO_REFUND",
            "feedback": 101
          }
        ],
        "receiver_mobile": "13522222222",
        "total_fee": 1,
        "post_fee": 0,
        "receiver_name": "哦哦哦",
        "receiver_address": "过敏",
        "receiver_city": "昆明市",
        "receiver_district": "五华区",
        "receiver_state": "云南省",
        "receiver_zip": "710061",
        "pay_type": "OWNACCOUNT",
        "refund_state": "NO_REFUND",
        "refunded_fee": 0,
        "buyer_message": "",
        "seller_flag": "0",
        "shipping_type": "express",
        "discount_fee": 0,
        "pay_time": "2020-08-11 18:56:50",
        "update_time": "2020-08-11 18:56:50",
        "order_type": "0",
        "buyer_nick": "Hunter"
      }
    ]
  }
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": "2002",
    "msg": "交易状态更新的结束时间必须大于交易状态更新的开始时间"
  }
}
```