# 10.6会员余额变动查询

---

**接口说明**：会员余额变动查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`

**请求地址**：https://api.c3tech.cn/oauthentry/user/queryBalanceLog?access_token=[token]

**请求参数**

_Form:_

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| startTime | 是 | string | 1991-10-10 19:19:30 | 创建的开始时间 ，跨度不超过一个月 |
| endTime | 是 | string | 1991-11-10 19:19:30 | 创建的结束时间，跨度不超过一个月 |
| agentId | 否 | integer | | 会员id:三选一 |
| agentMobile | 否 | string | | 会员手机:三选一 |
| agentNo | 否 | string | | 会员编号:三选一 |
| pageNo | 是 | integer | | 第几页 |
| pageSize | 是 | integer | | 每页条数 |

**响应参数**

_Body:_

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| response | 否 | object | | 响应数据 |
|   ├ code | 否 | string | | 返回码 |
|   ├ msg | 否 | string | | 返回信息 |
|   └ result | 否 | object | | 响应结果 |
|     ├ records | 是 | object[] | | 数据列表 |
|       ├ id | 否 | integer | | id |
|       ├ agentNo | 否 | string | | 会员编号 |
|       ├ agentMobile | 否 | string | | 会员手机号 |
|       ├ agentName | 否 | string | | 会员昵称 |
|       ├ fxname | 否 | string | | 等级名称 |
|       ├ orderNo | 否 | string | | 订单编号 |
|       ├ incomeType | 否 | integer | | 收益类型：-1支出,0收入 |
|       ├ amount | 否 | number | | 金额 |
|       ├ profitRatio | 否 | string | | 收益比例 |
|       ├ bizType | 否 | string | | 业务类型：0全部; 1订单佣金; 2奖励佣金; 3账户变动 |
|       ├ bizSubType | 否 | string | | 业务子类型 |
|       ├ bizSubTypeName | 否 | string | | 业务类型名称 |
|       ├ createdTime | 否 | string | | 创建时间 |
|       └ description | 否 | string | | 描述 |
|     ├ total | 是 | integer | | 总条数 |
|     ├ size | 是 | integer | | 每页大小 |
|     └ current | 是 | integer | | 当前页 |
| traceId | 否 | string | | 请求标识 |

**错误响应示例**：

```json
{
  "error_response": {
    "code": "1009",
    "msg": "用户不存在"
  }
}
```
