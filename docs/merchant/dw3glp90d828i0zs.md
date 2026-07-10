# 8.4.删除模板

---

**接口说明**：删除模板接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/express/postfee/template/remove?access_token=[token]](https://api.c3tech.cn/oauthentry/express/postfee/template/remove?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| id | String | Y | 100 | 模板ID |


### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": true
  }
}
```


### 错误响应示例

```json
{
  "error_response": {
    "msg": "失败",
    "code": 123005
  }
}
```

