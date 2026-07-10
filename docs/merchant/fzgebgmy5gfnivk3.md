# 7.10.商品消息

---

### 接口说明：商品创建，上下架状态变更消息.（若需对接该消息，请联系客服）


**消息类型**：SHOP_GOODS_STATE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 订单事件Msg参数说明

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| numIid | Long | 112234 | Y | 商品ID |
| sjid | Long | 9601 | Y | 商家ID |
| type | Integer | 1 | Y | 变更类型:   1:创建   2:状态变更   3:删除<br/>4:信息变更 |
| messageJson | String |  | N | 变更内容:   # type = 2; has_publish上下架状态； 0：下架; 1:上架   {"has_publish":0}       |


### 公共请求示例


```json
{
  "id": "S20230728102*****",
  "client_id": "shex888",
  "type": "SHOP_GOODS_STATE",
  "msg": "UrlEncode(订单msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```


### 订单msg示例


```json
{}
```

