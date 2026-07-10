# 4.5.商品同步（修改）

---

### 接口说明：商品同步（修改）接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/goods/external/update?<font style="color:#DF2A3F;">access_token=[token]&v=2</font>

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| v | String | Y | 2<font style="color:#DF2A3F;"></font> | 接口版本 |

#### GOODS 商品信息

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| numIid | Number | Y | 123123 | (JBZ)商品ID |
| externalNumberId | Long | Y | | 外部商品ID |
| versionId | Number | Y | 1620992665286 | 商品变更版本号 |
| tile | String | Y | 测试商品 | 商品名称 |
| goodsType | Number | Y | 1 | 商品类型 1: 实物商品（物流发货） 2 : 虚拟商品（无需物流） |
| description | String | Y | 全网销量TOP100 | 商品描述 |
| tags | String | Y | | 商品类目 |
| originPrice | Double | Y | | 原价 |
| price | Double | Y | | 价格 |
| costPrice | Double | Y | | 供货价 |
| showStock | Number | Y | 1 | 是否显示库存 1:显示 0:不显示 |
| hasPublish | Number | Y | | 上下架 1：出售中（上架） 0：仓库中（下架） |
| imageLink | String | Y | | 主图连接 |
| postfeeTplId | String | N | | 运费模板ID |
| postfeeType | String | Y | 01 | 运费类型 01：统一邮费 02： 运费模板 值为01 运费不能为空 值为02时 运费模板值 不能为空 |
| postfee | Double | Y | 8.8 | 运费 |
| detail | detail | Y | 富文本内容 | 商品详情内容 |
| h5LinkUrl | String | N |  | 外部H5链接<br/>仅支持HTTPS<br/>（未上线） |
| wxAppLinkUrl | String | N |  | 外部小程序链接<br/>仅支持HTTPS<br/>（未上线） |
| groupIdList | `List<Long>` | N | 规则:   null: 不处理商品分组<br/>空数组:清空分组<br/>[1,2,3]:设置分组1，2，3 | 商品分组ID集合   (接口版本v2可传) |
| briefIntroduction | String | N |  | 商品简介((显示在c端商品列表,接口版本v2可传)) |
| skuDictList | **`List<SkuDictDTO>`** | Y | | 规格列表 |
| skuList | **`List<SkuDTO>`** | Y | | SKU明细 |
| imgResources | **`List<ResourceDTO>`** | Y | | 商品图片 |

#### SkuDictDTO 规格项

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuName | String | Y | 颜色 | 规格名称(若有字母需小写) |
| skuSeq | Number | Y | 1 | 规格序号(从1开始，依次递增) |
| skuItemValues | `List<SkuDictValueDTO>` | Y | 1 | 规格值 |

#### SkuDictValueDTO 规格项值

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| seq | Integer | 1 | Y | 序号(从1开始，依次递增) |
| valueName | String | 男款黑色 | Y | 规格值(若有字母需小写) |

#### SkuDTO 商品SKU

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuUniqueName | String | Y | 黑色,XL | sku名称(若有字母需小写) |
| originPrice | Double | Y | | 原价 |
| price | Double | Y | | 价格 |
| costPrice | Double | Y | | 成本价 |
| quantity | Number | Y | | 数量；仅新增数据，此数量才有效；非新增数据数量将被忽略 |
| sjCode | String | Y | | 商品自定义编码 |
| dataState | Number | Y | 1 | 是否新增 1：新增；2：修改；3：删除 |

#### ResourceDTO 商品图片

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| url | String | Y | | 资源地址 |
| seq | Number | N | | 顺序 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| numIid | Number | N | 123123 |
| skuList | **`List<SkuVO>`** | Y | SKU明细 |

#### SkuVO 商品SKU

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuUniqueName | String | Y | 黑色,XL | sku名称 |
| skuUniqueCode | String | Y | | (JBZ)SKU唯一码 |
| ~~skuId~~ | ~~String~~ | ~~Y~~ | ~~~~ | ~~(JBZ)SKU ID~~ |

### 成功响应

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "numIid": 1,
      "skuList": [
        {
          "skuId": 36204301,
          "skuUniqueName": "白色,X码",
          "skuUniqueCode": "100101-200201"
        },
        {
          "skuId": 36204302,
          "skuUniqueCode": "100101-200202",
          "skuUniqueName": "白色,XL码"
        },
        {
          "skuId": 36204303,
          "skuUniqueCode": "100102-200201",
          "skuUniqueName": "黑色,X码"
        },
        {
          "skuId": 36204304,
          "skuUniqueCode": "100102-200202",
          "skuUniqueName": "黑色,XL码"
        }
      ]
    }
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