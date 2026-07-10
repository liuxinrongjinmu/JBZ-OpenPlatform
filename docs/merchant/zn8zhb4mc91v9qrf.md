# 4.2.根据商品ID集合查询商品

---

**接口说明**：根据商品ID集合查询商品信息

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/goods/batchQuery?access_token=[access_token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |

**Body：商品id集合**

```
[207650,159375,208482,209678]
```

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| total_results | Number | Y | 搜索到的商品总条数 |
| items | StructurizationGoodsDetail | N | 商品明细 |

#### StructurizationGoodsDetail 商品明细

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| num_iid | Number | Y | （JBZ）商品ID |
| middle_id | Number | N | 中台id |
| supplier_id | Number | N | 供应商id |
| tags | String | Y | 商品类目 |
| tile | String | Y | 商品名称 |
| origin_price | Double | N | 原价 |
| price | Double | Y | 价格 |
| quantity | Number | Y | 数量 |
| has_publish | Number | Y | 上下架 1：出售中（上架） 0：仓库中（下架） |
| item_skus | StructurizationSKUDetail | N | SKU明细 |
| item_imgs | StructurizationItemImgsDetail | N | 商品图片 |
| sjCode | String | N | 商品自定义编码 |
| goods_url | String | Y | 商品购买地址 |
| tagsName | String | Y | 分组名称 |
| tagsIds | List&lt;Long&gt; | Y | 分组ID |
| goodsType | Number | Y | 商品类型<br/>(1,实物商品)<br/>(2,虚拟商品)<br/>(3,海淘商品)<br/>(4,跨境电商)<br/>(5,权益商品)<br/>(6,电子券商品) |
| couponsGoodsDetail | CouponsGoodsDetail | N | 电子卡券 |
| postfeeTplId | String | N | 运费模板ID (未上线) |
| postfeeType | String | Y | 运费类型 (未上线)<br/>01：统一邮费<br/>02：运费模板 |
| postfee | Double | Y | 8.8 (未上线) |

#### StructurizationSKUDetail 商品SKU

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| sku_id | Number | Y | sku_id |
| sku_unique_code | String | Y | sku唯一编码 |
| sku_unique_name | String | Y | sku名称 |
| origin_price | Double | N | 原价 |
| price | Double | Y | 价格 |
| quantity | Number | Y | 数量 |
| sjCode | String | N | 商品自定义编码 |

#### StructurizationImagesDetail 商品图片

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| imgid | Number | Y | 图片ID |
| img_url | String | Y | 图片地址 |
| seq | Number | N | 图片顺序 |

#### CouponsGoodsDetail 电子卡券信息

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| useQuantity | Number | Y | 可核销次数 |
| couponsType | Number | Y | 类型<br/>(1, "商品消费券")<br/>(2, "服务消费券") |
| couponsExpires | CouponsExpires | Y | 有效期 |
| useShopType | Number | Y | 服务门店<br/>(1, "购买门店")<br/>(2, "全部门店")<br/>(3, "指定门店") |
| useShopList | List&lt;Long&gt; | Y | 门店ID |
| useGoodsList | List&lt;Long&gt; | Y | 适用商品ID |

#### ShopCouponsExpiresDTO 子卡券有效期信息

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| useExpiresType | Number | Y | 有效期类型<br/>1:永久有效;<br/>2:固定时间;<br/>3:购买后 |
| useExpiresStartTime | LocalDateTime | Y | 开始时间 |
| useExpiresEndTime | LocalDateTime | Y | 结束时间 |
| useExpiresDay | Number | Y | 有效天数 |

### 请求说明

```http
POST https://api.c3tech.cn/oauthentry/goods/batchQuery?access_token=[token]

Body 参数
Content-Type: application/json

[207650,159375,208482,209678]
```

### JAVA 请求实例

```java
HttpHeaders headers = new HttpHeaders();
headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
List<Integer> numiids = new ArrayList<>();
numiids.add(207650);
numiids.add(159375);
Map<String, String> paramMap = new HashMap<>();
paramMap.put("access_token", "086d0404-60ba-4b59-bfd3-79a6ce73b2a9");
HttpEntity<String> requestEntity = new HttpEntity<String>(GsonUtil.toJson(numiids), headers);
String response = restTemplate().postForObject("http://api.jubaozan.cn/oauthentry/goods/batchQuery?access_token={access_token}", requestEntity, String.class, paramMap);
System.out.println(response);
```


### 正确响应示例

```json
{
  "response": {
    "total_results": 4,
    "items": [
      {
        "intime": "2020-08-17 11:25:06",
        "tags": "A001",
        "tile": "0817商品",
        "price": 100,
        "sjCode": "",
        "quantity": 100,
        "num_iid": 279019,
        "origin_price": 100,
        "has_publish": 1,
        "item_imgs": [
          {
            "seq": 1,
            "imgid": 402331,
            "img_url": "https://xs.c3tech.cn/FkdV7rFGxGY7t7UsVDEi7vLdChoH"
          }
        ],
        "item_skus": [],
        "goods_url": "https://h5.jubaozan.cn/mall/goodsInfo/279019?siteId=1617"
      }
    ]
  }
}
```


### 错误响应示例

```json
{
  "error_response": {
    "code": "100001",
    "msg": "参数校验错误"
  }
}
```
