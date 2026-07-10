# 5.20.订单门店修改

---

**接口说明**：修改订单归属门店，核销门店仅支持未发货，未备货状态订单

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/modifyStore?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| orderNos | List&lt;String&gt; | Y | 订单号集合（最多100笔） |
| storeId | Long | Y | 门店Id |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| errorNum | Integer | Y | 失败数 |
| errorInfos | List&lt;ErrorInfos&gt; | Y | 失败明细 |

#### ErrorInfos

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| orderNo | String | Y |  | 订单号 |
| errorMessage | String | Y |  | 失败原因 |

### 正确响应示例

```json
{
  "errorNum": 0,
  "errorInfos": []
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
