# 9.5.积分明细查询V2

---

### 接口说明：查询会员积分变动明细

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/score/queryUserScoreDetailPage?access_token=[token]

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| agentId | Integer | Y | 1000123 | 会员id |
| pageNo | Integer | Y | 1 | 页码 |
| pageSize | Integer | Y | 20 | 页码大小 |
| startTime | String | Y | 2025-01-01 00:00:00 | 开始时间 |
| endTime | String | Y | 2025-03-01 00:00:00 | 结束时间<br/>(开始与结束时间不能超过3个月) |
| sourceList | `List<Integer>` | N |  | 积分变更来源 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| bizCode | Integer | Y | 10738224 | 记录id |
| agentId | Integer | Y | 14507885 | 会员id |
| source | Integer | Y | 28 | 来源  |
| sourceName | String | Y |  | 来源名称 |
| changeScore | double | Y | 10 | 变更积分<br/>（扣减为负数） |
| scoreBalance | double | Y |  | 积分余额 |
| updateAt | Date | Y | 2022-05-04 16:04:04 | 时间 |
| remark | String | N |  | 备注 |
| businessNo | String | N |  | 业务号 |

### 成功响应

```json
{
  "response": {
    "code": "success",
    "msg": "成功",
    "result": {
      "records": [
        {
          "bizCode": 17038224,
          "agentid": 14507885,
          "source": "29",
          "sourceName": "开放平台",
          "changeScore": -10,
          "scoreBalance": 100,
          "updateAt": "2022-05-04 16:04:04",
          "remark": "备注"
        }
      ],
      "total": 1,
      "size": 1,
      "current": 1,
      "orders": [],
      "searchCount": true,
      "pages": 1
    }
  }
}
```

### 来源字典

<font style="color:rgb(38, 44, 49);">(1,"积分消费"),</font>

<font style="color:rgb(38, 44, 49);">(2,"推广积分"),</font>

<font style="color:rgb(38, 44, 49);">(3,"首次扫码"),</font>

<font style="color:rgb(38, 44, 49);">(4,"购买商品积分"),</font>

<font style="color:rgb(38, 44, 49);">(5,"推广积分"),</font>

<font style="color:rgb(38, 44, 49);">(6,"商家奖励/扣除"),</font>

<font style="color:rgb(38, 44, 49);">(7,"取消关注"),</font>

<font style="color:rgb(38, 44, 49);">(8,"积分转换"),</font>

<font style="color:rgb(38, 44, 49);">(9,"全返积分转换"),</font>

<font style="color:rgb(38, 44, 49);">(10,"分享文章"),</font>

<font style="color:rgb(38, 44, 49);">(11,"抽奖获得积分"),</font>

<font style="color:rgb(38, 44, 49);">(12,"生日赠送积分"),</font>

<font style="color:rgb(38, 44, 49);">(13,"新建积分"),</font>

<font style="color:rgb(38, 44, 49);">(14,"产品赠送积分"),</font>

<font style="color:rgb(38, 44, 49);">(15,"积分初始化"),</font>

<font style="color:rgb(38, 44, 49);">(17,"完善资料"),</font>

<font style="color:rgb(38, 44, 49);">(18,"推广海报"),</font>

<font style="color:rgb(38, 44, 49);">(19,"推荐下载APP"),</font>

<font style="color:rgb(38, 44, 49);">(20,"社群海报分享"),</font>

<font style="color:rgb(38, 44, 49);">(21,"推荐用户完成公众号登录"),</font>

<font style="color:rgb(38, 44, 49);">(22,"公众号登录"),</font>

<font style="color:rgb(38, 44, 49);">(24,"拼团活动"),</font>

<font style="color:rgb(38, 44, 49);">(25,"内容发布"),</font>

<font style="color:rgb(38, 44, 49);">(26,"积分兑换余额"),</font>

<font style="color:rgb(38, 44, 49);">(27,"积分兑换余额退回"),</font>

<font style="color:rgb(38, 44, 49);">(28,"开放平台添加积分"),</font>

<font style="color:rgb(38, 44, 49);">(29,"开放平台扣减积分"),</font>

<font style="color:rgb(38, 44, 49);">(31,"活动中心赠送积分"),</font>

<font style="color:rgb(38, 44, 49);">(32,"购买有礼赠送积分"),</font>

<font style="color:rgb(38, 44, 49);">(33,"奖品中心积分回收"),</font>

<font style="color:rgb(38, 44, 49);">(34,"积分过期"),</font>

<font style="color:rgb(38, 44, 49);">(36,"兑换优惠券"),</font>

<font style="color:rgb(38, 44, 49);">(37,"积分过期"),</font>

<font style="color:rgb(38, 44, 49);">(40,"订单转换有礼"),</font>

<font style="color:rgb(38, 44, 49);">(41,"进店有礼"),</font>

<font style="color:rgb(38, 44, 49);">(42,"会员权益"),</font>

<font style="color:rgb(38, 44, 49);">(43,"积分抵现"),</font>

<font style="color:rgb(38, 44, 49);">(44,"购买有礼积分回收"),</font>

<font style="color:rgb(38, 44, 49);">(45,"邀请观看"),</font>

<font style="color:rgb(38, 44, 49);">(46,"预约直播"),</font>

<font style="color:rgb(38, 44, 49);">(47,"购买商品"),</font>

<font style="color:rgb(38, 44, 49);">(48,"直播间评论"),</font>

<font style="color:rgb(38, 44, 49);">(49,"直播间打赏"),</font>

<font style="color:rgb(38, 44, 49);">(50,"观看时长"),</font>

<font style="color:rgb(38, 44, 49);">(51,"加积分"),</font>

<font style="color:rgb(38, 44, 49);">(52,"邀请榜奖励"),</font>

<font style="color:rgb(38, 44, 49);">(53,"直播间签到"),</font>

<font style="color:rgb(38, 44, 49);">(54,"直播红包"),</font>

<font style="color:rgb(38, 44, 49);">(55,"直播观看奖励"),</font>

<font style="color:rgb(38, 44, 49);">(56,"直播抽奖"),</font>

<font style="color:rgb(38, 44, 49);">(57,"订单退款"),</font>

<font style="color:rgb(38, 44, 49);">(58,"直播上榜奖励"),</font>

<font style="color:rgb(38, 44, 49);">(59,"抽奖消耗积分"),</font>

<font style="color:rgb(38, 44, 49);">(60,"积分参团"),</font>

<font style="color:rgb(38, 44, 49);">(61,"观看直播"),</font>

<font style="color:rgb(38, 44, 49);">(62,"转发直播"),</font>

<font style="color:rgb(38, 44, 49);">(63,"好友看直播"),</font>

<font style="color:rgb(38, 44, 49);">(64,"新用户看直播"),</font>

<font style="color:rgb(38, 44, 49);">(65,"用户看直播"),</font>

<font style="color:rgb(38, 44, 49);">(66,"直播任务"),</font>

<font style="color:rgb(38, 44, 49);">(67,"好友预约直播"),</font>

<font style="color:rgb(38, 44, 49);">(68,"好友预约直播"),</font>

<font style="color:rgb(38, 44, 49);">(69,"释放积分奖励"),</font>

<font style="color:rgb(38, 44, 49);">(70,"直播观看奖励");</font>