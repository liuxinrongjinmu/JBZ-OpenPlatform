# 7.18.用户余额变更消息

---

### 接口说明：平台推送消息事件msg说明，消息接收推送成功之后请返回SUCCESS不区分大小写，返回FAIL处理失败，接收方没有成功。


**消息类型**：ACCOUNT_PROFIT_CHANGE

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：订阅方提供（第三方企业提供）

### 余额变更事件Msg参数说明
| 参数 | 类型 | 示例 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- | --- |
| userNo | String |  | Y | 用户编号 |
| nick | String |  | N | 用户昵称 |
| levelId | Long |  | y | 用户等级ID |
| levelName | String |  | Y | 用户等级名称 |
| mobile | String |  | N | 用户手机号 |
| userId | Long |  | Y | 用户ID |
| profit | Doubel |  | Y | 变更余额 |
| balance | Doubel |  | Y | 剩余余额 |
| inout | Integer |  | Y | 状态:   -1:支出   1:收入 |
| businessTime | LocalDateTime |  | Y | 业务发生时间 |
| createTime | LocalDateTime |  | Y | 业务创建时间 |
| description | String |  | N | 描述信息 |
| businessNo | String |  | N | 业务单号 |
| type | String |  | Y | 业务类型   1：订单佣金<br/>2：奖励佣金<br/>3：账户变动   4：批发奖励<br/>5：第三方推送<br/>7: 私域直播    |
| subType | String |  | Y | 子业务类型 |


### 公共请求示例


```json
{
  "id": "1222333",
  "client_id": "shex888",
  "type": " LM_GOODS_STATUS",
  "msg": "UrlEncode(商品信息msg)",
  "sjid": 386,
  "sign": "sign",
  "version": "1.0"
}
```


### 余额msg示例


```json
{}
```

  


subtype: 子业务类型

```plain
("withdraw","用户提现","3"),
("accountPay"," 个人账户支付","3"),
("transferConsume"," 转账到消费账户","3"),
("accountCharge"," 账户充值","3"),
("scoreExchange"," 积分兑换余额","3"),
("bankRefund","银行退汇","3"),
("replenishPay"," 补货支付",""),
("commission0","零售分佣","1"),
("commission1","经销商分佣","1"),
("commission2","购买会员分佣","1"),
("commission3","区域分佣","1"),
("commission103","区域合伙人收益","1"),
("commission4","剩余佣金分配","1"),
("commission5","派送分佣","1"),
("commission6","门店分佣","1"),
("commission7","外部业绩收入","1"),
("commission8","经销商基础推荐收益","1"),
("commission9","经销商级差推荐收益","1"),
("commission10","经销商产品推荐收益","1"),
("commission11","经销商层级收益","1"),
("commission12","经销商商品层级收益","1"),
("commission13","分享收益","1"),
("commission14","经销商团队收益","1"),
("commission15","平台分红","2"),
("commission16","同级直推奖励","1"),
("commission17","服务提成","1"),
("commission18","资产分红","1"),
("commission19","培训收益","1"),
("commission20","会员培训收益","1"),
("commission21","邀请收益","1"),
("commission22","商品邀请收益","1"),
("commission24","会员商品培训收益","1"),
("commission25","活跃收益","1"),
("commission26","闪电直推收益","1"),
("commission27","闪电红利收益","1"),
("commission29","闪电培育收益","1"),
("commission30","链动直推收益","1"),
("commission31","链动见点收益","1"),
("commission32","链动平级收益","1"),
("commission33","门店收益","1"),
("commission34","零售团队收益","1"),
("commission35","零售团队伯乐奖","1"),
("commission36","X+1上贡收益","1"),
("commission37","回单收益","1"),
("commission38","加价收益","1"),
("commission39","门店服务收益","1"),
("commission40","拼单返现收益","1"),
("commission45","经销商储值返还","1"),
("commission46","链动帮扶收益","1"),
("commission47","推客分配收益","1"),
("commission48","推客服务收益","1"),
("commission49","首单有礼活动奖励","1"),
("pinDanCash", "拼单返现", "1"),
("pinDanCashback", "拼单返现-回收", "1"),
("commission51","动态收益","1"),
("commission52","N元N件收益","1"),
("firstFollow","首次关注","2"),
("promotionMember","推广成员","2"),
("boilCash","保证金转现",""),
("monthlyOwnfee","经销商月推荐收益","1"),
("merchantReward","商家奖励","2"),
("wholesalePayment","批发回款","4"),
("agentApply","代理申请",""),
("addCommission","商家加佣","3"),
("subCommission","商家减佣","3"),
("subCommissionDealer","商家经销商减佣","3"),
("subCommissionWholesale","商家回款成本减佣","4"),
("subProfitWholesale","商家回款收益减佣","4"),
("subOtherWholesale","批发其他收益减佣",""),
("addCommissionWholesale","商家回款成本加佣","4"),
("articleShare","文章分享","2"),
("saleMoneyBonus","业绩奖励","2"),
("balanceGivenIncome","余额转赠收入","3"),
("balanceGivenExpenses","余额转赠支出","3"),
("teamLeaderPay","团长垫付","3"),
("freightInsuranceClaim","理赔金","3"),
("activityReward","活动奖励","3"),
("activityRewardBack","活动奖励-回收","3"),
("recommendReward","批发推荐收益","4"),
("recommendRewardPayOut","发放批发推荐收益","4"),
("refund","支付退款","3"),
("wholesalePurchaseBonus","批发进货奖励","4"),
("wholesaleCost","批发收益成本","4"),
("wholesaleProfit","批发收益纯利","4"),
("wholesalePostFee","批发代理运费承担","4"),
("ladderReward","阶梯奖励","2"),
("purchaseReward","进货奖励","2"),
("ladderExtraReward","额外奖励","2"),
("serviceReward","服务奖励","2"),
("commissionBonus", "分红奖励","2"),
("thirdAddMoney", "第三方加余额", "5"),
("thirdSubMoney", "第三方减余额", "5"),
("agencyTransferIn", "服务商转账", "6"),
("liveRankingReward", "私域直播冲榜奖励", "7"),
("liveRewardIn", "直播红包", "7"),
("watchLive", "观看直播", "7"),
("shareLive", "转发直播", "7"),
("inviteUserLive", "邀请用户进入直播", "7"),
("inviteNewUserLive", "邀请新用户进入直播", "7"),
("liveInteractionTask", "直播互动任务", "7"),
("talent_training_upgrade", "达人培训收益 - 升级",  "7")
("talent_training_downgrade", "达人培训收益 - 降级",  "7")
("interactionTaskLive", "通过完成互动任务进入直播", "7")
("qiweiLiveWatchReward", "企微直播观看奖励", "7")
("reservationPrivateLive",  "邀请好友（预约直播）", "7")
("reservationPrivateLiveBack",  "邀请好友（预约直播）撤回", "7"),
("storeSaleBonus","门店业绩奖励","1"),
("areaSaleBonus","片区业绩奖励","1"),
("areaRecommendBonus","片区推荐奖励","1"),
("liveCombinedTask","组合任务","7"),
```


