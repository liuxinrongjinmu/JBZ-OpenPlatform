# 4.10.新增积分商品

---

**接口说明**：新增积分商品

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/goods/saveScoreGoods?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| numIid | Long | Y | 1000123 | 商品ID |
| scoreLimitNum | Integer | Y | 0 | 兑换限制:<br/>为0表示不限制每人兑换数量 |
| skuList | List&lt;SKU&gt; | N |  | 多规格商品积分 |
| scoreInfo | Score | N |  | 无规格商品积分 |

#### SKU

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuUniqueCode | String | Y | 1001-2001 | 聚宝赞系统规格CODE |
| scoreInfo | Score | Y | 100 | 积分 |

#### Score

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| scorePrice | BigDecimal | Y | 10.01 | 兑换价值-支付金额 |
| score | Integer | Y | 100 | 兑换价值-支付积分 |
| exchangeNum | Integer | Y | 0 | 可兑换数量库存 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | boolean | Y | true | 操作结果 |

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
