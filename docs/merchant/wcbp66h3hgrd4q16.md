# 12.2.组织机构添加用户

---

**接口说明**：批量将用户添加至分组，用户所在分组超过20个会失败

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/userGroup/addUser?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| groupId | Number | Y | 机构ID |
| userNoList | List | Y | 用户编号列表，最多1000个 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| code | number | Y | 200-全部成功   300-部分成功   400-全部失败 |
| failList | **List** | N | 添加失败的数据 |
| noExitList | **List** | N | 不存在的数据 |
| groupMaxList | **List** | N | 超过20个机构的数据(用户所在机构不能超过20个) |
| failMessage | **String** | N | 失败原因 |
| repeatList | **List** | N | 重复数据 |


### 正确响应示例

```json
{
  "response": {
    "code": 200,
    "repeatList": [],
    "failList": [],
    "noExitList": [],
    "groupMaxList": [],
    "failMessage": ""
  },
  "traceId": "2bbeb0ab3bcbc54c"
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

