# 5.15.订单核销

---

**接口说明**：核销门店实物订单

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/writeOff?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| orderNo | String | Y | 订单号 |
| storeId | Long | Y | 核销门店 |
| userId | Long | Y | 核销员（需核销门店的） |


### 正确响应示例

```json
{
  "response": true
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "902",
    "message": "核销员信息不存在",
    "msg": "核销员信息不存在"
  }
}
```

