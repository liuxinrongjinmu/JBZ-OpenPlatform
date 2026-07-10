# 11.4.门店详情信息查询

---

**接口说明**：查询商家门店详情信息列表

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/queryDetail?access_token=[token]

**参数说明**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| id | NUmber | Y | 门店ID |

**返回结果**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| records | List&lt;OpenStoreDetailVO&gt; | Y | 搜索到的列表 |

OpenStoreDetailVO

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| storeId | Long | Y | 门店ID |
| storeName | **String** | Y | 门店名称 |
| storeAddress | **String** | Y | 详细地址 |
| telPhone | **String** | Y | 座机号码 |
| businessStart | **String** | Y | 营业开始时间 |
| businessEnd | **String** | Y | 营业结束时间 |
| businessDay | **String** | Y | 营业日 |
| storeType | **String** | Y | 门店类型 ：1直营店 2加盟店 3联营店 4店中店 |
| attribute | **String** | Y | 门店属性：1、线下门店2、合作自提点 |
| created | **LocalDateTime** | Y | 创建时间 |
| state | **String** | Y | 门店是否开启 0 启用 1 停用 |
| orderId | **String** | Y | 门店管理员会员编号 |
| code | **String** | Y | 片区code |
| storeState | **String** | Y | 所属省 |
| storeCity | **String** | Y | 所属市 |
| storeDistrict | **String** | Y | 所属区 |
| osoStartTime | **String** | Y | 线上门店运营开始时间 |
| osoEndTime | **String** | Y | 线上门店运营结束时间,格式23:59 |
