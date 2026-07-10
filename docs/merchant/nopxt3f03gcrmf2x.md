# 商品卡列表

---

### 接口说明：**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/live/goodsCardList?access_token=[token]

## 请求参数

| 名称 | 位置 | 类型 | 必传(Y/N） | 说明 |
| --- | --- | --- | --- | --- |
| liveRoomId | query | integer | Y | liveRoomId |
| access_token | query | String | Y | none |

# 返回数据结构

| 名称 | 类型 | 中文名 | 说明 |
| --- | --- | --- | --- |
| enabled | boolean | 是否启用该商品卡 |  |
| goodsDetailList | [[GoodsDetail](#schemagoodsdetail)] | 商品列表 |  |
| liveRoomId | Long | 系统直播间ID |  |
| name | String | 商品卡名称 |  |

## GoodsDetail

| 名称 | 类型 | 必传(Y/N） | 中文名 | 说明 |
| --- | --- | --- | --- | --- |
| image | String | N | 商品图片 |  |
| name | String | N | 商品名称 |  |
| numIid | Long | N | 商品ID |  |
| price | BigDecimal | N | 价格 |  |
| quantity | Integer | N | 商品剩余库存 |  |
| seq | Integer | N | 顺序 |  |

## 示例

```json
{
  "enabled": true,
  "goodsDetailList": [
    {
      "image": "String",
      "name": "String",
      "numIid": 0,
      "price": 0,
      "quantity": 0,
      "seq": 0
    }
  ],
  "liveRoomId": 0,
  "name": "String"
}
```