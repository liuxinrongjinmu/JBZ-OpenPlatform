# 7.17.优选联盟商品消息

---

### 接口说明：平台推送消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功。


**消息类型**：LM_GOODS_STATUS

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| numIid | Long |  | Y | 商品ID |
| oldHasPublish | Integer |  | Y | 优选联盟商品旧状态;<br/>0-下架<br/>1-出售中(上架)<br/>2-待选品<br/>3-仓库<br/>4-待开售 |
| newHasPublish | Integer |  | Y | 优选联盟商品新状态;<br/>0-下架<br/>1-出售中(上架)<br/>2-待选品<br/>3-仓库<br/>4-待开售 |
| status | Integer |  | Y | 0:删除<br/>1:存在 |


### 公共请求示例


```json
{
  "id": "1222333",
  "client_id": "shex888",
  "type": " LM_GOODS_STATUS",
  "msg": "UrlEncode(商品信息msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```


### 订单msg示例


```json
{}
```

