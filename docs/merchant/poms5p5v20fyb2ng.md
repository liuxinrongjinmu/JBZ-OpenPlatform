# 4.4.商品同步（新增）

---

### 接口说明：第三方商品同步到商家商品

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/goods/external/new?<font style="color:#DF2A3F;">access_token=[token]&v=2</font>

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| v | String | Y | 2<font style="color:#DF2A3F;"></font> | 接口版本 |

#### GOODS 基本信息

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| externalNumberId | Long | Y | | 外部商品ID |
| versionId | Number | Y | 1620992665286 | 商品变更版本号 |
| tile | String | Y | 测试商品 | 商品名称 |
| goodsType | Number | Y | 1 | 商品类型 1: 实物商品（物流发货） 2 : 虚拟商品（无需物流） |
| description | String | Y | 全网销量TOP100 | 商品描述 |
| tags | String | N |  | 商品类目(接口版本v=2支持传参) |
| sjCode | String | N |  | 商品编码(接口版本v=2支持传参) |
| originPrice | Double | Y | | 原价 |
| price | Double | Y | | 价格 |
| costPrice | Double | Y | | 成本价 |
| quantity | Integer | N | | 商品数量（商品无SKU时，必填） |
| showStock | Number | Y | 1 | 是否显示库存 1:显示 0:不显示 |
| hasPublish | Number | Y | | 上下架 1：出售中（上架） 0：仓库中（下架） |
| imageLink | String | Y | | 主图连接(外网地址) |
| postfeeTplId | String | N | | 运费模板ID |
| postfeeType | String | Y | 01 | 运费类型 01：统一邮费 02： 运费模板 值为01 运费不能为空 值为02时 运费模板值 不能为空 |
| postfee | Double | Y | 8.8 | 运费 |
| groupIdList | `List<Long>` | N | 规则:   null: 不处理商品分组<br/>空数组:清空分组<br/>[1,2,3]:设置分组1，2，3 | 商品分组ID集合   (接口版本v2可传) |
| briefIntroduction | String | N |  | 商品简介(显示在c端商品列表,接口版本v2可传) |
| h5LinkUrl | String | N |  | 外部H5链接   仅支持HTTPS |
| wxAppLinkUrl | String | N |  | 外部小程序链接   仅支持HTTPS |
| detail | detail | Y | 富文本内容 | 商品详情内容 |
| skuDictList | `List<SkuDictDTO>` | Y | | 规格项列表 |
| skuList | `List<SkuDTO>` | Y | | SKU明细 |
| imgResources | `List<ResourceDTO>` | Y | | 商品图片 |

#### SkuDictDTO 规格项

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| skuName | String | Y | 颜色 | 规格名称(若有字母需小写) |
| skuSeq | Number | Y | 1 | 规格序号(从1开始，依次递增) |
| skuItemValues | `List<SkuDictValueDTO>` | Y |  | 规格值 |

#### SkuDictValueDTO 规格项值

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| seq | Integer | 1 | Y | 序号(从1开始，依次递增) |
| valueName | String | 男款黑色 | Y | 规格值(若有字母需小写) |

#### SkuDTO 商品SKU明细

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| skuUniqueName | String | Y | 黑色,XL | sku名称(若有字母需小写) |
| originPrice | Double | Y | | 原价 |
| price | Double | Y | | 价格 |
| costPrice | Double | Y | | 成本价 |
| quantity | Number | Y | | 数量 |
| sjCode | String | Y | | 商品自定义编码 |

#### ResourceDTO 商品图片

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| url | String | Y | | 资源地址(外网地址) |
| seq | Number | N | | 顺序 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| numIid | Number | N | 123123 |
| skuList | `List<SkuVO>` | Y | SKU明细 |

#### Sku规格明细

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| skuUniqueName | String | N | 黑色,XL | sku名称 |
| skuUniqueCode | String | N | | (JBZ)SKU唯一码 |
| ~~skuId~~ | ~~String~~ | ~~N~~ | ~~~~ | ~~(JBZ)SKU ID~~ |
| costPrice | Double | N | | 成本价 |
| quantity | Number | N | | 数量 |
| originPrice | Double | N | | 原价 |
| price | Double | N | | 价格 |

### 请求参数实例

```json
{
  "activeDisplay": 1,
  "categoryId": 1704,
  "detail": "<p><img src=\"https://xxxxxxx\" alt=\"\" width=\"800\" height=\"800\" /></p>",
  "externalNumberId": "123123321",
  "versionId": 1620992665286,
  "tile": "测试商品",
  "goodsType": 1,
  "hasPublish": 1,
  "imageLink": "https://img.niwotech.com/goods_img/20220427/wvLUmQhUjAxOxbNcbWeMIxdlddcHMOgk.jpg",
  "costPrice": 1.0,
  "price": 50.0,
  "originPrice": 2.0,
  "description": "123123121111",
  "tags": 1614,
  "postFee": 0.0,
  "postfeeType": "01",
  "showStock": 1,
  "imgResources": [
    {
      "seq": 1,
      "url": "https://img.niwotech.com/goods_img/20220427/wvLUmQhUjAxOxbNcbWeMIxdlddcHMOgk.jpg"
    }
  ],
  "skuDictList": [
    {
      "skuItemValues": [
        {
          "seq": 1,
          "valueName": "男款黑色"
        },
        {
          "seq": 2,
          "valueName": "男款白色"
        },
        {
          "seq": 3,
          "valueName": "男款藏青"
        },
        {
          "seq": 4,
          "valueName": "男款浅蓝"
        },
        {
          "seq": 5,
          "valueName": "女款黑色"
        },
        {
          "seq": 6,
          "valueName": "女款白色"
        },
        {
          "seq": 7,
          "valueName": "女款粉色"
        }
      ],
      "skuName": "颜色1",
      "skuSeq": 1
    },
    {
      "skuItemValues": [
        {
          "seq": 1,
          "valueName": "男款黑色"
        },
        {
          "seq": 2,
          "valueName": "男款白色"
        },
        {
          "seq": 3,
          "valueName": "男款藏青"
        },
        {
          "seq": 4,
          "valueName": "男款浅蓝"
        },
        {
          "seq": 5,
          "valueName": "女款黑色"
        },
        {
          "seq": 6,
          "valueName": "女款白色"
        },
        {
          "seq": 7,
          "valueName": "女款粉色"
        }
      ],
      "skuName": "颜色2",
      "skuSeq": 2
    },
    {
      "skuItemValues": [
        {
          "seq": 1,
          "valueName": "S"
        },
        {
          "seq": 2,
          "valueName": "M"
        },
        {
          "seq": 3,
          "valueName": "L"
        },
        {
          "seq": 4,
          "valueName": "XL"
        },
        {
          "seq": 5,
          "valueName": "XXL"
        },
        {
          "seq": 6,
          "valueName": "XXXL"
        }
      ],
      "skuName": "尺码",
      "skuSeq": 3
    }
  ],
  "skuList": [
    {
      "price": 1.0,
      "costPrice": 1.0,
      "originPrice": 3.0,
      "quantity": 1,
      "sjCode": "A123456",
      "skuUniqueName": "男款黑色,男款黑色,S"
    }
  ]
}
```

### 成功响应

```json
{
  "response": {
    "msg": "成功",
    "result": {
      "skuList": [
        {
          "skuId": 36262081,
          "skuUniqueCode": "1440014401-1440014401-200208",
          "costPrice": 1,
          "quantity": 1,
          "skuUniqueName": "男款黑色,男款黑色,S"
        }
      ],
      "numIid": 310307
    },
    "code": "success"
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