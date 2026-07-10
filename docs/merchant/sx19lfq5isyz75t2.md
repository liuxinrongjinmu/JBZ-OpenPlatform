# 7.15.直播状态变更消息

---

**接口说明**：直播状态变更

**消息类型**：LIVE_STATUS

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 直播状态变更参数说明
| body | | | | |
| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| liveId | Long | 1021 | Y | 直播id |
| sjid | Long | 9601 | Y | 商家id |
| liveStatus | Integer | 101 | Y | 直播状态 <br/>101:直播中<br/>102-新增直播间<br/>201-编辑直播间  <br/>103:直播结束 <br/>108 回放<br/>1001-已删除   |
| updateAt | LocalDateTime | 2025-07-30 | Y | 并更时间 |

### 公共请求示例

```json
{
  "client_id": "123",
  "sjid": 9538,
  "msg": "encodedMsg",
  "type": "LIVE_STATUS",
  "sign": "0aafa0697cfc6c75635955e7be42093a"
}
```

