# SUPPLIER_TRADE_ORDER_STATE-订单消息事件参数

---

消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会继续推送事件，推送规则：5、10、20、40、80、160分钟推送 ，共重推6次

<font style="color:#DF2A3F;">注：该消息只会推送从供应商端同步到商家端商品订单</font>

**接口说明**：平台推送订单消息事件msg说明

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

**订单事件Msg参数说明**：

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | S20210309173048477535421 | Y | 订单编号 |
| middleId | Long | 11011 | N | 中台id |
| type | Integer | 1 | Y | 订单类型   (0:默认订单,1：积分订单,2:分销采购单,3:外部分销采购单,4:权益订单,10:代理订单,20:提货单,30:面对面付款订单,40:转赠送订单,41:代客下单,50:零售云仓订单,60:课程订单,61:专栏订单,62:年卡订单,70:门店代理订单,71:门店自提订单,80:秒杀,81:限时折扣,82:拼团,83:快趣拼,84:趣多拼,98:海淘跨境(保税仓)商品,99:海淘商品,101:礼包手动订单,110:换货订单,120:代理申请订单) |
| status | Integer | 40 | Y | 订单状态     ("待支付", 20, "用户创建订单")   ("待发货", 30, "用户已支付")   ~~("待发货", 31, "卖家已备货")~~   ("已发货", 40, "卖家已发货")   ("已签收", 50, "买家已收货")   ("已完成", 60, "订单已完成")   ("已关闭", 90, "订单自动关闭")   ("已关闭", 91, "用户取消订单")   ("已关闭", 92, "订单退款完成"); |
| totalScore | Double | 0.00 | Y | 总积分 |
| totalFee | Double | 44.00 | Y | 总金额 |
| payFee | Double | 44.00 | Y | 支付金额 |
| discountFee | Double | 0.00 | Y | 优惠金额 |
| freightFee | Double | 0.00 | Y | 运费 |
| feedback | Integer | 0 | Y | 维权状态    ("无", 0, "默认")    ("退款中", 101, "用户申请退款")    ("已退款", 102, "退款成功")    ("同意退款", 103, "商家同意退款")    ("拒绝退款", 104, "商家拒绝退款")    ("撤销退款", 105, "用户取消退款")    ("退货中", 106, "等待买家发货")    ("已关闭", 107, "自动关闭退款")    ("售后中", 249, "订单有退款未完成的")    ("售后结束", 250, "订单有且退款都是完成的") |
| refundedFee | Double | 0.00 | Y | 已退款金额 |
| buyerId | Long | 101149666 | Y | 买家ID |
| buyerIp | String | 0.0.0.0 | Y | 买家IP |
| buyerName | String | 无 | Y | 昵称长度80 |
| buyerNo | String | x85823 | Y | 买家编号 |
| buyerMobile | String | | Y | 买家手机 |
| buyerMessage | String | 无 | Y | 买家附言 |
| buyerFaceIcon | String | DEFAULT | Y | 买家头像 |
| consigneeId | Long | 0 | Y | 收货人ID |
| consigneeName | String | ！！1 | Y | 收货人姓名 |
| consigneeMobile | String | 1311111111111 | Y | 收货人手机 |
| consigneeProvince | String | 山西省 | Y | 收货人省份 |
| consigneeCity | String | 太原市 | Y | 收货人城市 |
| consigneeDistrict | String | 小店区 | Y | 收货人区县 |
| consigneeAddress | String | 8703 | Y | 收货人地址 |
| consigneeZipcode | String | 331331 | Y | 收货人邮编 |
| realName | String | 8703 | N | 身份证姓名 |
| certNo | String | 331331 | N | 身份证号码 |
| payType | Integer | | N | 支付类型   ("微信支付", 1)   ("支付宝", 2) |
| payTime | Date | | N | 支付时间 |
| intime | Date | | N | 下单时间 |
| autoCloseMinutes | Integer | 0 | N | 未支付自动关闭分钟数   ("不关闭", 0) |
| shippingType | String | 1 | Y | 物流方式:express：快递、 express：快递、fetch： 门店自提 、express_none :无须物流, logistics(快运 待未上线) |
| receiptTime | Date | | N | 收货时间 |
| cancelTime | Date | | N | 取消时间 |
| cancelReason | String | | N | 取消原因 |
| source | Integer | 1 | Y | 来源    ("聚宝赞", 1)    ("联团", 2)    ("有赞", 5)    ("微盟", 6)    ("淘宝", 7)    ("小鹅通", 8)    ("京东", 8)    ("易家安", 9)    ("微店", 10); |
| remarks | String | | N | 备注 |
| additional | String | | N | 扩展信息 |
| keywords | String | {"sjid":1617} | N | 关键字 |
| tenantId | String | 2 | Y | 租户ID |
| storeId | Long | | N | 店铺ID |
| storeName | String | | N | 店铺名称 |
| createAt | Date | 2021-03-09 19:04:20 | Y | 创建时间 |
| updateAt | Date | 2021-03-11 14:56:01 | N | 更新时间 |
| deleted | Integer | 0 | Y | 删除标记 |
| retailType | Integer |  | Y | 分销商类型;(未上线)   1-商家   2-供应链 |
| retailId | Integer |  | Y | 分销商ID(未上线) |
| retailName | String |  | Y | 分销商名称(未上线) |
| items | object[] | | Y | 子订单信息 |

| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| orderItemNo | String | S202103091730484775354211 | Y | 子订单编号 |
| orderItemType | Integer | 0 | Y | 0 : 默认子订单，1：赠品子订单，2：换货子订单，3：补发子订单<br/>4：加价购子订单 |
| orderId | Long | 1 | Y | 订单ID |
| ~~goodsId~~ | ~~Long~~ | ~~305892~~ | ~~Y~~ | ~~聚宝赞商家商品ID~~ |
| supGoodsId | Long |  | Y | 供应商商品ID |
| goodsType | Integer | 1 | Y | 商品类型   (1,"供应商商品")   (2,"个体平台自营商品") |
| goodsName | String | 拆单供应商3 | Y | 商品名 |
| skuId | Long | 0 | Y | ID |
| categoryId | Long | | N | 类目ID |
| barcode | String | 0 | Y | 商品条码 |
| skuUniqueCode | String | 701 | Y | code |
| skuPropertiesName | String | saber | Y | SKU属性名 |
| thumbnail | String | [https://xs.c3tech.cn/picbooks/81635489494754918420210302170254.jpg](https://xs.c3tech.cn/picbooks/81635489494754918420210302170254.jpg) | Y | 商品图片 |
| quantity | Integer | 2 | Y | 数量 |
| retailPrice | Double | 22.00 | Y | 零售价格 |
| customRetailPrice | Double | | N | 自定义零售价 |
| price | Double | 22.00 | Y | 实际价格 |
| costPrice | Double | 0.00 | Y | 成本价 |
| customCostPrice | Double | | N | 自定义成本价 |
| totalPrice | Double | 44.00 | Y | 总价 |
| payPrice | Double | 44.00 | Y | 支付价格 |
| score | Integer | 0 | Y | 积分 |
| totalScore | Integer | 0 | Y | 总计积分 |
| actualDiscountFee | Double | 0 | Y | 交易明细内的优惠金额。精确到2位小数，单位：元（未上线） |
| deliveryStatus | Integer | 3 | Y | 发货状态    0-未发货，1-已发货，2-备货 |
| deliveryTime | Date | 2021-03-11 14:56:02 | N | 发货时间 |
| deliveredNum | Integer | 2 | N | 已发货数量 |
| exportStatus | Integer | 0 | N | 导出状态    0-未导出, 1-已导出 |
| exportTime | Date | | N | 导出时间 |
| refundStatus | Integer | | N | 退款状态   ("无", 0, "无")   ("退款中", 101, "用户申请退款")    ("已退款", 102, "退款成功")    ("同意退款", 103, "商家同意退款")    ("拒绝退款", 104, "商家拒绝退款")    ("撤销退款", 105, "用户取消退款")    ("退货中", 106, "等待买家发货")    ("已关闭", 107, "自动关闭退款")    ("售后中", 249, "订单有退款未完成的")    ("售后结束", 250, "订单有且退款都是完成的") |
| refundTime | Date | | N | 退款时间 |
| refundedNum | Integer | | N | 已退款数量 |
| supplierId | Long | 2 | N | 供应商ID |
| supplierName | String | | N | 供应商名称 |
| additional | String | | N | 扩展信息 |
| keywords | String | | N | 关键字 |
| createAt | Date | 2021-03-09 19:04:20 | Y | 创建时间 |
| updateAt | Date | 2021-03-11 14:56:01 | N | 更新时间 |
| skuCode | String | | N | 规格编码 |
| **expressVOS** | object[] | | Y | 子订单物流信息 |
| orderItemId | String | | Y | 子订单号，与oid保持一致 |
| consigneeMobile | String | | | 收货人手机号 |
| expressNo | String | | | 物流单号 |
| expressCode | String | | | 物流编码 |
| expressName | String | | | 物流公司名称 |

**公共请求示例**：

```json
{
  "id": "E20141119131459763628",
  "client_id": "shex888",
  "type": " SUPPLIER_TRADE_ORDER_STATE ",
  "msg": "UrlEncode(订单msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```

**订单msg示例**：

```json
{
  "autoCloseMinutes": 0,
  "buyerFaceIcon": "DEFAULT",
  "buyerId": 101334248,
  "buyerIp": "0.0.0.0",
  "buyerMessage": "无",
  "buyerMobile": "15580960414",
  "buyerName": "危楚汉",
  "buyerNo": "s89077",
  "consigneeAddress": "湖南理工学院东南角",
  "consigneeCity": "岳阳市",
  "consigneeDistrict": "岳阳楼区",
  "consigneeId": 0,
  "consigneeMobile": "13787305853",
  "consigneeName": "吴熠敏",
  "consigneeProvince": "湖南省",
  "consigneeZipcode": "",
  "createAt": "2021-11-15T10:39:57",
  "discountFee": 0,
  "feedback": 0,
  "feedbackName": "无",
  "freightFee": 0,
  "id": 361,
  "items": [
    {
      "barcode": "3263",
      "costPrice": 0,
      "deliveryStatus": 3,
      "deliveryTime": "2021-11-15T10:45:37",
      "exportStatus": 0,
      "goodsId": 307835,
      "goodsName": "海蓝精选卫衣GYS",
      "goodsType": 1,
      "id": 390,
      "orderId": 361,
      "orderItemNo": "S202111151039525996301711",
      "payPrice": 20,
      "price": 20,
      "quantity": 1,
      "retailPrice": 20,
      "score": 0,
      "skuId": 36245305,
      "skuPropertiesName": "灰色",
      "skuUniqueCode": "101",
      "supplierId": 54,
      "thumbnail": "https://img.niwotech.com/goods_img/20211105/4Y0Qa3yUThXfKU7ASCEoV2tnVtwEdiaS.png",
      "totalPrice": 20,
      "totalScore": 0,
      "skuCode": "4001"
    }
  ],
  "keywords": {
    "sjid": 1617
  },
  "orderNo": "S20211115103952599630171",
  "payFee": 20,
  "refundedFee": 0,
  "shippingType": 1,
  "source": 1,
  "status": 40,
  "statusName": "已发货",
  "tenantId": "54",
  "totalFee": 20,
  "totalScore": 0,
  "type": 1,
  "updateAt": "2021-11-18T09:11:26"
}
```

