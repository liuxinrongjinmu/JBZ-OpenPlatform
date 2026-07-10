# 5.21.订单核销码修改

---

**接口说明**：修改订单核销码

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/modifyWriteOffCode?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| orderNos | List&lt;String&gt; | Y | 订单号集合（最多100笔） |
| writeOffCode | String | Y | 核销码 |

### 正确响应示例

```json
{
  "response": true,
  "traceId": "bd0698d821f0576e"
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": 902,
    "message": "调用异常"
  }
}
```
