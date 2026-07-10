# 新增内容

---

**接口说明**：新增内容接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/cms/material/create?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/cms/material/create?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| tenantId | Number | N | 1003 | (JBZ)供应商ID |
| title | String | N | 测试标题 | 标题 |
| articleAbstract | String | N | 测试摘要 | 内容摘要 |
| coverImg | String | N | | 封面图链接 |
| materialContent | Arrays | Y | | 笔记内容，JSON数组形式，内容含多种格式，按顺序显示。   **content--richtext 富文本格式   **content--imagead 图文广告格式   **content--imagead--pics 图文广告格式图片内容** |

**content--richtext 富文本格式**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | richtext | 格式类型，富文本类型固定值传richtext |
| content | String | Y | %3Cp%3E%E6%96%B0%E5%A2%9E%3C%2Fp%3E | 富文本内容,来源百度富文本格式 |
| fullscreen | Boolean | Y | true | 富文本是否全屏显示 |
| background | String | Y | #FFFFFF | 富文本背景颜色 |

**content--imagead 图文广告格式**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | imagead | 格式类型，图文广告类型固定值传imagead |
| showtype | Number | Y | 0 | 显示方式 0-折叠轮播 1-列表显示 |
| showsize | Number | Y | 0 | 显示大小 0-大图 1-小图 |
| fullscreen | Boolean | Y | true | 是否全屏显示 |
| showradius | Number | Y | 0 | 图片倒角 0-直角 1-圆角 |
| pics | Arrays | Y | | 图片内容数组，目前只支持十张，按顺序显示 |

**content--imagead--pics 图文广告格式图片内容**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | 标题 | 图片标题 |
| url | String | Y | www.baidu.com | 图片跳转url，小程序中跳转暂不支持 |
| pic | String | Y | [https://xs.c3tech.cn/1617/2022/material/image/98695328048558899220220616111958.jpg](https://xs.c3tech.cn/1617/2022/material/image/98695328048558899220220616111958.jpg) | 图片url |

**返回结果**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| tenantId | Number | Y | 1003 | (JBZ)供应商ID |
| title | String | N | 测试标题 | 标题 |
| articleAbstract | String | N | 测试摘要 | 内容摘要 |
| coverImg | String | N | | 封面图链接 |
| materialContent | Arrays | Y | | 笔记内容，JSON数组形式，内容含多种格式，按顺序显示 |

**content--richtext 富文本格式**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | richtext | 格式类型，富文本类型固定值传richtext |
| content | String | Y | %3Cp%3E%E6%96%B0%E5%A2%9E%3C%2Fp%3E | 富文本内容,来源百度富文本格式 |
| fullscreen | Boolean | Y | true | 富文本是否全屏显示 |
| background | String | Y | #FFFFFF | 富文本背景颜色 |

**content--imagead 图文广告格式**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | imagead | 格式类型，图文广告类型固定值传imagead |
| showtype | Number | Y | 0 | 显示方式 0-折叠轮播 1-列表显示 |
| showsize | Number | Y | 0 | 显示大小 0-大图 1-小图 |
| fullscreen | Boolean | Y | true | 是否全屏显示 |
| showradius | Number | Y | 0 | 图片倒角 0-直角 1-圆角 |
| pics | Arrays | Y | | 图片内容数组，目前只支持十张，按顺序显示 |

**content--imagead--pics 图文广告格式图片内容**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| name | String | Y | 标题 | 图片标题 |
| url | String | Y | www.baidu.com | 图片跳转url，小程序中跳转暂不支持 |
| pic | String | Y | [https://xs.c3tech.cn/1617/2022/material/image/98695328048558899220220616111958.jpg](https://xs.c3tech.cn/1617/2022/material/image/98695328048558899220220616111958.jpg) | 图片url |

**成功响应**：

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "id": 330,
      "externalId": 1003,
      "title": "测试标题",
      "articleAbstract": "测试摘要",
      "coverImg": "https://xs.c3tech.cn/1617/material/2022/97578445102173388820220516153902.jpg?width=1920&height=1080",
      "content": [
        {
          "draggable": false,
          "name": "sharertitle",
          "config": true,
          "_scene": "talent"
        },
        {
          "draggable": true,
          "name": "richtext",
          "content": "%3Cp%3E%E6%96%B0%E5%A2%9E%3Cbr%2F%3E%3C%2Fp%3E",
          "fullscreen": false,
          "background": "#FFFFFF",
          "_scene": "talent"
        },
        {
          "draggable": true,
          "name": "imagead",
          "showtype": 1,
          "showsize": 0,
          "fullscreen": true,
          "showbtn": false,
          "showradius": 1,
          "pics": [
            {
              "name": "123",
              "url": "www.baidu.com",
              "urldesc": "",
              "linkType": "customLink",
              "linkValue": "www.baidu.com",
              "pic": "https://xs.c3tech.cn/1617/2022/material/image/98695328048558899220220616111958.jpg?height=800?width=800",
              "imgNeed": true,
              "linkRadio": "跳转页面"
            }
          ]
        }
      ]
    }
  }
}
```

**错误响应示例**：

```json
{
  "error_response": {
    "msg": "错误信息",
    "code": 123005
  }
}
```

