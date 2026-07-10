# 10.4.修改优惠券模板

---

**接口说明**：修改优惠券模板

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/coupon/template/update?access_token=[token]

**参数说明**：

| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| id | Long |  | Y | 优惠券模板ID |
| name | string |  | Y | 优惠券名称 |
| num | number |  | Y | 优惠券总数 |
| status | Integer |  | Y | 优惠券模板状态:<br/>2:生效<br/>4:失效（失效后，用户无法再领取该优惠券，用户之前已领到的优惠券/码，在有效期内还能继续使用） |
| adaptType | number |  | N | 适应范围：<br/>1:示全部<br/>2:示指定商品可以<br/>3:示指定商品不可以 |
| numIidList | List&lt;Long&gt; |  | N | adaptType不为1时关联的商品 |
| openDrawSwitch | Integer |  | N | 公开领取开关;<br/>0-关闭，1-开启 |
| shareType | number |  | N | 分享类型:<br/>1:示所有类型<br/>2:示指定等级分享 |
| shareImage | String |  | N | 分享图片 |
| shareText | String |  | N | 分享文案 |
| transferText | String |  | N | 转增文案 |
| remark | String |  | N | 备注 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| result | boolean | Y | true | 修改成功 |

### 成功响应示例

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": true
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
