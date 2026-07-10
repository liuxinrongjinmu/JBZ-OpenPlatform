# 7.12.门店消息

---

**接口说明**：门店变更通知

**消息类型**：STORE_CHANGE_EVENT

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 门店变更通知参数说明
| body | | | | |
| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| storeId | Long | 9601 | Y | 门店id |
| sjId | Long | 112234 | Y | 商家id |
| changeType | Integer | 1 | Y | 变更类型（ 1-门店创建；2-门店删除；3-门店启用；4-门店停用；5-门店信息修改  ） |

### 公共请求示例

```json
{
  "id": "STORE_CHANGE_EVENT-ADD-1",
  "client_id": "123",
  "storeId": 1,
  "sjid": 9538,
  "name": "STORE",
  "msg": "%7B%22storeId%22%3A1%2C%22sjId%22%3A9538%2C%22changeType%22%3A1%7D",
  "type": "STORE_CHANGE_EVENT",
  "state": "ADD",
  "version": "1.0",
  "sign": "0aafa0697cfc6c75635955e7be42093a"
}
```

