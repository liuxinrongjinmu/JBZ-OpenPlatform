# 7.4.用户消息

---

**接口说明**：平台推送消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功，平台会推送变更事件，在半个小时内每5分钟重推一次。

**消息类型**：USER_INFO_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| mobile | String | N | 会员手机号 |
| name | String | N | 会员姓名 |
| agentid | Long | Y | 会员ID |
| fxid | Long | Y | 会员等级ID |
| fxname | String | Y | 等级名称 |
| zmrid | String | N | 上级id |
| nick | String | N | 昵称 |
| headurl | String | N | 头像 |
| createdate | String | Y | 创建日期 |
| orderid | String | Y | 会员编号 |
| type | String | Y | INSERT=新增 UPDATE=更新 DELETE=删除 |
| updateField | String | N | 更新字段 headurl |
| status | Int | Y | 用户状态 1=正常 2=冻结 10=注销 |

### 公共请求示例

```json
{
  "id": "E20141119131459763628",
  "client_id": "shex888",
  "type": " TRADE_ COMMISION_STATE ",
  "msg": "UrlEncode(用户msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```

### 用户msg示例

```json
{
  "agentid": 101480973,
  "mobile": null,
  "fxid": 3952,
  "sjid": 1617,
  "fxname": "粉丝",
  "name": "扶摇",
  "zmrid": 0,
  "headurl": "https://xs.c3tech.cn/picbooks/1014825901121889485081018368!small",
  "nick": "扶摇",
  "createdate": "2023-06-23 19:48:16",
  "orderid": "jbz189882",
  "type": "UPDATE",
  "updateField": "headurl",
  "status": 1
}
```

