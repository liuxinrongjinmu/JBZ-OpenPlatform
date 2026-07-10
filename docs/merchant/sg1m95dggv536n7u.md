# 5.9.订单批量备货

---

**接口说明**：订单批量备货，发货前置锁定，防止发货时产生售后退款

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/batch/prepared?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| orderNo | String | Y | S202008111856449962295851 | 订单ID |
| orderItemNo | List | 是 | ["S2020081118564499622958511","S2020081118564499622958512"] | 子订单号，子订单中ID |

**请求体示例**

```json
[
  {
    "orderNo": "S202008111856449962295851",
    "orderItemNo": [
      "S2020081118564499622958511",
      "S2020081118564499622958512"
    ]
  },
  {
    "orderNo": "S202008111856449962295852",
    "orderItemNo": [
      "S2020081118564499622958521",
      "S2020081118564499622958522"
    ]
  }
]
```

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| errorNum | Integer | Y | 失败数 |
| errorInfos | List[ErrorInfos] | Y | 失败明细 |

**ErrorInfos**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| code | String | Y | 子订单号 | |
| value | String | Y | 失败原因 | |


### 正确响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "errorNum": 2,
      "errorInfos": [
        {
          "code": "S2020081118564499622958511",
          "value": "售后中订单不能备货"
        },
        {
          "code": "S2020081118564499622958512",
          "value": "售后中订单不能备货"
        }
      ]
    }
  }
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "100001",
    "msg": "订单编号不能为空"
  }
}
```

