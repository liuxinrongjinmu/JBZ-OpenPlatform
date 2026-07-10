# 7.7.优惠券模板消息

---

**接口说明**：平台推送优惠券模板消息事件msg说明

**消息类型**：COUPON_TEMPLATE_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 优惠券模板事件Msg参数说明
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| id | number |  | Y | 优惠券ID |
| sjid | number |  | Y  | 商家ID |
| sjname | string |  | Y | 商家名称 |
| name | string |  | Y | 优惠券名称 |
| num | number |  | Y | 优惠券总数 |
| type | number |  | Y | 优惠券类型:<br/>1: 优惠券<br/>2: 优惠码 |
| status | string |  | Y | 优惠券状态：2生效，3过期，4失效 5逻辑删除 |
| discountType | number |  | Y | 优惠类型：   1：金额   2：折扣 |
| discountVal | BigDecimal |  | Y | 优惠金额,当优惠类型是折扣表示打几折(0~100) |
| randomType | number |  | N | 优惠金额是否随机   1：不随机   2：随机 |
| randomStart | BigDecimal |  | N | 随机开始值 |
| randomEnd | BigDecimal |  | N | 随机结束值 |
| thresholdType | number |  | N | 使用门槛:   1:无门槛   2:订单金额满多少使用 |
| thresholdVal | BigDecimal |  | N | 当使用门槛为2时，该项有值 |
| thresholdMode | number |  | N | 门槛使用模式，当使用门槛为2时有效；   1:实际支付金额，2:销售金额 |
| diejiaType | number |  | N | 是否叠加，   1：不允许叠加，   2：可以叠加 |
| drawLimit | number |  | N | 每人领取限制，0表示无限制 |
| effectType | number |  | Y | 失效时间类型：   1：表示固定时间，根据开始时间和结束时间来   2：表示领到券当日开始几天内有效   3：表示领到券次日开始几天内有效 |
| startTime | Date |  | Y | 生效时间 |
| endTime | Date |  | Y | 过期时间 |
| effectDays | number |  | N | 当有效类型为2，3的时候， 该项有值，几天内有效 |
| distanceDays | number |  | N | 当有效类型为3时，标识几天后开始生效默认次日开始生效 |
| remindType | number |  | N | 到期前4天提醒一次：   1表示不提醒，2表示提醒 |
| adaptType | number |  | N | 适应范围：   1: 表示全部    2: 表示指定商品可以   3: 表示指定商品不可以 |
| shareType | number |  | N | 分享类型:   1: 表示所有类型   2: 表示指定等级分享 |
| createTime | Date |  | Y | 活动创建时间 |
| remark | String |  | N | 备注 |
| origPriceUse | number |  | N | 仅限原件商品使用   0: 不限制使用   1: 仅限原价使用 |

### 公共请求示例

```json
{
  "id": "E20141119131459763628",
  "client_id": "shex888",
  "type": " COUPON_TEMPLATE_STATE",
  "msg": "UrlEncode(订单msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```

### msg示例

```json
{}
```

