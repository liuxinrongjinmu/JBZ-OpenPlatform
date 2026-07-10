# 6.1.第三方订单推送

---

### 接口说明：第三方订单同步到平台，可统计销售额，分佣等

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/third/push?access_token=<span v-pre>{{access_token}}</span>

### 不同订单类型状态流转

| 订单类型 | 状态流转 |
| --- | --- |
| 实物商品-快递配送 | 待付款 → 待发货 → 已发货 → 已完成 |
| 实物商品-门店配送 | 待付款 → 待配送 → 已发货 → 已完成 |
| 实物商品-门店自提 | 待付款 → 待提货 → 已完成 |
| 虚拟商品-自动核销 | 待付款 → 已完成 |
| 虚拟商品-商家核销 | 待付款 → 待核销 → 已完成 |

ps: 订单状态不可逆转

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| id | String | Y | 消息的业务单据号（订单号） |
| client_id | String | Y | 聚宝赞分配给第三方的client_id |
| type | String | Y | 推送消息业务类型：TRADE（固定值） |
| msg | String | Y | 经过UrlEncode（UTF-8）编码的消息对象，具体字段格式参见订单查询接口 |
| app_id | Long | Y | 商家ID |
| sign | String | Y | 防伪签名 ：MD5(client_id+msg+client_secrect) ; MD5 方法可通过搜索引擎搜索得到或者可参考 MD5；msg参与签名是经过UrlEncode（UTF-8）编码后参与签名 |
| version | Long | Y | 消息体的版本号 |

### msg参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| tid | String | E231958349 | Y | 订单号 |
| num | Long | Y | 1 | 商品购买数量。当一个trade对应多个order的时候，值为所有商品购买数量之和(除礼包商品(type= RECOMMEND)外,礼包商品num是礼包的数量。) |
| num_iid | Long | 3424234 | Y | 商品数字编号。(当一个trade对应多个order的时候，值为第一个交易明细中的商品的编号） |
| goods_source | Integer | 1 | Y | 商品来源:   1:聚宝赞   不传默认为第三方商品 |
| sku_id | Long | 32221 | Y | 规格ID（值为第一个交易明细中的商品规格ID） |
| sku_unique_code | String | 42423-432221 | Y | 商品Sku在系统中的唯一编码（值为第一个交易明细中的商品规格编码） |
| sku_properties_name | String | 颜色:桔色;尺码:M | Y | SKU的值，即：商品的规格。如：机身颜色:黑色;手机套餐:官方标配（值为第一个交易明细中的商品规格SKU名称） |
| title | String | 新款连衣裙 | Y | 交易标题，以首个商品标题作为此标题的值 |
| type | String | FIXED | Y | 交易类型，FIXED （一口价）RECOMMEND  （礼包商品）VALET（代客下单） |
| pic_thumb_path | String | [https://xs.c3tech.cn/9537/2021/material/image/90759589854707712020211109114204.png](https://xs.c3tech.cn/9537/2021/material/image/90759589854707712020211109114204.png) | N | 主订单图像 |
| status | String | WAIT_BUYER_PAY | N | 交易状态。TRADE_NO_CREATE_PAY (没有创建支付交易) WAIT_BUYER_PAY (等待买家付款) WAIT_PAY_RETURN (等待支付确认) WAIT_GROUP（等待成团，即：买家已付款，等待成团）WAIT_SELLER_SEND_GOODS (等待卖家发货，即：买家已付款)WAIT_BUYER_CONFIRM_GOODS (等待买家确认收货，即：卖家已发货) TRADE_BUYER_SIGNED (买家已签收) TRADE_CLOSED (付款以后用户退款成功，交易自动关闭) TRADE_CLOSED_BY_USER (付款以前，卖家或买家主动关闭交易) |
| update_time | String | 2000-01-01 00:00:00 | Y | 交易更新时间。当交易的：状态改变、备注更改 等情况下都会刷新更新时间 |
| created | String | 2000-01-01 00:00:00 | Y | 交易创建时间 |
| pay_time | String | 2000-01-01 00:00:00 | Y | 买家付款时间 |
| pay_type | String | ALIPAY | Y | 支付类型。取值范围：WEIXIN (微信自有支付)ALIPAY (支付宝支付)BANKCARDPAY (银行卡支付)PEERPAY (代付)CODPAY (货到付款)PRESENTTAKE (直接领取赠品)COUPONPAY（优惠券/码全额抵扣）UNIONPAY_WEIXIN（银联支付） |
| feedback | Long | 0 | Y | 交易维权状态。0 无维权，1 顾客发起维权，2 顾客拒绝商家的处理结果，3 顾客接受商家的处理结果，9 商家正在处理,101 维权处理中,110 维权结束。 |
| refund_state | String | NO_REFUND | Y | 退款状态。取值范围：NO_REFUND（无退款）PARTIAL_REFUNDING（部分退款中）PARTIAL_REFUNDED（已部分退款）PARTIAL_REFUND_FAILED（部分退款失败）FULL_REFUNDING（全额退款中）FULL_REFUNDED（已全额退款）FULL_REFUND_FAILED（全额退款失败） |
| total_fee | Double | 200.02 | Y | 商品总价（商品价格乘以数量的总金额）。单位：元，精确到分 |
| discount_fee | Double | 0.02 | Y | 交易优惠金额（不包含交易明细中的优惠金额）。单位：元，精确到分 |
| post_fee | Double | 15.02 | N | 邮费 |
| payment | Double | 202.03 | Y | 实付金额。单位：元，精确到分 |
| consign_time | String | 2000-01-01 00:00:00 | N | 签收时间 |
| ~~sign_time~~ | ~~String~~ | ~~2000-01-02 12:00:00~~ | ~~N~~ | ~~买家签收时间~~ |
| receiver_state | String | 浙江省 | N | 收货人的所在省份 |
| receiver_city | String | 杭州市 | N | 收货人的所在城市 |
| receiver_district | String | 西湖区 | N | 收货人的所在地区 |
| receiver_name | String | 东方败家 | N | 收货人的姓名 |
| receiver_address | String | 华夏路#12 | N | 收货人的详细地址 |
| receiver_zip | String | 223700 | N | 收货人的邮编 |
| receiver_mobile | String | 13512501826 | N | 收货人的手机号码 |
| openid | String | wxllkkksssd | Y | 下单人Openid |
| buyer_nick | String | Hunter | N | 下单人昵称 |
| buyer_message | String | 快点发货 | N | 买家留言 |
| weixin_user_id | String | 74334562 | N | 用户ID<br/>（卡券订单必填） |
| orderid | String | 888 | Y | 下单人会员编号(聚宝赞） |
| buyer_phone | String | 131422851** | Y | 下单人手机号 |
| shipping_type | String | express | Y | 取值范围：express（快递），fetch（到店自提），local（同城配送）,express_none（不需要物流） |
| order_type | Number | 0 | Y | 0=默认订单<br/>5=卡券订单<br/> 10=代理订单 20=提货单 30=面对面付款订单 40=转赠送订单 50=零售云仓订单 60=课程订单 61=专栏订单 |
| datafrom | Number | 99 | Y | 固定值 99=第三方平台订单 |
| deptid | Long |  | N | 门店ID |
| deptname | String |  | N | 门店名称 |
| salesman_id | Number | 1231212 | N | 分享人ID(聚宝赞会员ID) |
| orders | **orders[]** | **[]** | Y | 自定义明细 |

**orders[]订单明细**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| tid | String | E231958349 | Y | 订单号 |
| num_iid | Long | 3424234 | Y | 商品ID |
| goods_type | String | 201 | N | 商品类型:(未上线)   0:实物商品<br/>202:虚拟商品 |
| sku_id | Long | 32221 | Y | 规格ID |
| sku_unique_code | String | 42423-432221 | N | 商品Sku在系统中的唯一编码 |
| num | Long | 2 | Y | 商品购买数量 |
| title | String | 山寨版测试机器 | Y | 商品标题 |
| price | Double | 200.02 | Y | 商品价格。精确到2位小数；单位：元 |
| total_fee | Double | 200.02 | Y | 应付金额（商品价格乘以数量的总金额） |
| discount_fee | Double | 0 | Y | 交易明细内的优惠金额。精确到2位小数，单位：元 |
| payment | Double | 200.02 | Y | 实付金额。精确到2位小数，单位：元 |
| sku_properties_name | String | 颜色:桔色;尺码:M | Y | SKU的值，即：商品的规格。如：机身颜色:黑色;手机套餐:官方标配 |
| pic_thumb_path | String | [https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg](https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg) | N | 商品主图片缩略图地址 |
| item_refund_state | String | NO_REFUND | Y | 退款状态:NO_REFUND 无退款FULL_REFUNDED 全部退款FULL_REFUND_FAILED 退款失败FULL_REFUNDING 退款中 |
| sjCode | String | AJLJDF | N | 商品自定义条码 |
| oid | Number | 1 | Y | 子订单ID |
| cost_fee | Double | 100.01 | Y | 商品成本价格。精确到2位小数；单位：元 |
| retail_price | Double | 100.01 | Y | 商品零售价格。精确到2位小数；单位：元 |

### 消息结构实例（整体）

```json
{
  "id": "E20171001225908040900001",
  "client": "343035202kadmsdfskfasdihhhjd",
  "type": "TRADE",
  "msg": "见下方定义需要进行UrlEncode（UTF-8）编码",
  "app_id": 1123,
  "sign": "askdfjasldfjaslfdjasdfjasdfjcmvnmcvnaibao",
  "version": "1"
}
```

### 消息结构示例(msg参数)  

```json
{
  "num": 1,
  "num_iid": "343035202",
  "title": "全心抑菌防螨净肤巾 非毛巾 洗脸更卫生",
  "type": "FIXED",
  "discount_fee": "0.00",
  "status": "TRADE_CLOSED_BY_USER",
  "refund_state": "NO_REFUND",
  "shipping_type": "express",
  "post_fee": "0.00",
  "total_fee": "79.00",
  "refunded_fee": "0.00",
  "payment": "79.00",
  "created": "2017-10-01 22:59:08",
  "update_time": "2017-10-01 23:59:24",
  "pay_time": "",
  "pay_type": "",
  "consign_time": "",
  "sign_time": "",
  "seller_flag": 0,
  "buyer_message": "",
  "orders": [
    {
      "oid": 1,
      "title": "全心抑菌防螨净肤巾 非毛巾 洗脸更卫生",
      "price": "79.00",
      "total_fee": "79.00",
      "payment": "79.00",
      "discount_fee": "0.00",
      "sku_id": "36159466",
      "sku_unique_code": "34303520236159466",
      "sku_properties_name": "规格:4包/箱",
      "pic_thumb_path": "https://img.yzcdn.cn/upload_files/2017/07/26/FraxjkrQ19HCkksSFnx5_ytmato3.jpg",
      "item_refund_state": "NO_REFUND",
      "refunded_fee": "0.00",
      "num_iid": "343035202",
      "num": "1",
      "sjCode": "AJHDFAFJL",
      "cost_fee": "100.01",
      "retail_price": "100.01",
      "tid": "E20171001225908040900001"
    }
  ],
  "tid": "E20171001225908040900001",
  "orderid": "888",
  "shop_id": "1122",
  "receiver_city": "宁波市",
  "receiver_district": "慈溪市",
  "receiver_name": "冯程程",
  "receiver_state": "浙江省",
  "receiver_address": "三北名都西大门",
  "receiver_zip": "",
  "receiver_mobile": "13221983222",
  "feedback": 0,
  "datafrom": 99,
  "order_type": "61",
  "openid": "oD3iQw-x5av9ppmzvIHFDOZ0z8mo",
  "weixin_user_id": "12315"
}
```

### 完整推送消息结构示例

```json
{
  "id": "2019011655955",
  "client_id": "test",
  "type": "TRADE",
  "msg": "%7b%22post_fee%22%3a0.01%2c%22intime%22%3a1585967749000%2c%22pic_thumb_path%22%3a%22https%3a%2f%2fimg.2mhn.cn%2f%2fo_1e4djkem8cvs1aurjalru217sr9.jpg%3fimageslim%22%2c%22num%22%3a2%2c%22sjid%22%3a1627%2c%22num_iid%22%3a223192%2c%22sku_unique_name%22%3a%22%e7%99%bd%e8%89%b2%22%2c%22title%22%3a%22%e6%b5%8b%e8%af%95%e5%95%86%e5%93%81%e5%90%8c%e6%ad%a51%22%2c%22tid%22%3a%22S20200404103548286193423%22%2c%22discount_fee%22%3a0.0%2c%22retail_price%22%3a2.00%2c%22feedback%22%3a%220%22%2c%22zmrid%22%3a0%2c%22update_time%22%3a%222020-04-04+19%3a02%3a03%22%2c%22price%22%3a1.9%2c%22total_fee%22%3a3.8%2c%22payment%22%3a3.81%2c%22fxid%22%3a3978%2c%22order_type%22%3a0%2c%22weixin_user_id%22%3a%2270924505%22%2c%22sku_unique_code%22%3a%2201001%22%2c%22buyer_message%22%3a%22%e6%97%a0%22%2c%22orderid%22%3a%22SJ111%22%2c%22openid%22%3a%22o5WB71Cx2C_0slsYnDCDyLEI1ov0%22%2c%22created%22%3a%222020-04-04+10%3a35%3a48%22%2c%22ownfee_status%22%3a%221%22%2c%22stock_type%22%3a10%2c%22buyer_nick%22%3a%22%e6%b8%b8%e6%88%8fAs%e4%ba%ba%e7%94%9f+%ee%8d%85%e2%82%ac%e2%82%ac%c2%a3%c2%a3+%5b%e5%8f%91%e5%91%86%5d%22%2c%22orders%22%3a%5b%7b%22cost_fee%22%3a2.0%2c%22sku_unique_code%22%3a%2201001%22%2c%22sj_code%22%3a%22%22%2c%22pic_thumb_path%22%3a%22https%3a%2f%2fimg.2mhn.cn%2f%2fo_1e4djkem8cvs1aurjalru217sr9.jpg%3fimageslim%22%2c%22num%22%3a2%2c%22sjid%22%3a1627%2c%22num_iid%22%3a223192%2c%22sku_id%22%3a36197984%2c%22sku_properties_name%22%3a%22%e7%99%bd%e8%89%b2%22%2c%22oid%22%3a1%2c%22title%22%3a%22%e6%b5%8b%e8%af%95%e5%95%86%e5%93%81%e5%90%8c%e6%ad%a51%22%2c%22item_refund_state%22%3a%22NO_REFUND%22%2c%22tid%22%3a%22S20200404103548286193423%22%2c%22retail_price%22%3a2.00%2c%22len%22%3a0.0%2c%22price%22%3a1.9%2c%22total_fee%22%3a3.8%2c%22width%22%3a0.0%2c%22payment%22%3a3.8%2c%22deliver_status%22%3a%220%22%7d%5d%2c%22refund_state%22%3a%22NO_REFUND%22%2c%22status%22%3a%22TRADE_CLOSED_BY_USER%22%2c%22datafrom%22%3a%220%22%7d",
  "app_id": 1617,
  "sign": "56a79e71bffb36fcbf03ae407db1d30c",
  "version": "1"
}
```

### 推送消息响应

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| code | String | Y | 0=成功 -1=失败 |
| msg | String | Y | success/error |