# 5.14.查询订单门店分组

---

### 接口说明：订单门店分组信息查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/queryStoreByTid?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| tidList | `List<String>` | Y | 订单集合 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| `List<TradeStoreVO>` | TradeStoreVO | Y | 订单核销列表 |

#### TradeStoreVO

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| tid | String | Y | <font style="color:rgb(51, 51, 51);">订单编号</font> |
| storeId | Long | Y | <font style="color:rgb(51, 51, 51);">门店ID</font> |
| storeGroupList | `List<StoreGroupVO>` | N | <font style="color:rgb(51, 51, 51);">门店分组列表</font> |

#### StoreGroupVO

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| groupId | Long | Y | <font style="color:rgb(51, 51, 51);">分组ID</font> |
| groupName | String | N | <font style="color:rgb(51, 51, 51);">分组名称</font> |

### 正确响应示例

```json
{
  "response": [
    {
      "tid": "S20251121175129390240514",
      "storeId": 7661,
      "storeGroupList": [
        {
          "groupId": 42,
          "groupName": "小米周"
        },
        {
          "groupId": 50,
          "groupName": "z门店2"
        },
        {
          "groupId": 45,
          "groupName": "小谦测试分组"
        },
        {
          "groupId": 60,
          "groupName": "分组11"
        },
        {
          "groupId": 61,
          "groupName": "产品测试"
        }
      ]
    }
  ],
  "traceId": "d46c5d8f5e7addd5"
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": "101",
    "msg": ""
  }
}
```