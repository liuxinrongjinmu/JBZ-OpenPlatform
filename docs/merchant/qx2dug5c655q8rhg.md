# 10.3.新增优惠券模板

---

**接口说明**：新增优惠券模板

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/coupon/template/save?access_token=[token]

**参数说明**：

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| name | string |  | Y | 优惠券名称 |
| num | number |  | Y | 优惠券总数 |
| subType | Integer |  | Y | 子类型：<br/>1-满减券，<br/>2-折扣券，<br/>3-随机金额券 |
| sceneType | Integer |  | Y | 场景: 1-普通券码，2-新人券 |
| discountType | Integer |  | Y | 优惠形式: 1金额，2折扣 |
| discountVal | BigDecimal |  | Y | 优惠金额,当优惠类型是折扣表示打几折(0~100) |
| randomType | number |  | N | 优惠金额是否随机<br/>1：不随机<br/>2：随机 |
| randomStart | BigDecimal |  | N | 随机开始值 |
| randomEnd | BigDecimal |  | N | 随机结束值 |
| thresholdType | number |  | N | 使用门槛:<br/>1:无门槛<br/>2:订单金额满多少使用 |
| thresholdVal | BigDecimal |  | N | 当使用门槛为2时，该项有值 |
| thresholdMode | number |  | N | 门槛使用模式，当使用门槛为2时有效；<br/>1:实际支付金额，<br/>2:销售金额 |
| stackUse | number |  | N | 优惠券是否可叠加使用状态:<br/>0:不可叠加,<br/>1:可和其他券叠加<br/>2:可和自身叠加使用<br/>9:可和其他券&自身叠加使用 |
| drawLimit | number |  | N | 每人领取限制，0表示无限制 |
| effectType | number |  | Y | 失效时间类型：<br/>1：表示固定时间，根据开始时间和结束时间来<br/>2：表示领到券当日开始几天内有效<br/>3：表示领到券次日开始几天内有效 |
| startTime | Date |  | Y | 生效时间 |
| endTime | Date |  | Y | 过期时间 |
| effectDays | number |  | N | 当有效类型为2，3的时候，该项有值，几天内有效 |
| distanceDays | number |  | N | 当有效类型为3时，标识几天后开始生效默认次日开始生效 |
| remindType | number |  | N | 到期提醒：单位天,0不提醒 |
| adaptType | number |  | N | 适应范围：<br/>1:示全部<br/>2:示指定商品可以<br/>3:示指定商品不可以 |
| numIidList | List&lt;Long&gt; |  | N | adaptType不为1时关联的商品 |
| shareImage | String |  | N | 分享图片 |
| shareText | String |  | N | 分享文案 |
| transferText | String |  | N | 转增文案 |
| remark | String |  | N | 备注 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Long | Y | 1244 | 优惠券模板ID |

### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": 2333
  }
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
