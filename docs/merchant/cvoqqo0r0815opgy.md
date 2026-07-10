# 13.4.优选联盟商品查询

---

### 接口说明：查询商家优选联盟商品

**请求方式**：POST（HTTPS）

**请求地址**：https://api.c3tech.cn/oauthentry/goods/queryLmGoods?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| pageNo | Number | Y | 页码 |
| pageSize | Number | Y | 每页条数，最大100个 |
| groupIds | `List<Long>` | N | 分组ID<font style="color:#DF2A3F;"></font> |
| tile | String | N | 商品名称 |
| numIidList | `List<Long>` | N | 商品ID集合 |
| goodsCodes | `List<String>` | N | 商品编码集合 |
| minPrice | BigDecimal | N | 最小销售价 |
| maxPrice | BigDecimal | N | 最大销售价 |
| minServiceRatio | BigDecimal | N | 最小机构服务费率 |
| maxServiceRatio | BigDecimal | N | 最大机构服务费率 |
| minServiceMoney | BigDecimal | N | 最小机构服务费 |
| maxServiceMoney | BigDecimal | N | 最大机构服务费 |
| timeType | Integer | N | 时间类型;   1-创建时间<br/>6-开售时间<br/>7-停售时间<br/>8-推广时间 |
| startTime | LocalDateTime | N | 开始时间 |
| endTime | LocalDateTime | N | 结束时间 |
| hasPublish | Integer | N | 上下架状态；<br/>0-下架<br/>1-出售中(上架)<br/>3-仓库<br/>4-待开售 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| **`List<LmGoodsVO>`** | | | |

**LmGoodsVO商品明细**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| name | String | Y | 商品名称 |
| numIid | Long | Y | 商品ID |
| sjid | Long | Y | 商家ID |
| goodsCode | String | Y | 机构商品编码 |
| price | BigDecimal | Y | 销售价 |
| storeAppid | String | Y | 来源店铺APPId |
| storeName | String | Y | 来源店铺名称 |
| headSupplierAppidName | String | N | 供货机构名称 |
| headSupplierAppid | String | N | 供货机构Appid |
| serviceMoney | BigDecimal | N | 机构服务费 |
| serviceRatio | Double | N | 机构服务费率 |
| listingTime | LocalDateTime | N | 开售时间 |
| createAt | LocalDateTime | N | 创建时间 |
| groupList | `List<GroupVO>` | N | 机构分组列表 |
| hasPublish | Integer | N | 上下架状态；<br/>0-下架<br/>1-出售中(上架)<br/>3-仓库<br/>4-待开售 |
| upTimed | LocalDateTime | N | 推广上架时间 |
| downTimed | LocalDateTime | N | 推广下架时间 |
| skuList | `List<SkuVO>` | N | 规格列表 |

**GroupVO**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| groupId | Long | Y | 分组ID |
| groupName | String | Y | 分组名称 |

**SkuVO**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| skuUniqueCode | String | Y | 商品规格编码 |
| skuUniqueName | String | Y | 商品规格名称 |
| costPrice | BigDecimal | Y | 成本 |
| price | BigDecimal | Y | 销售价 |
| originPrice | BigDecimal | Y | 原件 |
| supplyPrice | BigDecimal | Y | 供货价 |
| skuCode | String | Y | 机构编码 |

### 正确响应示例

```json
{
  "response": [
    {
      "numIid": 1879560,
      "sjid": 9601,
      "goodsCode": "xxxxx",
      "price": 56.0,
      "storeAppid": "xxxxx",
      "storeName": "361°冠宇昇晖运动户外",
      "headSupplierAppidName": "",
      "headSupplierAppid": "xxxxxxx",
      "serviceMoney": 9.31,
      "serviceRatio": 19.0,
      "createAt": "2025-07-21 16:55:31",
      "groupIds": [
        6,
        7,
        14
      ],
      "groupList": [
        {
          "groupName": "达人直推",
          "groupId": 6
        },
        {
          "groupName": "生鲜水果",
          "groupId": 7
        },
        {
          "groupName": "健康保健",
          "groupId": 14
        }
      ],
      "hasPublish": 0,
      "upTimed": "1970-01-01 08:00:05",
      "downTimed": "2106-02-07 14:28:10",
      "skuList": [
        {
          "skuUniqueCode": "1001040940-2001045999",
          "costPrice": 52.0,
          "price": 56.0,
          "skuUniqueName": "超级黑,S(90-110斤)",
          "supplyPrice": 50.0,
          "skuCode": "xxxx"
        },
        {
          "skuUniqueCode": "1001040940-20024274",
          "costPrice": 52.0,
          "price": 57.0,
          "skuUniqueName": "超级黑,M(110-130斤)",
          "supplyPrice": 50.0,
          "skuCode": "xxx"
        }
      ]
    }
  ],
  "traceId": "22090e60d613e303"
}
```

### 错误响应示例

```json
{}
```