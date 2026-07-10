# 7.5.佣金消息

---

**接口说明**：平台推送消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会推送变更事件，在半个小时内每5分钟重推一次。

**消息类型**：TRADE_COMMISION_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| orderid | String | Y | 会员编号 |
| mobile | String | N | 会员手机 |
| nick | String | Y | 昵称 |
| tid | String | Y | 订单号 |
| title | String | Y | 订单名称 |
| payment | Double | Y | 订单金额 |
| create_date | String | Y | 下单时间yyyy-MM-dd HH:mm:ss |
| sjid | Long | Y | 商家ID |
| type | Int | Y | 1=分佣 2=部分退佣 3=全额退佣 |
| commissions[] | Commission | N | 佣金结构 |

**Commission[]佣金结构**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| agentid | String | Y | 收益人用户ID |
| orderid | String | Y | 收益人会员编号 |
| money | Double | Y | 分佣金额 |

### 公共请求示例

```json
{
  "id": "E20141119131459763628",
  "client_id": "shex888",
  "type": "TRADE_COMMISION_STATE",
  "msg": "UrlEncode(订单佣金msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```

### 订单佣金msg示例

```json
{
  "orderid": "15198",
  "mobile": "13142275188",
  "nick": "Hunter",
  "tid": "S20220926190944584396124",
  "payment": 0.11,
  "title": "BOOM儿童亲肤",
  "sjid": 9537,
  "type": 1,
  "status": "WAIT_SELLER_SEND_GOODS",
  "commissions": [
    {
      "agentid": 101374270,
      "orderid": "15198",
      "money": 0.01
    }
  ]
}
```

