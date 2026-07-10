# 10.15.查询用户列表

---

**接口说明**：会员信息批量查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/queryUserPage?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |
| userIds | List&lt;Long&gt; | N | [13321,33421] | 聚宝赞用户ID集合 |
| startTime | LocalDateTime | Y | 2025-01-01 00:00:00 | 用户创建时间(开始) |
| endTime | LocalDateTime | Y | 2025-01-01 00:00:00 | 用户创建时间(结束) |
| pageNo | Integer | Y | 1 | 页码 |
| pageSize | Integer | Y | 10 | 页数 |

### 返回结果

`List&lt;UserPageVO&gt;`

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |

#### UserPageVO

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| userId | Long | Y | 会员ID |
| mobile | String | N | 会员手机号 |
| name | String | N | 会员姓名 |
| userNo | String | Y | 会员编号 |
| fxId | Long | Y | 会员等级ID |
| fxName | String | Y | 等级名称 |
| nick | String | N | 昵称 |
| headUrl | String | N | 头像 |
| createAt | String | Y | 创建日期 |
| zmrId | Long | N | 推荐人id |
| status | Long | Y | 1:正常;2:冻结;9:未激活;10:注销 |

### 正确响应示例

```json
{
  "response": [
    {
      "userId": 100087728,
      "name": "小汤圆他爸",
      "fxId": 274,
      "nick": "小汤圆他爸",
      "headUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/44ujoHkPCUlVU0XLtQGhEEanFliaqedM2e3mMMuf71ZaGaiaCgNLSRNE7fafXsVgHWsR9tmNzubrogFlkusKAowg/132",
      "userNo": "87220",
      "createAt": "2025-08-25 02:02:24",
      "zmrId": "",
      "status": ""
    },
    {
      "userId": 100088002,
      "name": "test",
      "fxId": 274,
      "nick": "test",
      "headUrl": "a.ico",
      "userNo": "80101",
      "createAt": "2025-08-26 05:05:58",
      "zmrId": "",
      "status": ""
    },
    {
      "userId": 100088003,
      "name": "test",
      "fxId": 274,
      "nick": "test",
      "headUrl": "a.ico",
      "userNo": "80102",
      "createAt": "2025-08-26 09:01:51",
      "zmrId": "",
      "status": ""
    },
    {
      "userId": 100088004,
      "mobile": "15616150222",
      "name": "袁杰",
      "fxId": 274,
      "nick": "袁杰",
      "headUrl": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIXhEFUdLia17nmKMNVMS7bwYn6uAYrFEgHHEwJCvfdQXl4ricUFibn9Acz2NFzUozzc37jprhFwxtA/132",
      "userNo": "80103",
      "createAt": "2025-08-27 01:12:06",
      "zmrId": "",
      "status": ""
    }
  ],
  "traceId": "4abfc3e951094311"
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
