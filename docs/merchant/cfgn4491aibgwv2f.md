# 5.13.查询订单核销记录

---

**接口说明**：查询门店自提订单核销记录

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/trades/writeOff/queryList?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| tidList | List&lt;String&gt; | Y | 订单集合 |
**返回结果**：
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| List&lt;WriteOffListVO&gt; | WriteOffListVO | Y | 订单核销列表 |
### WriteOffListVO
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| sjid | Long | Y | 商家ID |
| storeId | Long | Y | 门店ID |
| clerkId | Long | Y | 核销员用户ID |
| clerkUserNo | String | Y | 核销员会员编号 |
| clerkMobile | String | N | 核销员手机号 |
| clerkNick | String | N | 核销员昵称 |
| type | Integer | Y | 核销类型;1:整单核销;2->部分核销；3->用户自主核销 |
| tid | String | Y | 订单编号 |
| createAt | LocalDateTime | Y | 创建时间 |
| updateAt | LocalDateTime | Y | 更新时间 |


### 正确响应示例

```json
{
  "response": {}
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