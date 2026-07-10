# 10.6.优惠券核销记录

---

**接口说明**：查询用户优惠券核销记录

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/coupon/writeOffRecord?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| couponId | Long | N |  | 优惠券ID |
| userId | Long | N |  | 用户ID |
| startTime | LocalDateTime | Y | 2025-01-01 00:00:00 | 核销时间(开始) |
| endTime | LocalDateTime | Y | 2025-03-01 00:00:00 | 核销时间(结束) |
| pageNo | Integer | Y |  | 页码 |
| pageSize | Integer | Y |  | 页大小 |
| deepQueryKey | String | N | 未上线 | 深度分页Key |
| deepQueryTime | LocalDateTime | N | 未上线 | 深度分页时间 |

注意：pageNo最多查询100页数据，若查询时间内数据较多需使用深度分页参数进行查询。第一页page=1获取深度分页参数，传入深度分页后pageNo参数后续无效

### 返回结果

`List&lt;CouponUsageRecordVO&gt;`

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| couponId | Long | Y |  | 优惠券ID |
| couponName | String | Y |  | 优惠券名称 |
| couponType | Integer | Y |  | 优惠券类型(1->普通优惠券 2->优惠码) |
| useType | Integer | Y |  | 核销类型(0->门店核销 1->下单使用) |
| userId | Long | Y |  | 用户Id |
| name | String | N |  | 用户姓名 |
| mobile | String | N |  | 用户手机号 |
| clerkId | Long | Y |  | 核销员 |
| clerkName | String | Y |  | 核销员姓名 |
| tid | String | Y |  | 订单号 |
| storeId | Long | N |  | 门店ID |
| storeName | String | N |  | 门店名称 |
| useTime | LocalDate | Y |  | 核销时间 |
| qrCode | String | Y |  | 券码(用户ID+券码唯一) |
| deepQueryKey | String | N | 未上线 | 深度分页Key |
| deepQueryTime | LocalDateTime | N | 未上线 | 深度分页时间 |

### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": true
  }
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": 100001,
    "msg": "参数校验错误"
  }
}
```
