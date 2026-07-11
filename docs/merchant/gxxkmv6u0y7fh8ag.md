# 13.3.查询商品分组接口

---

### 参数说明

| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| tagsName | String | N | 分组名称 |
| tagsIds | List&lt;Long&gt; | N | 分组ID |
| pageNo | Number | N | 分页号 |
| pageSize | Number | N | 分页大小（不传默认10条） |

info（如果不传分组ID和分组名称，返回所有分组）

### 返回结果

| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| totalResults | Number | Y | 总条数 |
| items | List&lt;GoodsGroup&gt; | Y | 商品分组信息 |

### GoodsGroup基本信息

| 参数 | 类型 | 是否必传 | 说明 |
| --- | --- | --- | --- |
| tagsName | String | Y | 总条数 |
| tagsId | Number | Y | 商品分组信息 |
| intime | LocalDateTime | Y | 创建时间 |
| sellGoodsNum | Number | Y | 在售商品数 |
| allGoodsNum | Number | Y | 总商品数 |