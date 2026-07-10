# 11.8.修改用户归属门店

---

**接口说明**：修改用户归属门店

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/updateUserStore?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| userId | Long | Y | 用户ID |
| storeId | Long | N | 门店Id(为空则清除归属门店) |
| clerkUserId | Long | N | 店员ID（为空则清楚归属店员，店员需属于门店下） |
| changeZmr | Integer | N | 推荐人修改（修改推荐人为店员）<br/>0->不修改<br/>1->修改 |
| changeOrder | Integer | N | 变更订单归属店铺<br/>0->不变更<br/>1->变更 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| response | Boolean | Y | true-成功；false-失败 |

### 成功响应示例

```json
{
  "response": true,
  "traceId": "fbf3dabe7b13dbd7"
}
```

### 错误响应示例

