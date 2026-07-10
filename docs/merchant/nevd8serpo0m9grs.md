# 11.11.门店分组查询

---

### 接口说明：查询门店分组列表

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/store/queryStoreGroup?access_token=[token]

### **<font style="color:rgb(38, 38, 38);">参数说明</font>**<font style="color:rgb(38, 38, 38);"></font>

| <font style="color:#000000;background-color:#FFFFFF;">参数</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">类型</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">必传(Y/N)</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">说明</font><font style="color:#000000;background-color:#FFFFFF;">   </font> |
| --- | --- | --- | --- |
| <font style="color:#000000;background-color:#FFFFFF;">access_token</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">String</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font><font style="color:#000000;background-color:#FFFFFF;">   </font> | <font style="color:#000000;background-color:#FFFFFF;">授权令牌</font><font style="color:#000000;background-color:#FFFFFF;">   </font> |
| <font style="color:#000000;background-color:#FFFFFF;">groupName</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">分组名称</font> |
| <font style="color:#000000;background-color:#FFFFFF;">groupId</font> | <font style="color:#000000;background-color:#FFFFFF;">Long</font> | <font style="color:#000000;background-color:#FFFFFF;">N</font> | <font style="color:#000000;background-color:#FFFFFF;">分组ID</font> |
| <font style="color:#000000;background-color:#FFFFFF;">pageNo</font> | <font style="color:#000000;background-color:#FFFFFF;">Integer</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">页码</font> |
| <font style="color:#000000;background-color:#FFFFFF;">pageSize</font> | <font style="color:#000000;background-color:#FFFFFF;">Integer</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">分页数</font> |

<font style="color:rgb(38, 38, 38);">  

</font>**<font style="color:rgb(38, 38, 38);">返回结果</font>**<font style="color:rgb(38, 38, 38);"></font>

| <font style="color:#000000;background-color:#FFFFFF;">`List<StoreGroupVO>`</font> | | | |
| :--- | --- | --- | --- |
| <font style="color:#000000;background-color:#FFFFFF;">参数</font> | <font style="color:#000000;background-color:#FFFFFF;">类型</font> | <font style="color:#000000;background-color:#FFFFFF;">必传(Y/N)</font> | <font style="color:#000000;background-color:#FFFFFF;">说明</font> |
| <font style="color:#000000;background-color:#FFFFFF;">groupId</font> | <font style="color:#000000;background-color:#FFFFFF;">Long</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">分组ID</font> |
| <font style="color:#000000;background-color:#FFFFFF;">groupName</font> | <font style="color:#000000;background-color:#FFFFFF;">String</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">分组名称</font> |
| <font style="color:#000000;background-color:#FFFFFF;">storeCount</font> | <font style="color:#000000;background-color:#FFFFFF;">Integer</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">关联门店数</font> |
| <font style="color:#000000;background-color:#FFFFFF;">createTime</font> | <font style="color:#000000;background-color:#FFFFFF;">LocalDateTime</font> | <font style="color:#000000;background-color:#FFFFFF;">Y</font> | <font style="color:#000000;background-color:#FFFFFF;">创建时间</font> |

### 正确响应示例

```json
{
  "response": [
    {
      "groupId": 79,
      "groupName": "门店分组筛选",
      "storeCount": 2,
      "createTime": "2025-12-04 16:23:22"
    }
  ],
  "traceId": "e07dec15287d285e"
}
```

### 错误响应示例

```json
{}
```