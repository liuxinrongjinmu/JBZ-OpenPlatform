# 7.6.售后消息

---

### 接口说明：平台推送消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会推送变更事件，在半个小时内每5分钟重推一次。


**消息类型**：AFTER_SALES_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| refundNo | String | R20210309173034324 | Y | 售后单号 |
| tid | String | S20210309173048477535421 | Y | 订单号 |
| user_no | String | S2 | Y | 下单人编号 |
| mobile | String | 13142265199 | Y | 售后人手机号 |
| amount | Double | 0.00 | Y | 售后金额(按子单计算金额) |
| reason | String | 无 | N | 买家申请理由 |
| type | Integer | 1 | Y | 售后类型: 1-仅退款，2-退货退款，3-主动退款，4-换货 |
| refundAll | String | 1 | Y | 是否全额退款  0-否，1-是 |
| status | String | 101 | Y | 状态:  101：用户申请退款；102：商家同意退款（用户未收到退款）；103：商家拒绝退款；   104：退款成功；201：申请退货退款 ;202：商家同意申请 ;203：商家拒绝申请;   204：买家填写物流 ;205：商家确认收货 ;206：商家拒绝收货;   207：退款成功(退货退款) <br/>208: 待退货回门店   301：商家主动退款；302：商家主动退款成功;501:申请换货 502：商家同意申请（待买家上传物流）；503：商家拒绝换货申请;504:买家填写物流（待商家收货）;505:商家确认收货；506：商家拒绝收货（商家拒绝换货）601：申请补发 602：补发成功 603：商家拒绝补发    888：用户撤销售后；889：（未填写物流）超时自动撤销售后 |
| apply_time | Date | 2021-03-09 19:04:20 | Y | 创建时间 |
| update_time | Date | 2021-03-11 14:56:01 | N | 更新时间 |
| returnMethod | Integer | 1 | N | 退货方式 1物流寄回 2退回门店 |
| returnStatus | Integer | 1 | N | 退货状态 1待退货至门店 2门店已收货 |
| returnRemarks | String | 退货备注 | N | 退货备注 |
| returnImages | `List<String>`  |  | N | 退货图片 |
| items | object | | Y | 子订单信息 |

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| oid | String | 1 | Y | 子订单ID |
| num_iid | Long | 123 | Y | 商品ID |
| sjCode | String | A123-456 | Y | 商品自定义条码 |
| sku_unique_code | String | String | 701 | Y |
| sku_properties_name | String | saber | Y | SKU属性名 |
| title | String | 山寨版测试机器 | Y | 商品标题 |
| num | String | 1 | Y | 数量 |
| price | Double | 10.8 | Y | 价格 |
| payment | Double | 12.8 | Y | 实付金额 |
| post_fee | Double | 2 | Y | 运费 |
| pic_thumb_path | String | [https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg](https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg) | N | 商品主图片缩略图地址 |
| express | object[] | | N | 物流信息 |

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| expressCode | String | 343543543 | N | 物流单号 |
| expressName | String | 圆通 | N | 物流公司名 |
| expressType | String | YTO | N | 物流类型 |

### 公共请求示例

```json
{
  "id": "E20141119131459763628",
  "client_id": "shex888",
  "type": " AFTER_SALES_STATE",
  "msg": "UrlEncode(订单msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```

### msg示例

```json
{
  "refundNo": "R2021111510395259345345",
  "tid": "S20211115103952599630171",
  "user_no": "S2",
  "mobile": "13142255199",
  "amount": 20,
  "reason": "不喜欢",
  "type": 1,
  "apply_time": "2021-11-18 09:11:26",
  "update_time": "2021-11-18 09:11:26",
  "items": {
    "oid": "1",
    "num_iid": 123254,
    "sjCode": "3263A",
    "sku_properties_name": "灰色",
    "sku_unique_code": "101",
    "title": "山寨版测试机器",
    "num": 2,
    "price": 10.2,
    "payment": 10.8,
    "post_fee": "10.8",
    "pic_thumb_path": "https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg"
  },
  "express": [
    {
      "expressCode": "123456456",
      "expressName": "圆通",
      "expressType": "YTO"
    }
  ]
}
```
