# 5.11.查询跨境配置

---

**接口说明**：查询跨境配置

**请求方式**：GET（HTTPS）

**请求地址**：https://api.c3tech.cn/oauthentry/trades/orders/crossBorderConfig?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
**返回结果**：
| 参数 | 类型 | 说明 |
| --- | --- | --- |
| sjid | LONG | 商家ID |
| customsType | String | 海关通道 |
| commerceCode | String | 海关企业备案号 |
| commerceName | String | 海关企业备案名称 |
| inspectionType | String | 国检通道 |
| ebpCode | String | 电商平台海关编码 |
| payCode | String | 支付企业海关编码 |
| accountNo | String |  |
| accoutName | String |  |
### 确响应示例## 误响应示例