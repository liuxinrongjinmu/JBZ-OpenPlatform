# 10.2.内容保存

---

### 接口说明：内容保存

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/cms/material/site/save?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |

### 请求JSON入参

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Long | N | 1 | 内容ID 有值为修改 为空则新增 |
| columnId | Long | Y | 1 | 栏目ID |
| labelId | Long | N | 1 | 标签ID |
| nickname | String | Y | 星星点灯 | 发帖昵称 |
| title | String | Y | 内容一 | 内容标题(标题仅支持50字符以内) |
| articleAbstract | String | Y | 内容摘要 | 内容摘要(摘要仅支持1500字符以内) |
| coverImg | String | Y | www.image.png | 内容封面 |
| materialContent | JSONArray | Y | 内容详情 | 内容详情组件,目前支持富文本、图文广告、商品卡 |

### richtext富文本组件

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | richtext | 富文本组件标识,传值需为richtext |
| content | String | Y | %3Cp%3Easdasd%3Cbr%2F%3E%3C%2Fp%3E | 富文本内容(URL加密),来源百度富文本格式 |
| fullscreen | Boolean | N | true | 富文本是否全屏显示,默认全屏 |
| background | String | N | rgba(255, 69, 0, 1) | 富文本背景颜色RGB值,默认白色rgba(255, 255, 255, 1) |

### goodsCard商品卡组件

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | goodsCard | 富文本组件标识,传值需为goodsCard |
| goodsInfo | GoodsInfo | | | |

### goodsCard商品卡组件->GoodsInfo商品信息

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Long | Y | 1738304 | 商品ID-商品查询接口取 num_iid |
| name | String | Y | 商品一 | 商品名-商品查询接口取tile |
| pic | String | Y | www.image.png | 商品图片-商品查询接口取item_imgs第一张 |
| price | Bigdecimal | Y | 1.1 | 商品价格-商品查询接口取price |

### imagead图文广告组件

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | imagead | 富文本组件标识,传值需为imagead |
| showtype | Integer | Y | 1 | 显示方式 0-折叠轮播 1-列表显示 |
| showsize | Integer | Y | 1 | 显示大小 0-大图 1-小图 |
| fullscreen | Boolean | Y | true | 是否全屏显示 |
| showradius | Integer | Y | 1 | 图片倒角 0-直角 1-圆角 |
| pics | `List<PicContent>` | Y | `List<PicContent>` | 图片内容数组，目前只支持九张，按顺序显示 |

### imagead图文广告组件->PicContent图片数组

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | 图片标题 | 图片标题 |
| url | String | N | www.baidu.com | 图片跳转url，小程序中跳转暂不支持 |
| pic | String | Y | www.image.png | 图片url |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | 与入参相同 | Y | 与入参相同 | 与入参相同 |

### 入参示例

```json
{
  "id": null,
  "columnId": 61,
  "labelId": null,
  "title": "标题",
  "articleAbstract": "内容摘要",
  "coverImg": "https://image.jbzyun.cn/9599/2024/material/image/d643a66fd0df44d9b2c988a41c681fd3.png?height=502&width=892",
  "materialContent": [
    {
      "name": "richtext",
      "content": "%3Cp%3Easdasd%3Cbr%2F%3E%3C%2Fp%3E",
      "fullscreen": "true",
      "background": "rgba(255, 69, 0, 1)"
    },
    {
      "name": "goodsCard",
      "goodsInfo": {
        "id": 1738304,
        "name": "来源1数据",
        "pic": "https://xs.c3tech.cn/9599/2023/material/image/c4e2a2a688754b4eb1c0faf804ed9e43.jpg",
        "price": 68
      }
    },
    {
      "name": "imagead",
      "showtype": 1,
      "showsize": 0,
      "fullscreen": "true",
      "showradius": 0,
      "pics": [
        {
          "name": "图片标题",
          "url": "",
          "pic": "https://image.jbzyun.cn/9599/2024/material/image/d643a66fd0df44d9b2c988a41c681fd3.png?height=502?width=892"
        }
      ]
    }
  ]
}
```

### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "id": 2034,
      "tenantId": 9599,
      "columnId": 61,
      "title": "标题",
      "articleAbstract": "内容摘要",
      "coverImg": "https://image.jbzyun.cn/open240127/d643a66fd0df44d9b2c988a41c681fd3.png",
      "materialContent": [
        {
          "draggable": false,
          "name": "sharertitle",
          "config": true,
          "_scene": "talent"
        },
        {
          "_scene": "talent",
          "draggable": true,
          "fullscreen": true,
          "background": "rgba(255, 69, 0, 1)",
          "name": "richtext",
          "content": "%3Cp%3Easdasd%3Cbr%2F%3E%3C%2Fp%3E"
        },
        {
          "draggable": true,
          "showProgress": true,
          "name": "goodsCard",
          "showCountdown": true,
          "activityDescribe": "goodsCard",
          "shareMoney": false,
          "goodsInfo": {
            "price": 68,
            "name": "来源1数据",
            "id": 1738304,
            "pic": "https://xs.c3tech.cn/9599/2023/material/image/c4e2a2a688754b4eb1c0faf804ed9e43.jpg"
          }
        },
        {
          "draggable": true,
          "fullscreen": true,
          "showsize": 0,
          "showbtn": false,
          "name": "imagead",
          "showtype": 1,
          "pics": [
            {
              "linkValue": "",
              "urldesc": "",
              "imgNeed": true,
              "name": "图片标题",
              "linkType": "customLink",
              "pic": "https://image.jbzyun.cn/open240129/d643a66fd0df44d9b2c988a41c681fd3.png",
              "linkRadio": "跳转页面",
              "url": ""
            }
          ],
          "showradius": 0
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
    "code": "100001",
    "msg": "参数校验错误"
  }
}
```