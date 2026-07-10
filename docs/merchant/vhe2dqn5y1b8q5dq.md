# 3.1.店铺信息

---

**接口说明**：查询商家店铺基本信息

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/info?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| shopId | String | Y | 店铺ID |
| shopName | String | Y | 店铺名称 |
| phone | String | N | 联系电话 |
| province | String | N | 省 |
| city | String | N | 市 |
| district | String | N | 区 |
| address | String | N | 详细地址 |
| shopDesc | String | N | 店铺说明 |
| logo | String | N | 是店铺logo |
| createDate | String | N | 创建日期 |


### 正确响应示例

```json
{
  "response": {
    "shopId": "1617",
    "shopName": "聚宝测",
    "province": "重庆市",
    "city": "重庆市",
    "district": "大渡口区",
    "address": "https://wx.jubaozan.cn/front/shop/getMainPage.do?siteId=1617&pageType=2",
    "phone": "18569596673",
    "shopDesc": "1",
    "logo": "https://xs.c3tech.cn/1596005118758JBZ-01.png",
    "createDate": "2018-11-02 14:25:54"
  }
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "400",
    "msg": "Invalid access token: 66452a82-4b0b-4ace-8cd5-06288f86e92"
  }
}
```

