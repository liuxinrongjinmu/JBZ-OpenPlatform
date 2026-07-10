# 商品同步（修改）

---

**接口说明**：商品同步（修改）接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/goods/update?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/goods/update?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| supplierId | Number | N | 123123 | (JBZ)供应商ID |
| goodsId | Number | Y | 123123 | (JBZ)商品ID |
| externalGoodsId | String | Y | | 外部商品ID |
| activeDisplay | Number | N | 0 | 供货市场(是否展示) （0:不展示;1:展示） |
| versionId | Number | Y | 1620992665286 | 商品变更版本号 |
| goodsName | String | Y | 测试商品 | 商品名称【暂不支持特殊字符】 |
| goodsType | Number | N | 1 | 商品类型 1: 实物商品（物流发货） 2 : 虚拟商品（无需物流） |
| goodsCode | String | Y | 1 | 商品编码 |
| oneCategoryId | Number | Y | | 商品一级类目 |
| description | String | N | | 商品描述【暂不支持特殊字符】 |
| categoryId | Number | Y | | 商品类目 |
| maxProfit | Double | N | | 最大利润率 |
| minRetailPrice | Double | Y | | 最低建议零售价 |
| maxRetailPrice | Double | Y | | 最高建议零售价 |
| minCostPrice | Double | Y | | 最低供货价 |
| maxCostPrice | Double | Y | | 最高供货价 |
| hasPublish | Number | Y | | 上下架 1：出售中（上架） 0：仓库中（下架） |
| imageLink | String | Y | | 主图连接 |
| postfeeTplId | String | N | | 运费模板ID |
| postfeeType | String | Y | 01 | 运费类型 01：统一邮费 02： 运费模板 值为01 运费不能为空 值为02时 运费模板值 不能为空 |
| allowExchange | integer | N | | 换货标志 0：不允许  1：允许 |
| reissue | integer | N | | 是否允许补发 0：不允许  1：允许 |
| postfee | Double | Y | 8.8 | 运费 |
| detail | detail | Y | 富文本内容 | 商品详情内容【暂不支持特殊字符】 |
| skuDictList | **StructurizationSKUDict** | Y | | 规格列表 |
| skuList | **StructurizationSKUDetail** | Y | | SKU明细 |
| resources | **StructurizationImagesDetail ** | Y | | 商品图片 |
| warehouseId | Number | N | | 仓库ID |

**StructurizationSKUDict 规格列表**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuName | String | Y | 颜色 | 规格名称 |
| skuSeq | Number | Y | 1 | 规格序号(从1开始，依次递增) |

**StructurizationSKUDetail商品SKU**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| skuId | Number | N | 5461 | skuID,修改规格信息和删除规格时需要传入 |
| skuUniqueName | String | Y | 黑色,XL | skuID,修改规格信息和删除规格时需要传入 |
| retailPrice | Double | N | | 建议零售价 |
| marketPrice | Double | Y | | 市场价 |
| costPrice | Double | Y | | 供货价 |
| quantity | Number | Y | | 数量；仅新增数据，此数量才有效；非新增数据数量将被忽略 |
| dataState | Number | Y | 1 | 是否新增 1：新增；2：修改；3：删除 |
| skuCode | String | N | | sku编码 |

**StructurizationImagesDetail 商品图片**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| url | String | Y | | 资源地址 |
| seq | Number | N | | 顺序 |

**返回结果**

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| resources | 否 | object[] | | 商品资源信息列表(图片、视频链接) |
|   ├ id | 否 | integer | | |
|   ├ goodsId | 否 | integer | | 商品ID |
|   ├ supplierId | 否 | integer | | 供货商ID |
|   ├ url | 否 | string | | 资源地址 |
|   ├ type | 否 | string | | 资源类型,1:图片,2:视频,3:音频 |
|   ├ seq | 否 | integer | | 排列序号 |
|   └ duration | 否 | integer | | 视频时长,单位:秒 |
| goodsSkus | 否 | object[] | | 商品规格列表(包含库存) |
|   ├ skuId | 否 | integer | | SkuId |
|   ├ stockId | 否 | integer | | 库存ID,调用库存服务获取 |
|   ├ stockNum | 否 | integer | | 库存数量 |
|   ├ saleNum | 否 | integer | | 销量 |
|   ├ dataState | 否 | integer | | 是否新增 1：新增；2：修改；3：删除 |
|   ├ quantity | 否 | integer | | 数量 |
|   ├ colonel | 否 | number | | 团长价格 |
|   ├ seniorColonel | 否 | number | | 高级团长价格 |
|   ├ diamondColonel | 否 | number | | 钻石团长价格 |
|   ├ id | 否 | integer | | SKUID |
|   ├ goodsId | 否 | integer | | 商品ID |
|   ├ supplierId | 否 | integer | | 供货商ID |
|   ├ skuCode | 否 | string | | 编码 |
|   ├ skuUniqueCode | 否 | string | | 笛卡尔乘积  按照商品规格项目编码顺序组合而成  例如01001-02001 |
|   ├ skuUniqueName | 否 | string | | 笛卡尔乘积  按照商品规格项目名称顺序组合而成  例如红色,40码 |
|   ├ retailPrice | 否 | number | | 零售价 |
|   ├ costPrice | 否 | number | | 供货价 |
|   ├ marketPrice | 否 | number | | 市场价/划线价 |
|   ├ goodsCode | 否 | string | | 商家编码 |
|   ├ minProfit | 否 | number | | 最小利润 |
|   ├ maxProfit | 否 | number | | 最大利润 |
|   ├ deleted | 否 | boolean | | 逻辑删除 |
|   ├ createTime | 否 | string | | 添加日期 |
|   └ updateTime | 否 | string | | 修改日期 |
| skus | 否 | object | | 商品规格列表(包含库存) |
|   └ KEY | 否 | object | | |
|     ├ skuId | 否 | integer | | SkuId |
|     ├ stockId | 否 | integer | | 库存ID,调用库存服务获取 |
|     ├ stockNum | 否 | integer | | 库存数量 |
|     ├ saleNum | 否 | integer | | 销量 |
|     ├ dataState | 否 | integer | | 是否新增 1：新增；2：修改；3：删除 |
|     ├ quantity | 否 | integer | | 数量 |
|     ├ colonel | 否 | number | | 团长价格 |
|     ├ seniorColonel | 否 | number | | 高级团长价格 |
|     ├ diamondColonel | 否 | number | | 钻石团长价格 |
|     ├ id | 否 | integer | | SKUID |
|     ├ goodsId | 否 | integer | | 商品ID |
|     ├ supplierId | 否 | integer | | 供货商ID |
|     ├ skuCode | 否 | string | | 编码 |
|     ├ skuUniqueCode | 否 | string | | 笛卡尔乘积  按照商品规格项目编码顺序组合而成  例如01001-02001 |
|     ├ skuUniqueName | 否 | string | | 笛卡尔乘积  按照商品规格项目名称顺序组合而成  例如红色,40码 |
|     ├ retailPrice | 否 | number | | 零售价 |
|     ├ costPrice | 否 | number | | 供货价 |
|     ├ marketPrice | 否 | number | | 市场价/划线价 |
|     ├ goodsCode | 否 | string | | 商家编码 |
|     ├ minProfit | 否 | number | | 最小利润 |
|     ├ maxProfit | 否 | number | | 最大利润 |
|     ├ deleted | 否 | boolean | | 逻辑删除 |
|     ├ createTime | 否 | string | | 添加日期 |
|     └ updateTime | 否 | string | | 修改日期 |
| goodsSkuItems | 否 | object[] | | 商品规格项列表 |
|   ├ skuName | 否 | string | | 规格名称 |
|   ├ skuSeq | 否 | integer | | 序号 |
|   ├ skuItemValues | 否 | object[] | | 规格子集列表 |
|     ├ valueId | 否 | integer | | |
|     ├ itemId | 否 | integer | | 商品规格项ID |
|     ├ supplierId | 否 | integer | | 供货商ID |
|     ├ goodsId | 否 | integer | | 商品ID |
|     ├ valueName | 否 | string | | 规格项值名称 |
|     ├ valueCode | 否 | string | | 规格项值编码 |
|     ├ seq | 否 | integer | | 序号 |
|     ├ imgUrl | 否 | string | | 图片链接 |
|     ├ deleted | 否 | boolean | | 逻辑删除 |
|     ├ createTime | 否 | string | | 添加日期 |
|     └ updateTime | 否 | string | | 修改日期 |
|   ├ itemId | 否 | integer | | |
|   ├ goodsId | 否 | integer | | 商品ID |
|   ├ supplierId | 否 | integer | | 供货商ID |
|   ├ itemName | 否 | string | | 规格项名称 |
|   ├ itemCode | 否 | string | | 规格项编码 |
|   ├ seq | 否 | integer | | 序号 |
|   ├ deleted | 否 | boolean | | 逻辑删除 |
|   ├ createTime | 否 | string | | 添加日期 |
|   └ updateTime | 否 | string | | 修改日期 |
| goodsId | 否 | integer | | (JBZ)商品ID |
| skuDictList | 否 | object[] | | 规格列表 |
|   ├ skuName | 否 | string | | 规格名称 |
|   ├ skuSeq | 否 | integer | | 序号 |
|   ├ skuItemValues | 否 | object[] | | 规格子集列表 |
|     ├ valueId | 否 | integer | | |
|     ├ itemId | 否 | integer | | 商品规格项ID |
|     ├ supplierId | 否 | integer | | 供货商ID |
|     ├ goodsId | 否 | integer | | 商品ID |
|     ├ valueName | 否 | string | | 规格项值名称 |
|     ├ valueCode | 否 | string | | 规格项值编码 |
|     ├ seq | 否 | integer | | 序号 |
|     ├ imgUrl | 否 | string | | 图片链接 |
|     ├ deleted | 否 | boolean | | 逻辑删除 |
|     ├ createTime | 否 | string | | 添加日期 |
|     └ updateTime | 否 | string | | 修改日期 |
|   ├ itemId | 否 | integer | | |
|   ├ goodsId | 否 | integer | | 商品ID |
|   ├ supplierId | 否 | integer | | 供货商ID |
|   ├ itemName | 否 | string | | 规格项名称 |
|   ├ itemCode | 否 | string | | 规格项编码 |
|   ├ seq | 否 | integer | | 序号 |
|   ├ deleted | 否 | boolean | | 逻辑删除 |
|   ├ createTime | 否 | string | | 添加日期 |
|   └ updateTime | 否 | string | | 修改日期 |
| skuList | 否 | object[] | | SKU明细 |
|   ├ skuId | 否 | integer | | SkuId |
|   ├ stockId | 否 | integer | | 库存ID,调用库存服务获取 |
|   ├ stockNum | 否 | integer | | 库存数量 |
|   ├ saleNum | 否 | integer | | 销量 |
|   ├ dataState | 否 | integer | | 是否新增 1：新增；2：修改；3：删除 |
|   ├ quantity | 否 | integer | | 数量 |
|   ├ colonel | 否 | number | | 团长价格 |
|   ├ seniorColonel | 否 | number | | 高级团长价格 |
|   ├ diamondColonel | 否 | number | | 钻石团长价格 |
|   ├ id | 否 | integer | | SKUID |
|   ├ goodsId | 否 | integer | | 商品ID |
|   ├ supplierId | 否 | integer | | 供货商ID |
|   ├ skuCode | 否 | string | | 编码 |
|   ├ skuUniqueCode | 否 | string | | 笛卡尔乘积  按照商品规格项目编码顺序组合而成  例如01001-02001 |
|   ├ skuUniqueName | 否 | string | | 笛卡尔乘积  按照商品规格项目名称顺序组合而成  例如红色,40码 |
|   ├ retailPrice | 否 | number | | 零售价 |
|   ├ costPrice | 否 | number | | 供货价 |
|   ├ marketPrice | 否 | number | | 市场价/划线价 |
|   ├ goodsCode | 否 | string | | 商家编码 |
|   ├ minProfit | 否 | number | | 最小利润 |
|   ├ maxProfit | 否 | number | | 最大利润 |
|   ├ deleted | 否 | boolean | | 逻辑删除 |
|   ├ createTime | 否 | string | | 添加日期 |
|   └ updateTime | 否 | string | | 修改日期 |
| activeDisplay | 否 | integer | | 供市场(可展示) （0:不展示;1:展示） |
| showSaleNum | 否 | integer | | 用户端显示销量 |
| imageLink | 否 | string | | 主图连接 |
| merchantNum | 否 | integer | | 分销商数量 |
| minProfit | 否 | number | | 最低利润率 |
| existed | 否 | boolean | | 是否已经存在 |
| stockId | 否 | integer | | 库存ID,调用库存服务获取 |
| totalStockNum | 否 | integer | | 商品总库存 |
| categoryName | 否 | string | | 分类显示名称 |
| oneCategoryName | 否 | string | | 一级类目名称 |
| minRetailPrice | 否 | number | | 最低零售价 |
| maxRetailPrice | 否 | number | | 最高零售价 |
| stockNum | 否 | integer | | 库存数量 |
| saleNum | 否 | integer | | 实际销量 |
| goodsAudit | 否 | object | | 商品审核记录 |
|   ├ id | 否 | integer | | 自增ID |
|   ├ supplierId | 否 | integer | | 供货商ID |
|   ├ goodsId | 否 | integer | | 商品ID |
|   ├ auditStatus | 否 | integer | | 审核状态 0.审核不通过,2.审核通过 3.待审核 |
|   ├ goodsName | 否 | string | | 商品名称 |
|   ├ auditTime | 否 | string | | 审核时间 |
|   ├ rejectedReason | 否 | string | | 驳回理由 |
|   ├ auditor | 否 | string | | 审核人 |
|   ├ createAt | 否 | string | | 创建时间 |
|   └ updateAt | 否 | string | | 更新时间 |
| onsaleAuditing | 否 | boolean | | 在售商品是否提交编辑申请，且正在审核中：true-是、false-否 |
| auditTime | 否 | string | | 审核时间 |
| detail | 否 | string | | 商品详情内容 |
| hasPublish | 否 | integer | | 上下架 1：出售中（上架） 0：仓库中（下架） |
| supplierLevel | 否 | integer | | 商品所属供应商等级 |
| supplierLevelName | 否 | string | | 商品所属供应商等级名称 |
| goodsIdcardCheck | 否 | object | | 跨境商品身份验证规则信息 |
|   ├ supplierId | 否 | integer | | 供货商ID |
|   ├ goodsId | 否 | integer | | 商品ID |
|   ├ checkConsistency | 否 | integer | | 身份信息一致性检测 0：未开启， 1：开启 |
|   ├ checkAge | 否 | integer | | 身份信息年龄检测 0：未开启， 1：开启 |
|   ├ minAge | 否 | integer | | 身份证年龄检测 最小年龄 |
|   ├ maxAge | 否 | integer | | 身份证年龄检测 最大年龄 |
|   └ checkIdCard | 否 | integer | | 实名认证检测 0：未开启， 1：开启 |
| onSale | 否 | integer | 0 | 开售状态,1:开售中，0：未开售 |
| allowExchange | 否 | integer | | 换货标志 0：不允许  1：允许 |
| reissue | 否 | integer | | 是否允许补发 0：不允许  1：允许 |
| id | 否 | integer | | |
| supplierId | 否 | integer | | 供货商ID |
| categoryId | 否 | integer | | 商品类目,关联商品类目表sc_category |
| oneCategoryId | 否 | integer | | 一级类目 |
| goodsType | 否 | integer | | 商品类型 1-供应商商品、2-个体平台自营商品 |
| goodsName | 否 | string | | 商品名称 |
| description | 否 | string | | 商品描述 |
| minCostPrice | 否 | number | | 最低供货价 |
| maxCostPrice | 否 | number | | 最高供货价 |
| showStock | 否 | integer | | 是否显示库存 1:显示 0:不显示,默认为0 |
| goodsCode | 否 | string | | 商家编码 |
| status | 否 | integer | | 上下架 1：上架 0：仓库中（下架） |
| postfeeType | 否 | string | | 运费类型  01：统一邮费  02： 运费模板   值为01 运费不能为空 值为02时  运费模板值 不能为空 |
| postFee | 否 | number | | 运费 |
| postfeeTplId | 否 | string | | 运费模板ID |
| liftNum | 否 | integer | | 起提数 |
| purchaseRight | 否 | integer | | 是否购买权限 0：不设置权限   1：设置权限   默认为0 暂时是不是可以考虑不做？ |
| discountSwitch | 否 | boolean | | 是否享受折扣 |
| linkUrl | 否 | string | | 链接地址 |
| referralLink | 否 | string | | 推文链接 |
| listingType | 否 | integer | | 开售类型 1：立即开售  2：定时开售  值为1时 开售时间为当前时间 值为1时 需手工设置时间 |
| listingTime | 否 | string | | 开售时间 |
| pageId | 否 | integer | | 详情页面ID |
| initSaleNum | 否 | integer | | 初始销量 |
| maxProfit | 否 | number | | 最大利润率 |
| upTime | 否 | string | | 上架时间 |
| created | 否 | integer | | 创建者 |
| intime | 否 | string | | 创建时间 |
| updated | 否 | integer | | 更新者 |
| updateTime | 否 | string | | 更新时间 |
| deleted | 否 | boolean | | 逻辑删除 |
| warehouseId | 否 | integer | | 仓库ID |
| warehouseSwitch | 否 | boolean | | 是否开启仓库开关 |
| warehouseType | 否 | integer | | 仓库类型 1.自营仓库 2.海外仓  3.保税仓 |
| auditStatus | 否 | integer | | 状态 0.审核不通过 1.审核中 2.审核通过 9.待提交 |
| template | 否 | string | | 商品详情 |
| retailPrice | 否 | number | | 零售价 |
| additional | 否 | string | | 扩展信息 |
| externalGoodsId | 否 | string | | 外部商品ID |
| weight | 否 | number | | 重量(单位kg) |

**成功响应**：

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "id": 2642,
      "supplierId": 0,
      "categoryId": 1658,
      "oneCategoryId": 1609,
      "description": "限量T恤",
      "goodsType": 1,
      "goodsName": "灌篮高手纯色定制款T恤001",
      "minCostPrice": 89,
      "maxCostPrice": 99,
      "goodsCode": "1003",
      "postfeeType": "01",
      "postFee": 8,
      "maxProfit": 22.47,
      "upTime": "2022-08-05 18:24:10",
      "updateTime": "2022-08-05 18:24:10",
      "template": "[{\"name\":\"pagetitle\",\"title\":\"商品详情\"},{\"content\":\"<div>详情</div>\",\"draggable\":true,\"fullscreen\":false,\"name\":\"richtext\"}]",
      "externalGoodsId": "1001",
      "activeDisplay": 1,
      "resources": [
        {
          "id": 9295,
          "goodsId": 2642,
          "supplierId": 0,
          "url": "https://xs.c3tech.cn/open220805/www.baidu.com",
          "type": "1",
          "seq": 1
        },
        {
          "id": 9296,
          "goodsId": 2642,
          "supplierId": 0,
          "url": "https://xs.c3tech.cn/open220805/www.baidu.com",
          "type": "1",
          "seq": 2
        }
      ],
      "goodsSkus": [
        {
          "id": 21237,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "101-201",
          "skuUniqueName": "红色,M",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21237,
          "dataState": 2,
          "quantity": 100
        },
        {
          "id": 21238,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "101-202",
          "skuUniqueName": "红色,L",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21238,
          "dataState": 2,
          "quantity": 100
        },
        {
          "id": 21239,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "102-201",
          "skuUniqueName": "白色,M",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21239,
          "dataState": 2,
          "quantity": 100
        },
        {
          "id": 21240,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "102-202",
          "skuUniqueName": "白色,L",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21240,
          "dataState": 2,
          "quantity": 100
        }
      ],
      "goodsId": 2642,
      "skuDictList": [
        {
          "seq": 1,
          "skuName": "颜色",
          "skuSeq": 1,
          "skuItemValues": [
            {
              "valueName": "红色",
              "seq": 1,
              "imgUrl": "https://xs.c3tech.cn/open220805/www.baidu.com"
            },
            {
              "valueName": "白色",
              "seq": 2,
              "imgUrl": "https://xs.c3tech.cn/open220805/www.baidu.com"
            }
          ]
        },
        {
          "seq": 2,
          "skuName": "尺码",
          "skuSeq": 2,
          "skuItemValues": [
            {
              "valueName": "M",
              "seq": 1,
              "imgUrl": "https://xs.c3tech.cn/open220805/www.baidu.com"
            },
            {
              "valueName": "L",
              "seq": 2,
              "imgUrl": "https://xs.c3tech.cn/open220805/www.baidu.com"
            }
          ]
        }
      ],
      "skuList": [
        {
          "id": 21237,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "101-201",
          "skuUniqueName": "红色,M",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21237,
          "dataState": 2,
          "quantity": 100
        },
        {
          "id": 21238,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "101-202",
          "skuUniqueName": "红色,L",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21238,
          "dataState": 2,
          "quantity": 100
        },
        {
          "id": 21239,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "102-201",
          "skuUniqueName": "白色,M",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21239,
          "dataState": 2,
          "quantity": 100
        },
        {
          "id": 21240,
          "goodsId": 2642,
          "supplierId": 0,
          "skuCode": "1003",
          "skuUniqueCode": "102-202",
          "skuUniqueName": "白色,L",
          "retailPrice": 109,
          "costPrice": 89,
          "marketPrice": 139,
          "goodsCode": "1003",
          "minProfit": 22.47,
          "maxProfit": 22.47,
          "skuId": 21240,
          "dataState": 2,
          "quantity": 100
        }
      ],
      "imageLink": "https://xs.c3tech.cn/open220805/www.baidu.com",
      "minRetailPrice": 109,
      "maxRetailPrice": 139,
      "detail": "<div>详情</div>",
      "hasPublish": 0,
      "onSale": 0
    }
  }
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "msg": "失败",
    "code": 123005
  }
}
```

