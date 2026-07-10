# 10.7.优惠券核销

---

**接口说明**：优惠券核销

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/coupon/writeOff?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例 | 说明 |
| --- | --- | --- | --- | --- |
| userId | Long | Y |  | 用户ID |
| couponId | Long | Y |  | 优惠券ID |
| couponType | Integer | Y |  | 优惠券类型(1:优惠券；2：优惠码) |
| drawId | Long | Y |  | 领取ID |
| useType | Integer | Y |  | 核销类型;0:门店核销;1:下单使用 |
| tid | String | N(订单核销必传) |  | 订单号 |
| discountAmount | BigDecimal | N(订单核销选填) |  | 抵扣金额 |
| orderAmount | BigDecimal | N(订单核销选填) |  | 下单金额 |
| storeId | Long | N（门店核销必传） |  | 门店ID |
| clerkId | Long | N（门店核销必传） |  | 核销员ID（用户ID） |

### 返回结果
java.lang.Boolean


### 成功响应示例

```json
{
  "response": true
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "100001",
    "msg": "参数校验错误"
  }
}
```

