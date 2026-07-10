# 4.13.小程序转链

---

**请求方式**：POST（HTTPS）

**请求头**：Content-Type：application/json

**请求地址**：https://api.c3tech.cn/oauthentry/goods/transferShortLink?access_token=[token]  参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| link | String | Y | pages/index/index?u=100 | 原始小程序链接 |
| userId | Long | Y | 200 | 需要替换的新用户ID |
| appId | String | Y |  | 小程序appId |

返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| newLink | String | Y | pages/index/index?u=200 | 转换后的新链接 |

### 正确响应示例

```json
{
  "response": {
    "newLink": "pages/index/index?u=200"
  }
}
```

### 错误响应示例

```json
{
  "error_response": {
    "code": "100001",
    "msg": "参数校验错误"
  }
}
```