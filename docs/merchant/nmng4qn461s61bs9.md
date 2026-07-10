# 11.2.创建或修改门店

---

**接口说明**：创建或修改门店

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/saveStore?access_token=[token]

### 请求参数

| 名称 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| id | Integer | false | 聚宝赞门店id修改时必传 |
| attribute | Integer | false | 门店属性：1、线下门店2、合作自提点 |
| businessDay | string | false | 营业日,格式:周一,周二,周三 |
| businessEnd | string | false | 营业结束时间,格式23:59 |
| businessStart | string | false | 营业开始时间,格式00:00 |
| cityCode | string | false | 所属市 code |
| code | string | false | 片区code |
| customNav | string | false | 商城导航菜单是否能编辑 0 能 1 不能 |
| customNavState | string | false | 0 自定义导航 1总部导航 |
| customPage | string | false | 商城页面是否能编辑 0 能 1 不能 |
| districtCode | string | false | 所属区 code |
| email | string | false | 邮箱地址 |
| intervalDays | Integer | false | 下单 ? 天后可提货 |
| intervalHour | Integer | false | 下单 ? 小时后可提货 |
| intervalMinutes | Integer | false | 下单 ? 分钟后可提货 |
| lat | number(double) | false | 纬度 |
| logo | string | false | 门店logo |
| lon | number(double) | false | 经度 |
| mobile | string | false | 手机号码 |
| nick | string | false | 昵称 |
| openid | string | false | openid |
| osoEndTime | string | false | 线上门店运营结束时间,格式23:59 |
| osoStartTime | string | false | 线上门店运营开始时间,格式00:00 |
| owner | string | false | 店主姓名 |
| managerAgentid | Long | false | 门店管理者ID |
| pickupSettings | Integer | false | 提货设置 1最早当天可提货  2按指定天数备货  3下单后立即可提货 |
| pointTitle | string | false | 地图名称 |
| regionName | string | false | 片区名称 |
| sellOrder | Integer | false | 销售订单数 |
| shopCheck | Integer | false | 核对商品数 |
| shopInventory | Integer | false | 商品总库存 |
| state | string | false | 门店是否开启 0 启用  1停用 |
| stateCode | string | false | 所属省 code |
| storeAddress | string | false | 详细地址 |
| storeCity | string | false | 所属市 |
| storeDescription | string | false | 门店描述 |
| storeDistrict | string | false | 所属区 |
| storeName | string | false | 门店名称 |
| storeState | string | false | 所属省 |
| storeType | string | false | 门店类型 1直营店 2加盟店 3联营店 4店中店 |
| telPhone | string | false | 座机号码 |
| thirdStoreId | Long | false | 第三方门店ID |
| thirdStoreName | string | false | 第三方门店名称 |
| thirdStoreType | Integer | false | 第三方门店类型 |

### 返回结果

| 名称 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- |
| response | Long | false | 门店id |
| traceId | string | false | traceId |


### 正确响应示例

```json
{
  "response": 1234,
  "traceId": "string"
}
```
