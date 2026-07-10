# 5.6.售后单列表查询

---

### 接口说明：售后订单列表查询

**请求方式**：GET（HTTPS）

**请求地址**：https://api.c3tech.cn/oauthentry/trades/afterSales/query?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| page_no | Number | N | 页码 | |
| page_size | Number | N | 每页条数，最大100个 | |
| tid | String | N | 1234546 | 订单号 |
| refundNo | String | N | 1234546 | 售后单号(如果要查询供应商承担售后金额此字段必填) |
| orderTime | String | N | 2021-12-19 11:20:21 | 订单下单时间(如果要查询供应商承担售后金额此字段必填)<font style="color:#DF2A3F;">（该字段暂未上线）</font> |
| startDate | String | C | 2021-12-19 11:20:18 | 更新开始时间 （ 订单号或售后单号为空时，不能为空） |
| endDate | String | C | 2021-12-19 | 更新结束时间（ 订单号或售后单号为空时，不能为空） |
| status | Integer | N | 101 | 状态:  101：用户申请退款；102：商家同意退款（用户未收到退款）；103：商家拒绝退款；   104：退款成功；201：申请退货退款 ;202：商家同意申请 ;203：商家拒绝申请;   204：买家填写物流 ;205：商家确认收货 ;206：商家拒绝收货;   207：退款成功(退货退款) <br/>208: 待退货回门店   301：商家主动退款；302：商家主动退款成功;501:申请换货 502：商家同意申请（待买家上传物流）；503：商家拒绝换货申请;504:买家填写物流（待商家收货）;505:商家确认收货；506：商家拒绝收货（商家拒绝换货）601：申请补发 602：补发成功 603：商家拒绝补发    888：用户撤销售后；889：（未填写物流）超时自动撤销售后 |
| storeIdList | Array | N |  | 门店Id集合(未上线) |

### 返回结果

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| total_results | Number | 100 | Y | 搜索到的交易总条数 |
| records | object[] | | Y | 售后单记录 |

| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| refundNo | String | R20210309173034324 | Y | 售后单号 |
| tid | String | S20210309173048477535421 | Y | 订单号 |
| user_no | String | S2 | Y | 下单人编号 |
| mobile | String | 13142265199 | Y | 售后人手机号 |
| amount | Double | 0.00 | Y | 售后金额(按子单计算金额) |
| supplier_amount | Double | 3.33 | Y | <font style="color:rgb(51, 51, 51);">售后出现后，会发生由供应商承担多少   </font><font style="color:#DF2A3F;">(该字段暂未上线)</font> |
| reason | String | 无 | N | 买家申请理由 |
| type | Integer | 1 | Y | 售后类型: 1-仅退款，2-退货退款，3-主动退款，4-换货，6-补发 |
| refundAll | Integer | 1 | Y | 是否全额退款  0-否，1-是 |
| status | Integer | 101 | Y | 状态:  101：用户申请退款；102：商家同意退款（用户未收到退款）；103：商家拒绝退款；   104：退款成功；201：申请退货退款 ;202：商家同意申请 ;203：商家拒绝申请;   204：买家填写物流 ;205：商家确认收货 ;206：商家拒绝收货;   207：退款成功(退货退款)    301：商家主动退款；302：商家主动退款成功;501:申请换货 502：商家同意申请（待买家上传物流）；503：商家拒绝换货申请;504:买家填写物流（待商家收货）;505:商家确认收货；506：商家拒绝收货（商家拒绝换货）601：申请补发 602：补发成功 603：商家拒绝补发    888：用户撤销售后；889：（未填写物流）超时自动撤销售后 |
| apply_time | Date | 2021-03-09 19:04:20 | Y | 创建时间 |
| update_time | Date | 2021-03-11 14:56:01 | N | 更新时间 |
| labelInfos | LabelInfo |  | N | 售后标签 <font style="color:#DF2A3F;"></font> |
| returnMethod | Integer | 1 | Y | 退货方式 1物流寄回 2退回门店 |
| returnStatus | Integer | 1 | Y | 退货状态 1待退货至门店 2门店已收货 |
| returnRemarks | String | <font style="color:rgb(51, 51, 51);">商品完好无损</font> | Y | 退货备注 |
| returnImages | List | <font style="color:rgb(51, 51, 51);">["</font>[https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg](https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg)<font style="color:rgb(51, 51, 51);">","</font>[https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213031.jpg!200x0.jpg](https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg)<font style="color:rgb(51, 51, 51);">"]</font> | Y | 退货图片 |
| items | object | | Y | 子订单信息 |

| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| oid | String | 1 | Y | 子订单ID |
| num_iid | Long | 123 | Y | 商品ID |
| sjCode | String | A123-456 | Y | 商品自定义条码 |
| sku_unique_code | String | String | 701 | Y |
| sku_properties_name | String | saber | Y | SKU属性名 |
| title | String | 山寨版测试机器 | Y | 商品标题 |
| num | Integer | 1 | Y | 数量 |
| price | Double | 10.8 | Y | 价格 |
| payment | Double | 12.8 | Y | 实付金额 |
| post_fee | Double | 2 | Y | 运费 |
| pic_thumb_path | String | [https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg](https://img.jubaozan.cn/upload_files/2014/01/13/138961372114213030.jpg!200x0.jpg) | N | 商品主图片缩略图地址 |
| express | object[] | | N | 物流信息 |

| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| expressCode | String | 343543543 | N | 物流单号 |
| expressName | String | 圆通 | N | 物流公司名 |
| expressType | String | YTO | N | 物流类型 |

LabelInfo

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| jbzOrderLabels | `List<OrderLabel>` |  | N | 商家售后标签 |
| supOrderLabels | `List<OrderLabel>` |  | N | 供应商售后标签 |

OrderLabel

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| name | String |  | N | 标签名称 |
| updateTime | LocalDateTime |  | N | 更新时间 |
| deleted | Integer |  | N | 删除标记 |

### 返回示例

```json
{
  "response": {
    "total_results": 1,
    "records": [
      {
        "refundNo": "TK2021120113562407073",
        "tid": "S20210906135409415622871",
        "user_no": "431",
        "mobile": "15575159088",
        "amount": 1,
        "reason": "",
        "type": 1,
        "refundAll": 1,
        "status": 101,
        "apply_time": "2021-12-01 13:56:24",
        "items": {
          "oid": "1",
          "num_iid": 307575,
          "sku_unique_code": "200202",
          "sku_properties_name": "XL码",
          "title": "拼团商品1",
          "num": 1,
          "price": 20,
          "payment": 1,
          "post_fee": 0,
          "pic_thumb_path": "https://xs.c3tech.cn/1617/2021/material/image/88221102852223795220210831103139.png"
        }
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