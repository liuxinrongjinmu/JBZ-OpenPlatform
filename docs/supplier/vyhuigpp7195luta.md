# 仓库新增/编辑

---

**接口说明**：仓库编辑接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/goods/warehouse?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/goods/warehouse?access_token=%5Btoken%5D)

**参数说明**：

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| supplierId | Number | N | 123123 | (JBZ)供应商ID |
| id | Number | N | 123123 | (JBZ)仓库id，更新必传 |
| addressId | Number | N | | 地址id,更新时必传 |
| warehouseName | String | Y | | 仓库名称 |
| memo | String | N | | 备注 |
| warehouseType | Number | Y | | 仓库类型:仓库类型编号(1.自营仓库 2.海外仓  3.保税仓) |
| customsNumber | String | N | | 海关编号，仓库类型为2，3时必传 |
| receiverName | String | Y | | 收货人姓名 |
| receiverAddress | String | Y | | 售后详细地址 |
| activistPhone | String | Y | | 客服维权电话 |
| mobile | String | Y | | 收货人联系电话 |
| provinceCode | String | Y | | 省编码 |
| province | String | Y | | 省名称 |
| cityCode | String | Y | | 市编码 |
| city | String | Y | | 市名称 |
| districtCode | String | Y | | 县/区编码 |
| district | String | Y | | 县/区名称 |

**返回数据**：

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| id | 否 | integer | | 主键 |
| supplierId | 否 | integer | | 供货商id |
| warehouseName | 否 | string | | 仓库名称 |
| warehouseType | 否 | integer | | 仓库类型编号(1.自营仓库 2.海外仓  3.保税仓) |
| memo | 否 | string | | 备注 |
| createDate | 否 | string | | 创建日期 |
| updateDate | 否 | string | | 修改日期 |
| customsNumber | 否 | string | | 海关编号 |
| overseasSupplierId | 否 | string | | 海外供货商id |
| addressId | 否 | integer | | 主键ID |
| receiverName | 否 | string | | 收货人 |
| mobile | 否 | string | | 联系电话 |
| provinceCode | 否 | string | | 省编码 |
| cityCode | 否 | string | | 市编码 |
| districtCode | 否 | string | | 县/区编码 |
| receiverAddress | 否 | string | | 地址 |
| activistPhone | 否 | string | | 维权电话 |
| createTime | 否 | string | | 创建时间 |
| updateTime | 否 | string | | 更新时间 |
| province | 否 | string | | |
| city | 否 | string | | |
| district | 否 | string | | |

**入参示例**：

```json
{
  "id": 37,
  "addressId": 35,
  "supplierId": 1,
  "warehouseName": "仓库名称",
  "warehouseType": 1,
  "memo": "备注",
  "receiverName": "退货（收货人）",
  "mobile": "111-1321110001",
  "provinceCode": "110000",
  "cityCode": "110100",
  "districtCode": "110101",
  "receiverAddress": "具体地址",
  "activistPhone": "40011111",
  "province": "北京市",
  "city": "北京市",
  "district": "东城区"
}
```

**成功响应**：

```json
{
  "response": {
    "id": 37,
    "supplierId": 1,
    "warehouseName": "仓库名222称",
    "warehouseType": 1,
    "memo": "备注",
    "addressId": 35,
    "receiverName": "退货（收货人）",
    "mobile": "111-1321110001",
    "provinceCode": "110000",
    "cityCode": "110100",
    "districtCode": "110101",
    "receiverAddress": "具体地址",
    "activistPhone": "40011111",
    "province": "北京市",
    "city": "北京市",
    "district": "东城区"
  }
}
```

**错误响应示例**：

```json
{
  "response": {
    "code": "701",
    "msg": "此仓库名称已存在"
  }
}
```

