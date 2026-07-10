# 订单支付流水查询

---

### 接口说明：跨境订单，ERP报关支付流水查询

**请求方式**：GET（HTTPS）

**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/getOrderPaymentInfoByTid?access_token=<span v-pre>{{token}}</span>

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| tid | String | N | 订单号（订单号精确查找,不过滤订单状态, 交易状态条件无效） |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| tradeDate | String | Y | 交易成功日期 |
| tradeNo | String | Y | 交易流水号 |
| tid | String | Y | 订单编号 |
| channel | String | Y | 渠道 WeChat=微信原生 heliCrossBorder=合利宝跨境 yeePay= 易宝支付  huifuPay=汇付支付 |
| amount | Double | Y | 支付金额 |

### 正确响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "tradeDate": "2022-07-04 11:03",
      "tradeNo": "20210818140414464551197",
      "tid": "S20220624103347750383543",
      "channel": "heliCrossBorder",
      "amount": 9.99
    }
  },
  "msg": null
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": "101",
    "msg": "订单编号不能为空"
  }
}
```

```json
{
  "error_response": {
    "code": "102",
    "msg": "查询异常,订单信息未找到"
  }
}
```