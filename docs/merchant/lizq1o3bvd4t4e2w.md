# 10.2.优惠券发放

---

**接口说明**：对用户发放优惠券

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/coupon/drawCoupon?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| agentid | number | Y | 用户ID |
| couponId | number | Y | 优惠券ID |
| num | number | Y | 数量 |
| source | number | Y | 发放来源:   1：微乐播 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| drawCouponIds | array | Y | 用户领取优惠券的ID集合 |

```json
{
  "response": {}
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": "2002",
    "msg": ""
  }
}
```

