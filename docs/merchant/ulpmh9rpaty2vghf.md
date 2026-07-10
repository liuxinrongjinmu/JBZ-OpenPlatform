# 8.2.修改模板

---

### 接口说明：修改模板接口

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/express/postfee/template/update?access_token=[token]](https://api.c3tech.cn/oauthentry/express/postfee/template/update?access_token=%5Btoken%5D)

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| id | String | Y | 100 | 模板ID |
| name | String | Y | 测试模板 | 模板名称 |
| billingPlan | Number | Y |  | 计费方式编码(1,按件计费，2,按重量计费) |
| rules | **StructurizationRulesList** | Y |  | 规则列表 |

**StructurizationRulesList 规则列表**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Number | Y | 110 | 规则ID |
| templateId | Number | Y | 110 | 模板ID |
| firstPrice | Number | N | 1.5 | 首件计费 |
| firstQuantity | Number | N | 2 | 首件 |
| secondPrice | Number | N | 10 | 续件收费 |
| secondQuantity | Number | N |  | 续件 |
| deliveryType | Number | N |  | 配送类型（0特殊配送 1全部配送 2不可配送） |
| regions | **StructurizationRegionsList** | Y |  | 列表 |

**StructurizationRegionsList列表**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Number | Y | 111 | 区域ID |
| ruleId | Number | Y | 111 | 规则ID |
| province | **StructurizationAreaDto** | Y |  | （省）区域对象 |
| district | **StructurizationAreaDto** | Y |  | （市）区域对象 |
| city | **StructurizationAreaDto** | Y |  | （区）区域对象 |

**StructurizationAreaDto区域对象**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| code | String | N | 110000 | 区域编码 |
| name | String | N | 北京 | 区域名称 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| id | String | Y | 100 | 模板ID |
| name | String | Y | 测试模板 | 模板名称 |
| billingPlan | Number | Y |  | 计费方式编码(1,按件计费，2,按重量计费) |
| rules | **StructurizationRulesList** | N |  | 规则列表 |

**StructurizationRulesList 规则列表**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Number | N | 110 | 规则ID |
| templateId | Number | N | 110 | 模板ID |
| firstPrice | Number | N | 1.5 | 首件计费 |
| firstQuantity | Number | N | 2 | 首件 |
| secondPrice | Number | N | 10 | 续件收费 |
| secondQuantity | Number | N |  | 首件 |
| regions | **StructurizationRegionsList** | N |  | 列表 |

**StructurizationRegionsList列表**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| id | Number | Y | 111 | 区域ID |
| ruleId | Number | Y | 111 | 规则ID |
| province | **StructurizationAreaDto** | N |  | （省）区域对象 |
| city | **StructurizationAreaDto** | N |  | （市）区域对象 |
| district | **StructurizationAreaDto** | N |  | （区）区域对象 |

**StructurizationAreaDto区域对象**

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| code | String | N | 110000 | 区域编码 |
| name | String | N | 北京 | 区域名称 |

### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "id": 330,
      "name": "测试模板0602",
      "billingPlan": 2,
      "rules": [
        {
          "id": 493,
          "templateId": 330,
          "firstQuantity": 11,
          "firstPrice": 5.5,
          "secondQuantity": 11,
          "secondPrice": 1.2,
          "regions": [
            {
              "id": 67165,
              "ruleId": 493,
              "province": {
                "name": "北京市",
                "code": "110000"
              },
              "city": {
                "name": "北京市",
                "code": "110100"
              },
              "district": {
                "name": "丰台区",
                "code": "110106"
              }
            },
            {
              "id": 67166,
              "ruleId": 493,
              "province": {
                "name": "河北省",
                "code": "130000"
              },
              "city": {
                "name": "石家庄市",
                "code": "130100"
              },
              "district": {
                "name": "新华区",
                "code": "130105"
              }
            }
          ]
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
    "msg": "失败",
    "code": 123005
  }
}
```