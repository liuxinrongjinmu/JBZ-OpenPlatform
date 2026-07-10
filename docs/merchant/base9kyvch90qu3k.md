# 10.1.内容栏目查询

---

**接口说明**：内容栏目查询

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/cms/material/site/column/all?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| name | String | N | 栏目一 | 栏目名称 |

**返回结果**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | List&lt;ColumnVO&gt; | Y | 栏目信息 | 栏目信息 |

### ColumnVO栏目信息
| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Long | Y | 1 | 栏目ID |
| columnName | String | Y | 栏目一 | 栏目名称 |
| labels | List&lt;LabelVO&gt; | Y | 标签信息 | 标签信息 |

### LabelVO标签信息
| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Long | Y | 1 | 标签ID |
| labelName | String | Y | 标签一 | 标签名称 |


### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "id": 9,
      "columnName": "推荐",
      "labels": [
        {
          "id": 16,
          "labelName": "商家买家秀"
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
    "code": 100001,
    "msg": "参数校验错误"
  }
}
```