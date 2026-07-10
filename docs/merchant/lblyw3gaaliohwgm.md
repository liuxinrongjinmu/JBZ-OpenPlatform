# 10.4.内容列表查询接口

---

### 接口说明：分页查询内容列表

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/cms/material/queryPage?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| title | String | N |  | 内容标题 |
| ids | `List<Long>` | N |  | 内容ID集合 |
| columnId | Long | N |  | 栏目ID |
| lableId | Long | N |  | 标签ID |
| startTime | Date | N | 2022-01-01 00:00:00 | 开始时间 |
| endTime | Date | N | 2022-02-01 00:00:00 | 结束时间 |
| status | Integer | N | 1 | 显示状态；   0: 不显示   1: 显示 |
| releaseStatus | Integer | N | 1 | 发布状态<br/>0:未发布<br/>1:已发布 |
| pageNo | Integer | Y | 1 | 页码 |
| pageSize | Integer | Y | 10 | 页数 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | `List<CmsMeterialVO>` | N |  | 内容列表 |

### CmsMeterialVO

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Long | Y |  | 内容id |
| title | String | Y |  | 内容标题 |
| columnId | Long | Y |  | 栏目ID |
| labelId | Long | Y |  | 标签ID |
| contentType | Integer | Y |  | 类型;<br/>1->图文<br/>2->视频 |
| status | Integer | Y |  | 状态;<br/>0->不显示<br/>1->显示 |
| releaseStatus | Integer | Y |  | 发布状态;<br/>0->未发布<br/>1->已发布 |
| createAt | Date | Y | 2022-02-01 00:00:00 | 创建时间 |

### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": [
      {
        "id": 5,
        "title": "1月14日石上文化\n",
        "columnId": 1,
        "labelId": 3,
        "labelName": "方便食品",
        "contentType": 1,
        "status": 1,
        "releaseStatus": 1,
        "createAt": "2023-01-10 14:23:22"
      },
      {
        "id": 4,
        "title": "闲墨】复古短款纯色羊毛大衣",
        "columnId": 1,
        "labelId": 3,
        "labelName": "方便食品",
        "contentType": 1,
        "status": 1,
        "releaseStatus": 1,
        "createAt": "2023-01-10 14:22:33"
      },
      {
        "id": 3,
        "title": "fellcoco小狗刺绣套装",
        "columnId": 1,
        "labelId": 1,
        "labelName": "推荐",
        "contentType": 1,
        "status": 1,
        "releaseStatus": 1,
        "createAt": "2023-01-10 14:19:49"
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