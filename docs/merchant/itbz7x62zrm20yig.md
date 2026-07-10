# 11.10.门店客户查询

---

### 接口说明：查询门店店员列表

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/queryStoreUser?access_token=[token]

### **<font style="color:rgb(38, 38, 38);">参数说明</font>**<font style="color:rgb(38, 38, 38);"></font>

| <font style="color:#000000;background-color:#FFFFFF;">参数</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">类型</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">必传(Y/N)</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">说明</font><font style="color:#000000;background-color:#FFFFFF;">   </font> |
| --- | --- | --- | --- |
| <font style="color:#000000;background-color:#FFFFFF;">access_token</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">String</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">授权令牌</font><font style="color:#000000;background-color:#FFFFFF;">   </font> |
| <font style="color:#000000;background-color:#FFFFFF;">nick</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">用户昵称</font> |
| <font style="color:#000000;background-color:#FFFFFF;">userNo</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">用户编号</font> |
| <font style="color:#000000;background-color:#FFFFFF;">mobile</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">用户手机号</font> |
| <font style="color:#000000;background-color:#FFFFFF;">regionCode</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">片区编码</font> |
| <font style="color:#000000;background-color:#FFFFFF;">storeId</font> | <font style="color:#000000;background-color:#FFFFFF;">Long</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">门店ID</font> |
| <font style="color:#000000;background-color:#FFFFFF;">pageNo</font> | <font style="color:#000000;background-color:#FFFFFF;">Integer</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">页码</font> |
| <font style="color:#000000;background-color:#FFFFFF;">pageSize</font> | <font style="color:#000000;background-color:#FFFFFF;">Integer</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">分页数</font> |

<font style="color:rgb(38, 38, 38);">  

</font>**<font style="color:rgb(38, 38, 38);">返回结果</font>**<font style="color:rgb(38, 38, 38);"></font>

| <font style="color:#000000;background-color:#FFFFFF;">`List<StoreUserVO>`</font> | | | |
| :--- | --- | --- | --- |
| <font style="color:#000000;background-color:#FFFFFF;">参数</font> | <font style="color:#000000;background-color:#FFFFFF;">类型</font> | <font style="color:#000000;background-color:#FFFFFF;">必传(Y/N)</font> | <font style="color:#000000;background-color:#FFFFFF;">说明</font> |
| <font style="color:#000000;background-color:#FFFFFF;">nick</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">用户昵称</font> |
| <font style="color:#000000;background-color:#FFFFFF;">userNo</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">用户编号</font> |
| <font style="color:#000000;background-color:#FFFFFF;">mobile</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">用户手机号</font> |
| <font style="color:#000000;background-color:#FFFFFF;">userId</font> | <font style="color:#000000;background-color:#FFFFFF;">Long</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">用户ID</font> |
| <font style="color:#000000;background-color:#FFFFFF;">fxId</font> | <font style="color:#000000;background-color:#FFFFFF;">Long</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">零售等级ID</font> |
| <font style="color:#000000;background-color:#FFFFFF;">fxName</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">零售等级</font> |
| <font style="color:#000000;background-color:#FFFFFF;">lastConsumeTime</font> | <font style="color:#000000;background-color:#FFFFFF;">LocalDateTime</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">上次消费时间</font> |
| <font style="color:#000000;background-color:#FFFFFF;">registerTime</font> | <font style="color:#000000;background-color:#FFFFFF;">LocalDateTime</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">注册时间</font> |
| <font style="color:#000000;background-color:#FFFFFF;">storeId</font> | <font style="color:#000000;background-color:#FFFFFF;">Long</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">所属门店ID</font> |
| <font style="color:#000000;background-color:#FFFFFF;">storeName</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">所属门店名称</font> |
| <font style="color:#000000;background-color:#FFFFFF;">bindClerkNick</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">绑定店员名称</font> |
| <font style="color:#000000;background-color:#FFFFFF;">bindClerkUserNo</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">绑定店员编号</font> |
| <font style="color:#000000;background-color:#FFFFFF;">bindTime</font> | <font style="color:#000000;background-color:#FFFFFF;">LocalDateTime</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">绑定时间</font> |

### 正确响应示例

```json
{
  "response": [
    {
      "nick": "代客下单冒烟,用户E,归属A店",
      "userNo": "YSA8691905",
      "userId": 350028215,
      "fxId": 4444,
      "fxName": "游客",
      "registerTime": "2025-11-24 17:15:42",
      "storeId": 101195078,
      "storeName": "代客下单冒烟-门店A",
      "bindClerkNick": "代客下单冒烟,店员D",
      "bindClerkUserNo": "YSA8691911",
      "bindTime": "2025-11-25 11:47:36"
    }
  ],
  "traceId": "b4236241e7ce340d"
}
```

### 错误响应示例

```json
{}
```