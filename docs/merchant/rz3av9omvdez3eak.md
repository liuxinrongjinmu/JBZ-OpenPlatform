# 7.19.直播用户行为数据

---

### 功能说明
当直播间产生用户互动行为（观看、聊天、点赞、签到、中奖、下单等）时，开放平台将用户行为数据推送给已授权该消息类型的第三方商家。

> 注意：此消息为推送消息，第三方需先订阅 **直播用户行为数据** 消息类型，开放平台通过回调方式将数据推送到第三方配置的回调地址。该消息仅直播结束30分钟后进行推送
>

---

### 推送方式
| 项目 | 说明 |
| --- | --- |
| **消息类型** | LIVE_USER_BEHAVIOR_DATA_SYNC |
| **推送方式** | HTTP POST |
| **Content-Type** | application/json |
| **字符编码** | UTF-8 |
| **推送方** | 开放平台 |
| **接收方** | 第三方商家配置的回调地址 |
| **签名方式** | 消息体经过 URL编码 后推送，第三方需先 URL解码 |


---

### 推送数据结构
| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `sjid` | Long | 商家ID |
| `items` | List | 用户行为数据列表 |


### items（用户行为数据）
| 参数 | 类型 | 说明 |
| --- | --- | --- |
| `userNo` | String | 用户编号 |
| `nick` | String | 昵称 |
| `phone` | String | 手机号 |
| `userId` | Long | 用户ID |
| `liveId` | Long | 直播间ID |
| `storeName` | String | 归属门店 |
| `retailLevel` | String | 零售等级 |
| `memberLevel` | String | 会员等级 |
| `clerkOrderId` | String | 绑定店员编号 |
| `clerkNick` | String | 绑定店员昵称 |
| `referrerOrderId` | String | 推荐人编号 |
| `referrerNick` | String | 推荐人昵称 |
| `shareOrderId` | String | 邀请人编号 |
| `shareAgentNick` | String | 邀请人昵称 |
| `operatingSystem` | String | 操作系统 |
| `terminalType` | String | 终端类型 |
| `joinAt` | String | 首次进入时间 |
| `watchTime` | Long | 直播观看时长（分钟） |
| `commentCounts` | Integer | 聊天数量 |
| `thumbCounts` | Integer | 点赞数量 |
| `checkCounts` | Integer | 签到次数 |
| `winPrizeCount` | String | 中奖次数 |
| `redPacketCount` | String | 领取红包次数 |
| `pointsObtained` | String | 获得积分 |
| `balanceObtained` | String | 获得余额 |
| `wechatBalanceObtained` | String | 获得微信零钱 |
| `couponCount` | String | 获得优惠券（张） |
| `orderCount` | String | 成交订单（笔） |
| `orderAmount` | String | 成交金额（元） |


---

### 推送示例
```json
{
  "sjid": 10086,
  "items": [
    {
      "userNo": "U001",
      "nick": "张三",
      "phone": "138****8000",
      "userId": 9527,
      "liveId": 888,
      "storeName": "旗舰店",
      "retailLevel": "黄金",
      "memberLevel": "VIP2",
      "clerkOrderId": "C001",
      "clerkNick": "店员小王",
      "referrerOrderId": "R001",
      "referrerNick": "推荐人李四",
      "shareOrderId": "S001",
      "shareAgentNick": "邀请人王五",
      "operatingSystem": "iOS",
      "terminalType": "手机",
      "joinAt": "2026-06-24 10:00:00",
      "watchTime": 45,
      "commentCounts": 12,
      "thumbCounts": 88,
      "checkCounts": 3,
      "winPrizeCount": "2",
      "redPacketCount": "5",
      "pointsObtained": "300",
      "balanceObtained": "15.50",
      "wechatBalanceObtained": "8.00",
      "couponCount": "2",
      "orderCount": "1",
      "orderAmount": "299.00"
    }
  ]
}
```

---

