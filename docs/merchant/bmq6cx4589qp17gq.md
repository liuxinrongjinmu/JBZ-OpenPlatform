# 13.1.购卡记录

---

**接口说明**：用户购买电子卡券的记录

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/v2/userCard/query?access_token=[token]](https://api.c3tech.cn/oauthentry/v2/userCard/query?access_token=%5Btoken%5D)

**参数说明**：


| 名称 | 类型 | 必选 | 约束 | 说明 |
| --- | --- | --- | --- | --- |
| buyTimeBegin | string(date-time) | false | none | 购买时间范围开始 |
| buyTimeEnd | string(date-time) | false | none | 购买时间范围结尾 |
| cardCode | string | false | none | 券码 |
| cardName | string | false | none | 卡券名称 |
| orderNo | string | false | none | 订单号 |
| pageNo | integer(int32) | true | none | 页码 |
| pageSize | integer(int32) | true | none | 每页大小 |
| status | integer(int32) | false | none | 状态：1`待使用`,2`已完成`,3`已失效`,4`已停用`,5`待生效` |
| storeIds | [integer] | false | none | 门店ID |
| type | integer(int32) | false | none | 券类型：1、商品券 2、服务券 |

**返回结果**


| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| records | List&lt;UserCardQueryVO&gt; | Y | 购卡记录 |

UserCardQueryVO

| 名称 | 类型 | 必选 | 约束 | 说明 |
| --- | --- | --- | --- | --- |
| agentId | integer(int64) | false | none | 用户ID |
| code | string | false | none | 券码 |
| effectiveDate | string(date-time) | false | none | 生效日期 |
| expiryDate | string(date-time) | false | none | 失效日期 |
| expiryType | integer(int32) | false | none | 失效类型： 1：永久有效 2：限时有效 3：购买后生效 |
| name | string | false | none | 卡券名称 |
| orderBuyTime | string(date-time) | false | none | 订单购买时间 |
| orderNo | string | false | none | 订单号 |
| orderPrice | number | false | none | 卡售价 |
| pendingRedemptions | integer(int64) | false | none | 待核销次数 |
| status | integer(int32) | false | none | 卡券状态 |
| storeName | string | false | none | 门店名称 |
| totalRedemptions | integer(int64) | false | none | 总兑换次数 |
| type | integer(int32) | false | none | 券类型：1、商品券 2、服务券 |
| unredeemedCount | integer(int64) | false | none | 未兑换次数 |
| userLevel | string | false | none | 用户等级 |
| userNickName | string | false | none | 用户昵称 |
| userOrderId | string | false | none | 会员编号 |
| userPhone | string | false | none | 用户手机号 |


### 正确响应示例

```json
{
  "records": [
    {
      "agentId": 23,
      "code": "1233"
    }
  ],
  "total": 0,
  "size": 0,
  "current": 0,
  "orders": [],
  "searchCount": true,
  "pages": 0
}
```

{
  "error_response": {
    "code": 902,
    "message": "调用失败"
  }
}
```
