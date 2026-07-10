# 9.2.扣减积分

---

**接口说明**：扣减会员积分接口

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn/oauthentry/score/reduceScore?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| reduceScore | Integer(32) | Y | 10 | 积分 |
| agentId | Integer(64) | Y | 1000123 | 会员id |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | boolean | Y | true | 1.返回true会员积分扣减成功 2.返回false会员积分扣减失败（会员编码用户不存在时，或者积分不足时） |


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

