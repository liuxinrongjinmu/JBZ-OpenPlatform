# 直播间列表

---

# 接口说明

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/live/queryList?access_token=[token]

> Body 请求参数

>

# 请求参数

| 名称 | 类型 | 必选 | 中文名 | 说明 |
| --- | --- | --- | --- | --- |
| liveIds | [integer] | N | 直播间ID集合 |  |
| pageNo | Integer | Y | 页码 |  |
| pageSize | Integer | Y | 每页显示数 |  |
| startTime | String(date-time) | N | 直播开始时间 | yyyy-MM-dd HH-mm-ss |
| endTime | String(date-time) | N | 直播结束时间 | yyyy-MM-dd HH-mm-ss |

## 示例：

```json
{
  "endTime": "2019-08-24 14:15:22",
  "liveIds": [
    12
  ],
  "pageNo": 0,
  "pageSize": 10,
  "sjid": 0,
  "startTime": "2019-08-24 14:15:22"
}
```


# 返回结果

| 名称 | 类型 | 必选 | 中文名 | 说明 |
| --- | --- | --- | --- | --- |
| items | [[LiveRoomVO](#schemaliveroomvo)] | N | 直播间列表 |  |
| sjid | Long | N | 商家id |  |

## LiveRoomVO

| 名称 | 类型 | 必选 | 中文名 | 说明 |
| --- | --- | --- | --- | --- |
| column | String | N | 栏目 | 栏目 |
| cover | String | N | 直播封面图 | 直播封面图 |
| share | String | N | 直播分享图 | 直播分享图 |
| endTime | String(date-time) | N | 直播结束时间 | 直播结束时间 |
| liveId | Long | N | 直播间id | 直播间id |
| name | String | N | 直播间名称 | 直播间名称 |
| domain | String | N | 域名 | 域名 |
| startTime | String(date-time) | N | 开始时间 | 开始时间 |
| status | Integer | N | 直播间状态 | 101-直播中,<br/>102-预告(新建),<br/>103-已结束,<br/>104-禁播,<br/>105-暂停,<br/>106-异常,<br/>107-已过期,<br/>108-回放 |
| type | Integer | N | 类型 | 4-私域直播   |
| storeMode | Integer | N | 门店模式 | 0-非门店模式，1-门店模式 |
| storeCanView | Integer | N | 指定门店用户观看<br/><font style="color:#DF2A3F;"></font> | 0-不开启，1-开启 |
| storeGroupList | `List<StoreGroup>` | N | 门店分组<br/><font style="color:#DF2A3F;"></font> |  |

#### StoreGroup

| 名称 | 类型 | 必选 | 中文名 | 说明 |
| --- | --- | --- | --- | --- |
| storeGroupId | Long | N | 门店Id |  |
| storeGroupName | String | N | 门店名称 |  |


示例：

```json
{
  "items": [
    {
      "column": "String",
      "cover": "String",
      "endTime": "2019-08-24 14:15:22Z",
      "liveId": 0,
      "name": "String",
      "startTime": "2019-08-24 14:15:22Z",
      "status": 0,
      "type": 0
    }
  ],
  "sjid": 0
}
```
