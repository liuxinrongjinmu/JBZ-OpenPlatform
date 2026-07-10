# 4.3.查询商品总数量

---

**接口说明**：根据出售状态统计商品总数量

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`


**请求地址**：https://api.c3tech.cn/oauthentry/goods/count?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| salesStatus | Number | Y | 使用商家token时参数列表：0=仓库中 其他数字=已上架   使用供应商token时参数列表：1=出售中 2=已售罄 3=仓库中 其他数字=全部   |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| body | Number | Y | 商品数量 |

### 成功返回结果

```json
{
  "response": 2872
}
```

### 错误返回结果

```json
{
  "error_response": {
    "code": "400",
    "msg": "Invalid access token: 137d1351-71d1-4791-9a69-00582b22614"
  }
}
```

