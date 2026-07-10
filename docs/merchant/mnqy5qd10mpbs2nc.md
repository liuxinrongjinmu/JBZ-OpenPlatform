# 10.19.修改用户推荐人(根据手机号)

---

**接口说明**：会员信息批量查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`

**请求地址**：https://api.c3tech.cn/oauthentry/user/changeRelationByMobile?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |
| mobile | String | Y | 13321 | 聚宝赞用户手机号 |
| recommend_mobile | String | Y | 1 | 聚宝赞用户推荐人手机号 |

**正确响应示例**：

```json
{
  "response": "变更关系成功",
  "traceId": "75853702274ee529"
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "code": "100000",
    "msg": "变更关系失败"
  }
}
```

