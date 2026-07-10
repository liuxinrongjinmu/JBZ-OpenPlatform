# 公共推送参数

---

消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败。

**接口说明**：平台推送公共参数说明

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | String | Y | E20141119131459763628 | 业务消息ID |
| client_id | String | Y | shex888 | 开放平台client_id |
| type | enum | Y | TRADE_ORDER_STATE | TRADE_COMMISION_STATE-订单分佣事件 USER_PROMOTION_STATE-用户升级事件TRADE_ORDER_STATE-订单事件USET_INFO_STATE-用户事件 SUPPLIER_RETAIL_BIND-供货商分销商绑定事件 SUPPLIER_TRADE_ORDER_STATE-供应链订单消息事件 |
| msg | String | Y | msg json | 经过UrlEncode（UTF-8）编码的消息对象，具体参数请看本页中各业务消息结构文档 |
| ~~sjid~~ | ~~Long~~ | ~~Y~~ | ~~1231232 ID~~ | ~~~~ |
| shop_id | Long | Y |  | 供应商ID |
| sign | String | 是 | sign | 防伪签名 ：MD5(client_id+msg+client_secrect) ; MD5 方法可通过搜索引擎搜索得到或者可参考 MD5 |
| version | String | Y | 1.0 | 版本号 |

**公共请求示例**：

```json
{
  "id": "E20141119131459763628",
  "client_id": "shex888",
  "type": " TRADE_ COMMISION_STATE ",
  "msg": "UrlEncode(JSON String)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```

