# 10.5.优惠券领取记录

---

**接口说明**：查询用户优惠券领取记录

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/coupon/drawRecord?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| couponId | Long | Y |  | 优惠券ID |
| couponType | Integer | Y |  | 优惠券类型(1:优惠券；2:优惠码) |
| userId | string | N |  | 用户ID |
| startTime | LocalDateTime | Y | 2025-01-01 00:00:00 | 领取时间(开始) |
| endTime | LocalDateTime | Y | 2025-03-01 00:00:00 | 领取时间(结束) |
| pageNo | Integer | Y |  | 页码 |
| pageSize | Integer | Y |  | 页大小 |
| deepQueryKey | String | N |  | 深度分页Key |
| deepQueryTime | LocalDateTime | N |  | 深度分页时间 |

注意：pageNo最多查询100页数据，若查询时间内数据较多需使用深度分页参数进行查询。第一页page=1获取深度分页参数，传入深度分页后pageNo参数后续无效

### 返回结果

`List&lt;CouponDrawRecordVO&gt;`

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| drawId | Long | Y |  | 领取ID |
| couponId | Long | Y |  | 优惠券ID |
| couponType | Integer | Y |  | 优惠券类型(1:普通优惠券；2:优惠码) |
| couponName | String | Y |  | 优惠券名称 |
| userId | Long | Y |  | 用户Id |
| nick | String | N |  | 用户昵称 |
| mobile | String | N |  | 用户手机号 |
| drawTime | LocalDateTime | Y |  | 领取时间 |
| qrCode | String | Y |  | 券码(用户ID+券码唯一) |
| deepQueryKey | String | N |  | 深度分页Key |
| deepQueryTime | LocalDateTime | N |  | 深度分页时间 |

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
