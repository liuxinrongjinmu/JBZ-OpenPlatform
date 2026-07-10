# 6.4.第三方修改平台会员等级

---

**接口说明**：通过第三方用户ID修改平台会员等级

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`

**请求地址**：https://api.c3tech.cn/oauthentry/user/updateUserLevelForThird?access_token=<span v-pre>{{access_token}}</span>

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| userid | String | Y | 123 | 第三方会员ID |
| level | String | Y | 代言人 | 聚宝赞等级名称 |

### 成功响应

```json
{
  "response": "成功;"
}
```

### 错误响应

```json
{
  "error_response": {
    "code": "1009",
    "msg": "用户不存在"
  }
}
```

