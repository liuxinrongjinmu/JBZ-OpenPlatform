# 7.2.消息公共参数

---

**接口说明**：推送消息公共参数，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败。消息推送失败后，1小时内会重新推送3次,.

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

**参数说明**：
| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | String | Y | E20141119131459763628 | 业务消息ID |
| client_id | String | Y | shex888 | 开放平台client_id |
| type | enum | Y | TRADE_ORDER_STATE | **TRADE_ORDER_STATE  **：订单消息<br/>**USER_INFO_STATE**：用户事件 <br/>**TRADE_COMMISION_STATE**：佣金消息<br/>**AFTER_SALES_STATE**：售后消息<br/>**COUPON_TEMPLATE_STATE**：优惠券模板消息<br/>**LM_TRADE_ORDER_STATE**：联盟订单消息<br/>**TRADE_SALE_DETAIL_STATE**：订单销售<br/>**SHOP_GOODS_STATE**：商品消息   <br/>**STORE_CHANGE_EVENT**：门店消息<br/>**LIVE_USER_WATCH_TIME**：直播时长消息<br/>**COUPON_SEND_EVENT**：优惠券发放消息<br/>**LIVE_STATUS**：直播间状态消息<br/>**SCORE_BATCH_CHANGE_DETAIL**：批量积分消息       |
| msg | String | Y | msg json | 经过UrlEncoder（UTF-8）编码的消息对象，具体参数请看本页中各业务消息结构文档 |
| ~~shop_id~~ | ~~Long~~ | ~~N~~ | ~~1231232~~ | ~~店铺id，TRADE_ORDER_STATE-订单消息   ~~~~AFTER_SALES_STATE-售后消息~~ |
| sjid | Long | Y | 1231232 ID | 商家ID |
| sign | String | 是 | sign | 防伪签名 ：MD5(client_id+msg+client_secrect) ; MD5 方法可通过搜索引擎搜索得到或者可参考 MD5 |
| version | String | Y | 1.0 | 版本号 |

### 公共请求示例

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

