# 9.5.积分冻结操作

---

**接口说明**：会员积分冻结接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/score/freeze?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| userId | Long | Y | 1000123 | 聚宝赞用户ID |
| score | Integer | Y | 1000 | 积分 |
| operationType | String | Y | THREE_SEND | 操作类型;   THREE_SEND: 第三方活动发放积分 |
| bizCode | String | Y |  | 业务单号(唯一) |
| remark | String | N |  | 业务操作描述 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | boolean | Y | true |  |


### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": true
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

