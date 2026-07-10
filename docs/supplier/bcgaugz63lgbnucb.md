# 订单同步

---

<font style="color:#8A8F8D;">此文主要描述如何使用开放平台接口，接入订单数据，退款等。</font>

**获取分销商订单数据存在两种方式：**

1、通过调用订单查询接口获取订单数据。此方法存在延迟，性能较差。<u><font style="color:#DF2A3F;">可作为订单数据比对，不建议作为数据同步使用。</font></u>

<font style="color:#000000;">2、使用订阅接口，订阅订单推送的数据。此方法延迟较低，性能教高。推送使用此种方式同步订单数据。</font>

**<font style="color:#DF2A3F;">注意：</font>**

<font style="color:#DF2A3F;">由于网络波动、重试等原因，推送可能存在重复。接收方需要做好幂等处理。</font>

**<font style="color:#000000;">订单与售后订单消息订阅</font>**

<font style="color:#000000;">填写好消息订阅的回调地址，请使用https协议。保存成功后，当商家订单产生时，将会回调您的接口，并带入订单数据。</font>

**<font style="color:#000000;">相关接口：</font>**

[消息推送](./rq97dtuumebxeqsn.md)

为了校验数据的合法性，我们需要约定一个防伪签名。

请仔细阅读以下文档：

[公共推送参数](./ialcoh5ofn4tuund.md)

**订单与售后详细数据说明：**

以下包含Msg中字段含义的详细描述。

[SUPPLIER_TRADE_ORDER_STATE-订单消息事件参数](./dn6fevbnfap7gll1.md)

[SUPPLIER_TRADE_ORDER_REFUND-售后消息事件参数](./sgtx5qch9tl63e7e.md)

您可以使用订单查询接口获取，商家产生的订单，以及售后订单等。

此数据与以下功能一致，（订单->订单列表）如图：

![](/images/supplier/20f097df9e8ba956.png)

**相关接口：**

[订单查询](./aorz1365pprrdd7g.md)

[售后单列表查询](./gffweww3cufk3g0k.md)

**注意：**

+ <font style="color:#DF2A3F;">此接口有范围限制只能访问最近三个月的数据。</font>

在售后时，你可以使用以下接口同步商家订单的退款状态。

调用此接口后，以下功能应当和接口返回结果一致，如图。

![](/images/supplier/ff290896a165debc.png)

**相关接口：**

[退款同步](./mw1uant877rs4qkm.md)

[退款地址同步](./oyzkbbqsng8mgxrh.md)

