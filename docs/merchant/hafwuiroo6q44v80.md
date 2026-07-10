# 11.5.查询片区

---

### 接口说明：查询指定商家下的片区

**请求方式**：GET（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/getRegions?access_token=[token]&merchantId=[merchantId]

### **参数说明**  



| 参数    | 类型    | 必传(Y/N)    | 说明    |
| --- | --- | --- | --- |
| access_token    | String    | Y    | 授权令牌    |
| merchantId    | Number    | Y    | 商家id    |

  

**返回结果**  



| 参数    | 类型    | 必传(Y/N)    | 说明    |
| --- | --- | --- | --- |
| records    | `List<Region>`    | N    | 片区列表，请根据code，pcode 自行组织成树    |

Region

| 参数    | 类型    | 必传(Y/N)    | 说明    |
| --- | --- | --- | --- |
| sjid | Long | Y | 商家id |
| name    | **String**    | Y | 片区名称    |
| level    | **Integer**    | Y    | 片区层级 |
| status | **Integer** | Y | 状态 0正常 1冻结 |
| code | **String** | Y | 片区编码 |
| pcode | **String** | Y | 片区父级编码 |
| description | **String** | N | 描述 |

### 正确响应示例

```json
{
  "response": [
    {
      "id": 353,
      "sjid": 9538,
      "name": "总店",
      "description": "总店",
      "level": 1,
      "code": "10",
      "pcode": "0",
      "status": 0,
      "admin": 101273728,
      "created": "2021-11-23 11:15:17",
      "creator": "",
      "updator": "",
      "categoryId": 11,
      "updateTime": "2023-06-20 16:56:51"
    },
    {
      "id": 377,
      "sjid": 9538,
      "name": "湖南省",
      "description": "湖南省",
      "level": 2,
      "code": "101000",
      "pcode": "10",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:22:12",
      "creator": "",
      "updator": "",
      "categoryId": 12,
      "updateTime": "2023-06-20 16:56:52"
    },
    {
      "id": 378,
      "sjid": 9538,
      "name": "长沙市",
      "description": "长沙市",
      "level": 3,
      "code": "1010001000",
      "pcode": "101000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:22:22",
      "creator": "",
      "updator": "",
      "categoryId": 13,
      "updateTime": "2023-06-20 16:57:00"
    },
    {
      "id": 379,
      "sjid": 9538,
      "name": "岳阳市",
      "description": "岳阳市",
      "level": 3,
      "code": "1010001001",
      "pcode": "101000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:23:44",
      "creator": "",
      "updator": "",
      "categoryId": 14,
      "updateTime": "2023-06-20 16:57:01"
    },
    {
      "id": 380,
      "sjid": 9538,
      "name": "常德市",
      "description": "常德市",
      "level": 3,
      "code": "1010001002",
      "pcode": "101000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:24:00",
      "creator": "",
      "updator": "",
      "categoryId": 15,
      "updateTime": "2023-06-20 16:57:04"
    },
    {
      "id": 381,
      "sjid": 9538,
      "name": "云溪区",
      "description": "云溪区",
      "level": 4,
      "code": "10100010011000",
      "pcode": "1010001001",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:24:16",
      "creator": "",
      "updator": "",
      "categoryId": 11,
      "updateTime": "2023-06-20 16:57:31"
    },
    {
      "id": 382,
      "sjid": 9538,
      "name": "君山区",
      "description": "君山区",
      "level": 4,
      "code": "10100010011001",
      "pcode": "1010001001",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:24:25",
      "creator": "",
      "updator": "",
      "categoryId": 12,
      "updateTime": "2023-06-20 16:57:33"
    },
    {
      "id": 383,
      "sjid": 9538,
      "name": "岳麓区",
      "description": "岳麓区",
      "level": 4,
      "code": "10100010001000",
      "pcode": "1010001000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:24:49",
      "creator": "",
      "updator": "",
      "categoryId": 13,
      "updateTime": "2023-06-20 16:57:33"
    },
    {
      "id": 384,
      "sjid": 9538,
      "name": "天心区",
      "description": "天心区",
      "level": 4,
      "code": "10100010001001",
      "pcode": "1010001000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:24:57",
      "creator": "",
      "updator": "",
      "categoryId": 14,
      "updateTime": "2023-06-20 16:57:35"
    },
    {
      "id": 385,
      "sjid": 9538,
      "name": "芙蓉区",
      "description": "芙蓉区",
      "level": 4,
      "code": "10100010001002",
      "pcode": "1010001000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:25:05",
      "creator": "",
      "updator": "",
      "categoryId": 15,
      "updateTime": "2023-06-20 16:57:52"
    },
    {
      "id": 386,
      "sjid": 9538,
      "name": "武陵区",
      "description": "武陵区",
      "level": 4,
      "code": "10100010021000",
      "pcode": "1010001002",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:25:20",
      "creator": "",
      "updator": "",
      "categoryId": 11,
      "updateTime": "2023-06-20 16:57:38"
    },
    {
      "id": 387,
      "sjid": 9538,
      "name": "观沙岭街道",
      "description": "观沙岭街道",
      "level": 5,
      "code": "101000100010001000",
      "pcode": "10100010001000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:25:39",
      "creator": "",
      "updator": "",
      "categoryId": 12,
      "updateTime": "2023-06-20 16:57:39"
    },
    {
      "id": 388,
      "sjid": 9538,
      "name": "银盆岭街道",
      "description": "银盆岭街道",
      "level": 5,
      "code": "101000100010001001",
      "pcode": "10100010001000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:25:52",
      "creator": "",
      "updator": "",
      "categoryId": 13,
      "updateTime": "2023-06-20 16:57:39"
    },
    {
      "id": 389,
      "sjid": 9538,
      "name": "西湖街道",
      "description": "西湖街道",
      "level": 5,
      "code": "101000100010001002",
      "pcode": "10100010001000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:26:04",
      "creator": "",
      "updator": "",
      "categoryId": 14,
      "updateTime": "2023-06-20 16:57:41"
    },
    {
      "id": 390,
      "sjid": 9538,
      "name": "金盆岭街道",
      "description": "金盆岭街道",
      "level": 5,
      "code": "101000100010011000",
      "pcode": "10100010001001",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:26:22",
      "creator": "",
      "updator": "",
      "categoryId": 15,
      "updateTime": "2023-06-20 16:57:41"
    },
    {
      "id": 391,
      "sjid": 9538,
      "name": "桂花坪街道",
      "description": "桂花坪街道",
      "level": 5,
      "code": "101000100010011001",
      "pcode": "10100010001001",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:26:34",
      "creator": "",
      "updator": "",
      "categoryId": 11,
      "updateTime": "2023-06-20 16:57:42"
    },
    {
      "id": 393,
      "sjid": 9538,
      "name": "长岭街道",
      "description": "长岭街道",
      "level": 5,
      "code": "101000100110001000",
      "pcode": "10100010011000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:27:15",
      "creator": "",
      "updator": "",
      "categoryId": 12,
      "updateTime": "2023-06-20 16:57:43"
    },
    {
      "id": 396,
      "sjid": 9538,
      "name": "湖北省",
      "description": "湖北省",
      "level": 2,
      "code": "101001",
      "pcode": "10",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-28 14:01:05",
      "creator": "",
      "updator": "",
      "categoryId": 13,
      "updateTime": "2023-06-20 16:57:44"
    },
    {
      "id": 395,
      "sjid": 9538,
      "name": "启明街道",
      "description": "启明街道",
      "level": 5,
      "code": "101000100210001000",
      "pcode": "10100010021000",
      "status": 0,
      "admin": 101273728,
      "created": "2022-04-27 17:28:01",
      "creator": "",
      "updator": "",
      "categoryId": 14,
      "updateTime": "2023-06-20 16:57:46"
    }
  ],
  "traceId": "fbf3dabe7b13dbd7"
}
```

### 错误响应示例

```json
{}
```