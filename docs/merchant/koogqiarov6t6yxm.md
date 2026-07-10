# 4.11.删除积分商品

---

**接口说明**：积分商品删除接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/goods/delScoreGoods?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| numIid | Long | Y | 1000123 | 商品ID |

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

