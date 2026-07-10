# 10.5.内容详情查询

---

**接口说明**：查询内容详情

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/cms/material/queryInfo?access_token=[token]

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| id | Long | Y |  |  |
| 内容ID |  |  |  |  |
**返回结果**：
| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Long | Y |  |  |
| 内容id |  |  |  |  |
| title | String | Y |  |  |
| 内容标题 |  |  |  |  |
| columnId | Long | Y |  |  |
| 栏目ID |  |  |  |  |
| labelId | Long | Y |  |  |
| 标签ID |  |  |  |  |
| labelName | String | Y |  |  |
| 标签名称 |  |  |  |  |
| contentType | Integer | Y |  |  |
| 类型;<br/>1->图文<br/>2->视频 |  |  |  |  |
| status | Integer | Y |  |  |
| 状态;<br/>0->不显示<br/>1->显示 |  |  |  |  |
| releaseStatus | Integer | Y |  |  |
| 发布状态;<br/>0->未发布<br/>1->已发布 |  |  |  |  |
| template | String | Y |  |  |
| 内容 |  |  |  |  |
| conver | String | N |  |  |
| 封面 |  |  |  |  |
| nickName | String | Y |  |  |
| 创作者名称 |  |  |  |  |
| articleAbstract | String | Y |  |  |
| 文章摘要 |  |  |  |  |
| releaseDate | Date | N |  |  |
| 发布时间 |  |  |  |  |
| status | Integer | Y |  |  |
| 显示状态;<br/>0->不显示<br/>1->显示 |  |  |  |  |
| upStatus | Integer | Y |  |  |
| 置顶状态;<br/>0->不置顶<br/>1->置顶 |  |  |  |  |
| linkUrl | String | N |  |  |
| 链接 |  |  |  |  |
| numIidList | List&lt;Long&gt; | N |  |  |
| 商品Id集合 |  |  |  |  |
| tags | List&lt;MaterialTag&gt; | N |  |  |
| 内容子标签 |  |  |  |  |
| createAt | Date | Y | 2022-02-01 00:00:00 | 创建时间 |
### aterialTag
| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| tagId | Long | Y |  |  |
| 内容id |  |  |  |  |
| name | String | Y |  |  |
| 标签名称 |  |  |  |  |
| desc | Long | Y |  |  |
| 标签描述 |  |  |  |  |
### 功响应示例

```json
{}
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