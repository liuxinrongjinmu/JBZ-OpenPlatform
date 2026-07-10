# 12.3.组织机构删除用户

---

**接口说明**：将用户从分组移除

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/userGroup/delUser?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| groupId | Number | Y | 机构ID |
| userNo | String | Y | 用户编号 |

### 示例

```json
{
  "response": true,
  "traceId": "dee24b8a38306fa1"
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "101",
    "msg": "参数校验错误"
  }
}
```

