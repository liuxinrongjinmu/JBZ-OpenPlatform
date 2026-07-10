# 4.红包提现(未上线)

---

**接口说明**：提现到用户微信账户.

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：https://api.c3tech.cn/oauthentry/v2/account/redPacket/withdraw?access_token=[token]

**参数说明**：

| 参数 | | 类型 | 必传 | 示例值 | 说明 |
| --- | --- | --- | --- | --- | --- |
| userId | | Long | Y |  | 用户ID |
| appId | | String | Y |  | 微信应用ID |
| openId | | String | Y |  | 微信用户openid |
| unionId | | String | Y |  | unionid |
| money | | Double | Y |  | 金额 |

### 响应参数
| 参数 | | 类型 | 必传 | 示例值 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | | Long | Y |  | 提现记录ID |
| requestNo | | String | Y |  | 请求编号 |
| packageInfo | | String | Y |  | 包信息（对应微信：package字段） |
| appId | | String | Y |  | 应用ID |
| openId | | String | Y |  | openId |
| mchId | | String | Y |  | 商户号 |
| clientType | | String | Y |  | 客户端类型 |
| status | | String | Y |  | 状态(调用成功状态为： WAIT_USER_CONFIRM )<br/>"ACCEPTED", "转账已受理"<br/>"PROCESSING", "转账锁定资金中"<br/>"WAIT_USER_CONFIRM", "待收款用户确认"<br/>"TRANSFERING", "转账中"<br/>"SUCCESS", "转账成功"<br/>"FAIL", "转账失败"<br/>"CANCELING", "转账撤销中"<br/>"CANCELLED", "转账撤销完成" |
| errorMsg | | String | Y |  | 错误信息 |
| createAt | | String | Y |  | 创建时间 |

微信转账文档：  
[https://pay.weixin.qq.com/doc/v3/merchant/4012719576](https://pay.weixin.qq.com/doc/v3/merchant/4012719576) 
