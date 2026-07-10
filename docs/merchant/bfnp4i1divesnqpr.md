# 10.17.查询用户会员卡等级

---

**接口说明**：查询用户会员卡等级

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/queryUserMember?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |
| userIds | List&lt;Long&gt; | Y | [13321,33421] | 聚宝赞用户ID集合(最多100) |

### 返回结果

`List&lt;MemberVO&gt;`

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |

#### MemberVO

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| userId | Long | Y | 会员ID |
| levelId | Integer | Y | 会员卡等级ID |
| levelName | String | Y | 会员卡名称 |
| endTime | LocalDateTime | N | 到期时间 |

### 正确响应示例

```json
{
  "response": [],
  "traceId": "75853702274ee529"
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": 500003,
    "msg": "查询失败"
  }
}
```
