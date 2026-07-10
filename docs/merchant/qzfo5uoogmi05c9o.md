# 11.1.门店列表查询

---

## 接口说明

查询商家门店列表

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/queryPage?access_token=[token]
## 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| pageNo | Number | Y | 页码 |
| pageSize | Number | Y | 每页条数，最大100个 |
| storeIds | array | N | 门店ID集合 |
| storeName | String | N | 门店名称 |
| storeType | String | N | 门店类型：1：直营店；2：加盟店；3：联营店；4：店中店，不传：全部 |
| attribute | String | N | 门店属性：1、线下门店2、合作自提点 |
| state | String | N | 门店状态，0：正常；1：停业，不传：全部 |
| orderId | String | N | 门店所有者 |
| startTime | LocalDateTime | N | 开始时间 |
| endTime | LocalDateTime | N | 结束时间 |

## 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| records | List&lt;OpenStoreVO&gt; | Y | 搜索到的列表 |

OpenStoreVO

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
| storeDistrict | **String** | Y | 所属区 |
| created | **LocalDateTime** | Y | 创建时间 |
| state | **String** | Y | 门店是否开启 0 启用 1 停用 |
| orderId | **String** | Y | 门店管理员会员编号 |
| managerAgentId | **Long** | N | 门店管理员会员ID |
| bossAgentId | **Long** | N | 店老板会员ID |


### 正确响应示例

```json
{
  "response": {
    "records": [
      {
        "storeId": 1082,
        "storeName": "中电软件园小店"
      }
    ]
  },
  "traceId": "35b8884f29ef433f"
}
```


### 错误响应示例

```json
{}
```
