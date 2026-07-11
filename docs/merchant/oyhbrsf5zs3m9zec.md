# 12.1.组织机构列表查询

---

### 接口说明：查询组织机构列表


**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/user/userGroup/queryList?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 授权令牌 |
| groupId | Number | N | 机构ID |
| groupName | String | N | 机构名称 |
| startTime | Date | N | 开始时间(创建时间)   "2024-12-20 00:00:00" |
| endTime | Date | N | 结束时间(创建时间)    "2024-12-21 00:00:00" |
| pageNo | Number | N | 分页号 |
| pageSize | Number | N | 分页大小（不传默认10条） |


### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| total | Number | Y | 搜索到的总条数 |
| records | **UserGroup[]** | N | 搜索到的组织机构列表 |


**UserGroup基本信息**

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| groupId | number |  | Y | 机构ID |
| groupName | string |  | Y  | 机构名称 |
| userNum | number |  | Y | 机构人数 |
| parentId | number |  | Y | 上级ID 0-最上级 |
| parentGroupName | string |  | Y | 上级机构名称 |
| groupDesc | string |  | Y | 机构描述 |
| createTime | string |  | Y | 机构创建时间 |


### 错误响应示例

```json
{}
```

