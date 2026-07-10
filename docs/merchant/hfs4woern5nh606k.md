# 10.1.会员信息查询

---

**接口说明**：会员信息查询

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`

**请求地址**：https://api.c3tech.cn/oauthentry/user/getMember?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 44c6f2ac-695f-4b00-8d80-249986f5c466 | 授权令牌 |
| agentid | String | N | 123456 | 聚宝赞用户ID（手机号 会员编号   微信unionid 五选一） |
| mobile | String | N | 15292248762 | 手机号（会员ID 会员编号   微信unionid 五选一） |
| orderid | String | N | 123123 | 会员编号（会员ID 手机号 微信unionid 五选一） |
| unionid | String | N | oF2AswO-iK8KG4NjSN0kq2RtUaqg | 微信unionid （会员编号 会员ID  手机号 五选一） |
| ~~thirdid~~ | ~~String~~ | ~~N~~ | ~~12322~~ | ~~第三方用户id（同会员同步agentid五选一）~~ |

**返回结果**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| mobile | String | N | 会员手机号 |
| name | String | N | 会员姓名 |
| agentid | Long | Y | 会员ID |
| orderid | String | Y | 会员编号 |
| fxid | Long | Y | 会员等级ID |
| fxname | String | Y | 等级名称 |
| nick | String | N | 昵称 |
| headurl | String | N | 头像 |
| zmrid | Long | N | 上级id |
| createdate | String | Y | 创建日期 |
| thirdid | ~~String~~ | ~~N~~ | ~~12322~~ |
| userorgremark | String | Y | 收益人组织架构备注 |
| userorgname | String | Y | 组织机构分组名称 |

**正确响应示例**：

```json
{
  "response": {
    "agentid": 14507864,
    "mobile": "13142275187",
    "fxid": 3957,
    "sjid": 1617,
    "fxname": "市代",
    "name": "谢阳升",
    "zmrid": 14508800,
    "nick": "Hunter",
    "headurl": "http://thirdwx.qlogo.cn/mmopen/ACgOFk2dEtUZ7khu8nQ7Lnl8cWCVQoXQgD81WlyaYd6YFFGibOrrZe1hywXWH09iacibUMTp5iciax6ichNAvm7oNCia4NKn0EqmL0f/132",
    "createdate": "2019-05-13 12:21:30",
    "orderid": "377",
    "userorgremark": "某组织"
  }
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "code": "1009",
    "msg": "用户不存在"
  }
}
```

