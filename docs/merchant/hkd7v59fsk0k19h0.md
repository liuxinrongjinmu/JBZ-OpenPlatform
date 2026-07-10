# 10.1.优惠券模板列表查询

---

**接口说明**：分页查询优惠券模板列表

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/coupon/template/queryPage?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| pageNo | Number | N | 页码 |
| pageSize | Number | N | 每页条数，默认最大10 |
| couponIds | Arrays | N | 优惠券ID集合 |
| name | String | N | 优惠券模板名称 |
| status | Number | N | 优惠券模板状态:   1:未开始   2:已开始   3:已结束   4:已失效   5:已删除 |
| startTime | String | N | 开始时间(创建时间)      开始与结束时间需都传才生效   "2024-12-20 00:00:00" |
| endTime | String | N | 结束时间(创建时间)       开始与结束时间需都传才生效   "2024-12-21 00:00:00" |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| total | Number | Y | 搜索到的总条数 |
| records | **CouponTemplate[]** | N | 搜索到的优惠券模板列表 |

**CouponTemplate基本信息**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| id | number |  | Y | 优惠券ID |
| sjid | number |  | Y  | 商家ID |
| sjname | string |  | Y | 商家名称 |
| name | string |  | Y | 优惠券名称 |
| num | number |  | Y | 优惠券总数 |
| type | number |  | Y | 优惠券类型:<br/>1: 优惠券<br/>2: 优惠码 |
| subType | number |  | Y | 优惠券子类型:<br/>1：满减券<br/>2：折扣券<br/>3：随机券<br/>4：核销券<br/>5：兑换券<br/>6：现金券 |
| status | string |  | Y | 优惠券状态：1创建，2生效，3过期，4失效 5逻辑删除 |
| discountType | number |  | Y | 优惠类型：   1：金额   2：折扣 |
| discountVal | BigDecimal |  | Y | 优惠金额,当优惠类型是折扣表示打几折(0~100) |
| randomType | number |  | N | 优惠金额是否随机   1：不随机   2：随机 |
| randomStart | BigDecimal |  | N | 随机开始值 |
| randomEnd | BigDecimal |  | N | 随机结束值 |
| thresholdType | number |  | N | 使用门槛:   1:无门槛   2:订单金额满多少使用 |
| thresholdVal | BigDecimal |  | N | 当使用门槛为2时，该项有值 |
| thresholdMode | number |  | N | 门槛使用模式，当使用门槛为2时有效；   1:实际支付金额，2:销售金额 |
| ~~diejiaType~~ | ~~number~~ | ~~~~ | ~~N~~ | ~~是否叠加，   ~~~~1：不允许叠加，   ~~~~2：可以叠加~~ |
| stackUse | number |  | N | 未上线   优惠券是否可叠加使用状态:   0:不可叠加,    1:可和其他券叠加   2:可和自身叠加使用   9:可和其他券&自身叠加使用 |
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
| totalUserNums | number |  | N | 累计领取的用户数 |
| totalUserDrawNums | number |  | N | 累计用户领取次数 |
| totalUsedNums | number |  | N | 累积已使用次数 |


### 正确响应示例

```json
{
  "response": [
    {
      "id": 6863,
      "sjid": 9601,
      "sjname": "衣食无忧",
      "name": "自动化专用营销券20241217122842",
      "num": 999,
      "type": 1,
      "status": 2,
      "discountType": 1,
      "discountVal": 1.0,
      "randomType": 1,
      "randomStart": 0.0,
      "randomEnd": 0.0,
      "thresholdType": 1,
      "thresholdVal": 0.0,
      "thresholdMode": 1,
      "diejiaType": 1,
      "drawLimit": 1,
      "effectType": 1,
      "startTime": "2024-12-17 00:00:00",
      "endTime": "2024-12-17 23:59:59",
      "effectDays": 1,
      "distanceDays": 1,
      "remindType": 0,
      "adaptType": 1,
      "shareType": 2,
      "createTime": "2024-12-17 12:28:42",
      "remark": "",
      "origPriceUse": 0,
      "totalUserNums": 1,
      "totalUserDrawNums": 1,
      "totalUsedNums": 0
    }
  ]
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

