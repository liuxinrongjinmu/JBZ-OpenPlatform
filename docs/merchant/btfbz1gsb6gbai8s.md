# 4.1.查询商家商品信息

---

**接口说明**：查询商家商品基本信息，包含价格、出售状态、商品库存数量。

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/goods/query?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| page_no | Number | N | 页码 |
| page_size | Number | N | 每页条数，默认最大300个 |
| q | String | N | 搜索字段。搜索商品的名称 |
| numIid | Number | N | 商品ID |
| on_sale | Number | N | 使用商家token时参数列表：1=出售中 2=待开售 3=即将售罄 0=仓储中其他数字=全部<br/>使用供应商token时参数列表：1=出售中=已售罄3=仓库中其他数字=全部 |
| tags | String | N | 商品类目 |
| timeType | Integer | N | 时间类型：1:更新时间（未传默认）2:创建时间 |
| start_update | String | N | 商品更新的开始时间例:2017-01-01 12:00:00; 开始时间和结束时间的跨度不能大于3个月; 结束时间必须大于开始时间; 开始时间和结束时间必须成对出现 |
| end_update | String | N | 商品更新的结束时间，例:2017-01-01 12:00:00; 开始时间和结束时间的跨度不能大于3个月; 结束时间必须大于开始时间; 开始时间和结束时间必须成对出现 |
| return_sku_dict_list | Boolean | N | true：返回sku规格名称<br/>false：不返回sku规格名称 |
| groupIds | List&lt;Long&gt; | N | 分组ID |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| total_results | Number | Y | 搜索到的商品总条数 |
| items | **StructurizationGoodsDetail** | N | 商品明细 |

**StructurizationGoodsDetail商品明细**
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| num_iid | Number | Y | 商品ID |
| middle_id | Number | N | 中台ID |
| supplier_id | Number | N | 供应商ID |
| supplier_name | String | N | 供应商名称<br/>（该字段暂未上线） |
| categoryCodeDesc | String | Y | 商品类目，包括一级、二级、三级分类 |
| tags | String | Y | 商品类目 |
| tile | String | Y | 商品名称 |
| origin_price | Double | N | 原价 |
| price | Double | Y | 价格 |
| quantity | Number | Y | 数量 |
| has_publish | Number | Y | 上下架 1：出售中（上架） 0：仓库中（下架） |
| item_skus | **StructurizationSKUDetail** | N | SKU明细 |
| item_imgs | **StructurizationItemImgsDetail** | N | 商品图片 |
| sku_dict_list | **StructurizationItemDict** | N | sku规格名称详细信息 |
| sjCode | String | N | 商品自定义编码 |
| pageId | Number | Y | 商品详情微页面ID |
| goods_url | String | N | 商品购买地址 |
| groupIds | List&lt;Long&gt; | N | 分组ID |
| h5LinkUrl | String | N | 外部H5链接 |
| wxAppLinkUrl | String | N | 外部小程序链接 |
| ~~template~~ | ~~String~~ | ~~Y~~ | ~~商品详情微页面json~~ |
| briefIntroduction | String | N | 商品简介(显示在C端商品列表) |
| postfeeTplId | String | N | 运费模板ID |
| postfeeType | String | Y | 运费类型 <br/>01：统一邮费 <br/>02：运费模板 |
| postfee | Double | Y | 运费 |

**StructurizationSKUDetail商品SKU**
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| sku_id | Number | N | sku_id |
| sku_unique_code | String | Y | sku唯一编码 |
| sku_unique_name | String | Y | sku名称 |
| orgin_price | Double | N | 原价 |
| price | Double | Y | 价格 |
| quantity | Number | Y | 数量 |
| sjCode | String | N | 商品自定义编码 |

**StructurizationImagesDetail商品图片**
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| imgid | Number | Y | 图片ID |
| img_url | String | Y | 图片地址 |
| seq | Number | N | 图片顺序 |

**StructurizationItemDict**
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| itemId | Number | Y | 规格组ID |
| itemName | String | Y | 规格项名称 |
| itemCode | String | Y | 规格项编码自动编码 规则 一个01依次往下 |
| seq | Number | Y | 序号 |
| sku_items_value | **StructurizationItemValue** | Y | 规格 |

**StructurizationItemValue**
| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| valueId | Number | Y | 商品规格项ID |
| itemId | Number | Y | 规格组ID |
| itemName | String | Y | 规格项名称 |
| valueName | String | Y | 商品规格项目值 |
| valueCode | Number | Y | 自动编码 规则：规格编码+三位序号 例如 1001 |
| seq | Number | Y | 规格 |


### 正确响应示例

```json
{
  "response": {
    "total_results": 1,
    "items": [
      {
        "intime": "2022-11-16 10:53:07",
        "tags": "1645-1",
        "tile": "11我家小本本22899SS",
        "price": 16.0,
        "costPrice": 3.0,
        "sjCode": null,
        "quantity": 24,
        "template": null,
        "pageId": 119219,
        "appletPagePath": "pagesB/main/goods/goodsDetail/index?numIid=307923",
        "appid": "wx14cb71fb8d0962da",
        "num_iid": 307923,
        "origin_price": 103.72,
        "has_publish": 1,
        "item_imgs": [
          {
            "seq": 1,
            "imgid": null,
            "img_url": "https://xs.c3tech.cn/9538/2023/material/image/5c019414f7e945edabab02716d133b6c.jpg"
          },
          {
            "seq": 2,
            "imgid": null,
            "img_url": "https://xs.c3tech.cn/9538/2023/material/image/51f6670672c34cb9b378a9e3c5155824.jpg"
          },
          {
            "seq": 3,
            "imgid": null,
            "img_url": "https://xs.c3tech.cn/9538/2023/material/image/602a78f19939403c8a1e05466f20f849.jpg"
          }
        ],
        "item_skus": [
          {
            "price": 16.0,
            "costPrice": 3.0,
            "quantity": 12,
            "sjCode": "",
            "sku_id": 2885546,
            "sku_unique_code": "100101-300210",
            "sku_unique_name": "白色12,小",
            "orgin_price": 103.72
          },
          {
            "price": 16.0,
            "costPrice": 3.0,
            "quantity": 12,
            "sjCode": "",
            "sku_id": 2885547,
            "sku_unique_code": "100209-300210",
            "sku_unique_name": "白色123,小",
            "orgin_price": 103.72
          }
        ],
        "sku_dict_list": [
          {
            "itemId": 666228,
            "itemName": "颜色",
            "itemCode": "100",
            "seq": 1,
            "sku_items_value": [
              {
                "valueId": 5589462,
                "itemId": 666228,
                "itemName": "颜色",
                "valueName": "白色12",
                "valueCode": "100101",
                "seq": 1,
                "imgUrl": null
              },
              {
                "valueId": 5589463,
                "itemId": 666228,
                "itemName": "颜色",
                "valueName": "白色123",
                "valueCode": "100209",
                "seq": 2,
                "imgUrl": null
              }
            ]
          },
          {
            "itemId": 666229,
            "itemName": "大小\t",
            "itemCode": "300",
            "seq": 2,
            "sku_items_value": [
              {
                "valueId": 5589464,
                "itemId": 666229,
                "itemName": "大小\t",
                "valueName": "小",
                "valueCode": "300210",
                "seq": 1,
                "imgUrl": null
              }
            ]
          }
        ],
        "goods_url": "http://dev.h5.c3lt.cn/mall/goodsInfo/307923?siteId=9538"
      }
    ]
  },
  "msg": null
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "3001",
    "msg": "商品更新的开始时间与商品更新的结束时间必须成对出现"
  }
}
```
