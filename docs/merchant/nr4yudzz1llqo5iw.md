# 13.2.查询商品评价接口

---

| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| numIid | Number | Y | 商品id |
| orderNo | String | N | 订单号 |
| level | String | N | (2,"差"),<br/>(1,"非常差"); |
| contentType | Number | N | 评价类型【纯文本=0,包含音频=1 |
| startTime | LocalDateTime | Y | 评价开始时间 |
| endTime | LocalDateTime | Y | 评价结束时间 |
| pageNo | Number | Y | 分页号（最大不过500） |
| pageSize | Number | Y | 分页大小（最大不过100） |
info（如果不传分组ID和分组名称，返回所有分组）

### 返回结果
| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| totalResults | Number | Y | 总条数 |
| items | List&lt;GoodsEvaluation&gt; | Y | 商品评价信息 |
### GoodsGroup
| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| goodsName | String | Y | 总条数 |
| numIid | Number | Y | 商品分组信息 |
| picThumbPath | LocalDateTime | Y | 创建时间 |
| skuName | Number | Y | 在售商品数 |
| agentNick | Number | Y | 会员昵称 |
| agentId | Number | Y | 会员ID |
| agentNumber | String | Y | 会员编号 |
| orderNo | String | Y | 订单号 |
| reviewTime | LocalDateTime | Y | 评价时间 |
| reviewContent | ReviewContentVO | Y | 评价内容 |
| reviewReply | ReviewReplyDTO | Y | 回复内容 |
| level | String | Y | 评价等级 |
| praiseNumInit | Number | Y | 初始点赞量 |
| praiseNum | Number | Y | 真实点赞量 |
| auditFailRemark | String | Y | 备注 |
| displayStatus | Number | Y | 评价展示状态;不展示=0,展示=1 |
ReviewContentVO信息
| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| contentText | String | Y | 评价内容 |
| contentImg | List&lt;String&gt; | Y | 评价图片 |
| contentVideo | List&lt;String&gt; | Y | 评价视频 |
ReviewReplyDTO信息
| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| contentText | String | Y | 回复内容 |
| replyTime | LocalDateTime | Y | 回复时间 |