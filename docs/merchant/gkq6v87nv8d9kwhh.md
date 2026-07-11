# 7.14.优惠券发放消息

---

**接口说明**：优惠券发放消息：COUPON_SEND_EVENT

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

###  请求参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| sjid | Long | 9601 | Y | 商家ID |
| items | List&lt;CouponDistribution&gt; |  | Y | 优惠券发放列表 |

### CouponDistribution

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| userId | Long | 112234 | Y | 用户ID |
| couponId | Long |  | Y | 优惠券模板ID |
| couponUserId | Long |  | Y | 优惠券ID |
| quantity | Integer | 1 | Y | 优惠券发放数量 |
| source | String |  | Y | 来源 |
| giveAt | Date | 2025-07-20 00:00:00 | Y | 发放时间 |

### 公共请求示例

```json
{
  "id": "112344",
  "client_id": "shex888",
  "type": "COUPON_SEND_EVENT",
  "msg": "UrlEncode(msg)",
  "sjid": 86,
  "sign": "sign",
  "version": "1.0"
}
```
