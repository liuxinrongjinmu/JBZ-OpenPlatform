# 7.13.直播时长消息

---

**接口说明**：直播用户观看时长：LIVE_USER_WATCH_TIME

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）###  播状态变更参数说明
| body | | | | |
| --- | --- | --- | --- | --- |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| sjid | Long | 1021 | Y | 商家ID |
| items | List&lt;LiveUserWatchDuration&gt; | 9601 | Y | 用户观看时长<br/>(集合最大数量：500) |
| LiveUserWatchDuration | | | | |
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| userId | Long | 1021 | Y | 用户ID |
| liveId | Long | 9601 | Y | 直播id |
| duration | Integer | 12 | Y | 时长（分） |
| reportAt | String | 2025-07-30 12:00:00 | Y | 上报时间 |
### 共请求示例

```json
{
  "client_id": "123",
  "sjid": 538,
  "msg": "encodedMsg",
  "type": "LIVE_USER_WATCH_TIME",
  "version": "1.0",
  "sign": "0aafa0697cfc6c75635955e7be42093a"
}
```### #