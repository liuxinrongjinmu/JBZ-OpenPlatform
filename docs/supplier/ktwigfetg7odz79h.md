# 获取全量类目信息

---

**接口说明**：获取全量类目信息

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/json`

**请求地址**：[https://api.c3tech.cn/oauthentry/supplier/goods/category?access_token=[token]](https://api.c3tech.cn/oauthentry/supplier/goods/category?access_token=%5Btoken%5D)

**参数说明**：

```plain
无
```

**返回结果**：

| 名称 | 必选 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| | 否 | object[] | | |
|   ├ id | 否 | integer | | |
|   ├ name | 否 | string | | 分类名称 |
|   ├ parentId | 否 | integer | | 上级分类 |
|   ├ level | 否 | integer | | 级别 |
|   ├ icon | 否 | string | | 图标 |
|   ├ seq | 否 | integer | | 序号 |
|   ├ code | 否 | string | | 类目code |
|   └ deleted | 否 | boolean | | 逻辑删除 |

**入参示例**：

```plain
无
```

**成功响应**：

```json
{
  "response": [
    {
      "id": 1605,
      "name": "食品",
      "parentId": 0,
      "level": 1,
      "code": "1605",
      "deleted": false
    },
    {
      "id": 1606,
      "name": "美妆",
      "parentId": 0,
      "level": 1,
      "code": "1606",
      "deleted": false
    },
    {
      "id": 1607,
      "name": "个人护理",
      "parentId": 0,
      "level": 1,
      "code": "1607",
      "deleted": false
    },
    {
      "id": 1608,
      "name": "日用百货",
      "parentId": 0,
      "level": 1,
      "code": "1608",
      "deleted": false
    },
    {
      "id": 1609,
      "name": "服饰",
      "parentId": 0,
      "level": 1,
      "code": "1609",
      "deleted": false
    },
    {
      "id": 1610,
      "name": "母婴",
      "parentId": 0,
      "level": 1,
      "code": "1610",
      "deleted": false
    },
    {
      "id": 1611,
      "name": "影音图书",
      "parentId": 0,
      "level": 1,
      "code": "1611",
      "deleted": false
    },
    {
      "id": 1612,
      "name": "家电办公",
      "parentId": 0,
      "level": 1,
      "code": "1612",
      "deleted": false
    },
    {
      "id": 1613,
      "name": "手机数码",
      "parentId": 0,
      "level": 1,
      "code": "1613",
      "deleted": false
    },
    {
      "id": 1614,
      "name": "汽车用品",
      "parentId": 0,
      "level": 1,
      "code": "1614",
      "deleted": false
    },
    {
      "id": 1615,
      "name": "知识付费",
      "parentId": 0,
      "level": 1,
      "code": "1615",
      "deleted": false
    },
    {
      "id": 1616,
      "name": "鞋类箱包",
      "parentId": 0,
      "level": 1,
      "code": "1616",
      "deleted": false
    },
    {
      "id": 1617,
      "name": "运动户外",
      "parentId": 0,
      "level": 1,
      "code": "1617",
      "deleted": false
    },
    {
      "id": 1618,
      "name": "家具家装",
      "parentId": 0,
      "level": 1,
      "code": "1618",
      "deleted": false
    },
    {
      "id": 1619,
      "name": "珠宝配饰",
      "parentId": 0,
      "level": 1,
      "code": "1619",
      "deleted": false
    },
    {
      "id": 1620,
      "name": "生活服务",
      "parentId": 0,
      "level": 1,
      "code": "1620",
      "deleted": false
    },
    {
      "id": 1621,
      "name": "文娱花鸟",
      "parentId": 0,
      "level": 1,
      "code": "1621",
      "deleted": false
    },
    {
      "id": 1622,
      "name": "生鲜水果",
      "parentId": 1605,
      "level": 2,
      "code": "1622",
      "deleted": false
    },
    {
      "id": 1623,
      "name": "糖果/巧克力",
      "parentId": 1605,
      "level": 2,
      "code": "1623",
      "deleted": false
    },
    {
      "id": 1624,
      "name": "饼干糕点",
      "parentId": 1605,
      "level": 2,
      "code": "1624",
      "deleted": false
    },
    {
      "id": 1625,
      "name": "蜜饯果干",
      "parentId": 1605,
      "level": 2,
      "code": "1625",
      "deleted": false
    },
    {
      "id": 1626,
      "name": "坚果炒货",
      "parentId": 1605,
      "level": 2,
      "code": "1626",
      "deleted": false
    },
    {
      "id": 1627,
      "name": "肉类/豆制品",
      "parentId": 1605,
      "level": 2,
      "code": "1627",
      "deleted": false
    },
    {
      "id": 1628,
      "name": "牛奶乳品",
      "parentId": 1605,
      "level": 2,
      "code": "1628",
      "deleted": false
    },
    {
      "id": 1629,
      "name": "饮料/水",
      "parentId": 1605,
      "level": 2,
      "code": "1629",
      "deleted": false
    },
    {
      "id": 1630,
      "name": "酒类",
      "parentId": 1605,
      "level": 2,
      "code": "1630",
      "deleted": false
    },
    {
      "id": 1631,
      "name": "茶叶",
      "parentId": 1605,
      "level": 2,
      "code": "1631",
      "deleted": false
    },
    {
      "id": 1632,
      "name": "冲调保健",
      "parentId": 1605,
      "level": 2,
      "code": "1632",
      "deleted": false
    },
    {
      "id": 1633,
      "name": "大米面粉",
      "parentId": 1605,
      "level": 2,
      "code": "1633",
      "deleted": false
    },
    {
      "id": 1634,
      "name": "食用油",
      "parentId": 1605,
      "level": 2,
      "code": "1634",
      "deleted": false
    },
    {
      "id": 1635,
      "name": "健康杂粮",
      "parentId": 1605,
      "level": 2,
      "code": "1635",
      "deleted": false
    },
    {
      "id": 1636,
      "name": "下饭菜",
      "parentId": 1605,
      "level": 2,
      "code": "1636",
      "deleted": false
    },
    {
      "id": 1637,
      "name": "厨房调料",
      "parentId": 1605,
      "level": 2,
      "code": "1637",
      "deleted": false
    },
    {
      "id": 1638,
      "name": "调味酱",
      "parentId": 1605,
      "level": 2,
      "code": "1638",
      "deleted": false
    },
    {
      "id": 1639,
      "name": "菌菇干货",
      "parentId": 1605,
      "level": 2,
      "code": "1639",
      "deleted": false
    },
    {
      "id": 1640,
      "name": "方便食品",
      "parentId": 1605,
      "level": 2,
      "code": "1640",
      "deleted": false
    },
    {
      "id": 1641,
      "name": "其他",
      "parentId": 1605,
      "level": 2,
      "code": "1641",
      "deleted": false
    },
    {
      "id": 1642,
      "name": "护肤",
      "parentId": 1606,
      "level": 2,
      "code": "1642",
      "deleted": false
    },
    {
      "id": 1643,
      "name": "彩妆",
      "parentId": 1606,
      "level": 2,
      "code": "1643",
      "deleted": false
    },
    {
      "id": 1644,
      "name": "美容仪",
      "parentId": 1606,
      "level": 2,
      "code": "1644",
      "deleted": false
    },
    {
      "id": 1645,
      "name": "个人洗护",
      "parentId": 1607,
      "level": 2,
      "code": "1645",
      "deleted": false
    },
    {
      "id": 1646,
      "name": "护理工具",
      "parentId": 1607,
      "level": 2,
      "code": "1646",
      "deleted": false
    },
    {
      "id": 1647,
      "name": "计生情趣",
      "parentId": 1607,
      "level": 2,
      "code": "1647",
      "deleted": false
    },
    {
      "id": 1648,
      "name": "厨房烹饪",
      "parentId": 1608,
      "level": 2,
      "code": "1648",
      "deleted": false
    },
    {
      "id": 1649,
      "name": "餐饮具",
      "parentId": 1608,
      "level": 2,
      "code": "1649",
      "deleted": false
    },
    {
      "id": 1650,
      "name": "收纳清洁",
      "parentId": 1608,
      "level": 2,
      "code": "1650",
      "deleted": false
    },
    {
      "id": 1651,
      "name": "纸品清洁",
      "parentId": 1608,
      "level": 2,
      "code": "1651",
      "deleted": false
    },
    {
      "id": 1652,
      "name": "床上用品",
      "parentId": 1608,
      "level": 2,
      "code": "1652",
      "deleted": false
    },
    {
      "id": 1653,
      "name": "居家布艺",
      "parentId": 1608,
      "level": 2,
      "code": "1653",
      "deleted": false
    },
    {
      "id": 1654,
      "name": "家具饰品",
      "parentId": 1608,
      "level": 2,
      "code": "1654",
      "deleted": false
    },
    {
      "id": 1655,
      "name": "个护小电器",
      "parentId": 1608,
      "level": 2,
      "code": "1655",
      "deleted": false
    },
    {
      "id": 1656,
      "name": "杂货礼品",
      "parentId": 1608,
      "level": 2,
      "code": "1656",
      "deleted": false
    },
    {
      "id": 1657,
      "name": "裙装",
      "parentId": 1609,
      "level": 2,
      "code": "1657",
      "deleted": false
    },
    {
      "id": 1658,
      "name": "上装",
      "parentId": 1609,
      "level": 2,
      "code": "1658",
      "deleted": false
    },
    {
      "id": 1659,
      "name": "下装",
      "parentId": 1609,
      "level": 2,
      "code": "1659",
      "deleted": false
    },
    {
      "id": 1660,
      "name": "特色服装",
      "parentId": 1609,
      "level": 2,
      "code": "1660",
      "deleted": false
    },
    {
      "id": 1661,
      "name": "内衣",
      "parentId": 1609,
      "level": 2,
      "code": "1661",
      "deleted": false
    },
    {
      "id": 1662,
      "name": "配饰",
      "parentId": 1609,
      "level": 2,
      "code": "1662",
      "deleted": false
    },
    {
      "id": 1663,
      "name": "奶粉",
      "parentId": 1610,
      "level": 2,
      "code": "1663",
      "deleted": false
    },
    {
      "id": 1664,
      "name": "纸尿裤",
      "parentId": 1610,
      "level": 2,
      "code": "1664",
      "deleted": false
    },
    {
      "id": 1665,
      "name": "洗浴护理",
      "parentId": 1610,
      "level": 2,
      "code": "1665",
      "deleted": false
    },
    {
      "id": 1666,
      "name": "辅食营养",
      "parentId": 1610,
      "level": 2,
      "code": "1666",
      "deleted": false
    },
    {
      "id": 1667,
      "name": "宝宝用品",
      "parentId": 1610,
      "level": 2,
      "code": "1667",
      "deleted": false
    },
    {
      "id": 1668,
      "name": "孕妈",
      "parentId": 1610,
      "level": 2,
      "code": "1668",
      "deleted": false
    },
    {
      "id": 1669,
      "name": "童装",
      "parentId": 1610,
      "level": 2,
      "code": "1669",
      "deleted": false
    },
    {
      "id": 1670,
      "name": "童鞋",
      "parentId": 1610,
      "level": 2,
      "code": "1670",
      "deleted": false
    },
    {
      "id": 1671,
      "name": "玩具",
      "parentId": 1610,
      "level": 2,
      "code": "1671",
      "deleted": false
    },
    {
      "id": 1672,
      "name": "出行用品",
      "parentId": 1610,
      "level": 2,
      "code": "1672",
      "deleted": false
    },
    {
      "id": 1673,
      "name": "寝居床品",
      "parentId": 1610,
      "level": 2,
      "code": "1673",
      "deleted": false
    },
    {
      "id": 1674,
      "name": "其他",
      "parentId": 1610,
      "level": 2,
      "code": "1674",
      "deleted": false
    },
    {
      "id": 1675,
      "name": "文学",
      "parentId": 1611,
      "level": 2,
      "code": "1675",
      "deleted": false
    },
    {
      "id": 1676,
      "name": "童书",
      "parentId": 1611,
      "level": 2,
      "code": "1676",
      "deleted": false
    },
    {
      "id": 1677,
      "name": "教辅教材",
      "parentId": 1611,
      "level": 2,
      "code": "1677",
      "deleted": false
    },
    {
      "id": 1678,
      "name": "人文社科",
      "parentId": 1611,
      "level": 2,
      "code": "1678",
      "deleted": false
    },
    {
      "id": 1679,
      "name": "经管励志",
      "parentId": 1611,
      "level": 2,
      "code": "1679",
      "deleted": false
    },
    {
      "id": 1680,
      "name": "艺术",
      "parentId": 1611,
      "level": 2,
      "code": "1680",
      "deleted": false
    },
    {
      "id": 1681,
      "name": "生活",
      "parentId": 1611,
      "level": 2,
      "code": "1681",
      "deleted": false
    },
    {
      "id": 1682,
      "name": "科学技术",
      "parentId": 1611,
      "level": 2,
      "code": "1682",
      "deleted": false
    },
    {
      "id": 1683,
      "name": "刊/原版",
      "parentId": 1611,
      "level": 2,
      "code": "1683",
      "deleted": false
    },
    {
      "id": 1684,
      "name": "音像制品",
      "parentId": 1611,
      "level": 2,
      "code": "1684",
      "deleted": false
    },
    {
      "id": 1685,
      "name": "大家电",
      "parentId": 1612,
      "level": 2,
      "code": "1685",
      "deleted": false
    },
    {
      "id": 1686,
      "name": "电子元器件",
      "parentId": 1612,
      "level": 2,
      "code": "1686",
      "deleted": false
    },
    {
      "id": 1687,
      "name": "文化用品",
      "parentId": 1612,
      "level": 2,
      "code": "1687",
      "deleted": false
    },
    {
      "id": 1688,
      "name": "办公耗材",
      "parentId": 1612,
      "level": 2,
      "code": "1688",
      "deleted": false
    },
    {
      "id": 1689,
      "name": "厨房电器",
      "parentId": 1612,
      "level": 2,
      "code": "1689",
      "deleted": false
    },
    {
      "id": 1690,
      "name": "生活电器",
      "parentId": 1612,
      "level": 2,
      "code": "1690",
      "deleted": false
    },
    {
      "id": 1691,
      "name": "影音电器",
      "parentId": 1612,
      "level": 2,
      "code": "1691",
      "deleted": false
    },
    {
      "id": 1692,
      "name": "手机",
      "parentId": 1613,
      "level": 2,
      "code": "1692",
      "deleted": false
    },
    {
      "id": 1693,
      "name": "电脑",
      "parentId": 1613,
      "level": 2,
      "code": "1693",
      "deleted": false
    },
    {
      "id": 1694,
      "name": "相机",
      "parentId": 1613,
      "level": 2,
      "code": "1694",
      "deleted": false
    },
    {
      "id": 1695,
      "name": "3C配件",
      "parentId": 1613,
      "level": 2,
      "code": "1695",
      "deleted": false
    },
    {
      "id": 1696,
      "name": "数码配件",
      "parentId": 1613,
      "level": 2,
      "code": "1696",
      "deleted": false
    },
    {
      "id": 1697,
      "name": "智能设备",
      "parentId": 1613,
      "level": 2,
      "code": "1697",
      "deleted": false
    },
    {
      "id": 1698,
      "name": "电玩",
      "parentId": 1613,
      "level": 2,
      "code": "1698",
      "deleted": false
    },
    {
      "id": 1699,
      "name": "MP3/MP4",
      "parentId": 1613,
      "level": 2,
      "code": "1699",
      "deleted": false
    },
    {
      "id": 1700,
      "name": "车载电器",
      "parentId": 1614,
      "level": 2,
      "code": "1700",
      "deleted": false
    },
    {
      "id": 1701,
      "name": "维修保养",
      "parentId": 1614,
      "level": 2,
      "code": "1701",
      "deleted": false
    },
    {
      "id": 1702,
      "name": "美容清洗",
      "parentId": 1614,
      "level": 2,
      "code": "1702",
      "deleted": false
    },
    {
      "id": 1703,
      "name": "汽车装饰",
      "parentId": 1614,
      "level": 2,
      "code": "1703",
      "deleted": false
    },
    {
      "id": 1704,
      "name": "其他",
      "parentId": 1614,
      "level": 2,
      "code": "1704",
      "deleted": false
    },
    {
      "id": 1705,
      "name": "个人提升",
      "parentId": 1615,
      "level": 2,
      "code": "1705",
      "deleted": false
    },
    {
      "id": 1706,
      "name": "女性时尚",
      "parentId": 1615,
      "level": 2,
      "code": "1706",
      "deleted": false
    },
    {
      "id": 1707,
      "name": "亲子教育",
      "parentId": 1615,
      "level": 2,
      "code": "1707",
      "deleted": false
    },
    {
      "id": 1708,
      "name": "健康养生",
      "parentId": 1615,
      "level": 2,
      "code": "1708",
      "deleted": false
    },
    {
      "id": 1709,
      "name": "职场创业",
      "parentId": 1615,
      "level": 2,
      "code": "1709",
      "deleted": false
    },
    {
      "id": 1710,
      "name": "商业理财",
      "parentId": 1615,
      "level": 2,
      "code": "1710",
      "deleted": false
    },
    {
      "id": 1711,
      "name": "情感心理",
      "parentId": 1615,
      "level": 2,
      "code": "1711",
      "deleted": false
    },
    {
      "id": 1712,
      "name": "文艺生活",
      "parentId": 1615,
      "level": 2,
      "code": "1712",
      "deleted": false
    },
    {
      "id": 1713,
      "name": "读书修养",
      "parentId": 1615,
      "level": 2,
      "code": "1713",
      "deleted": false
    },
    {
      "id": 1714,
      "name": "功能箱包",
      "parentId": 1616,
      "level": 2,
      "code": "1714",
      "deleted": false
    },
    {
      "id": 1715,
      "name": "潮流女包",
      "parentId": 1616,
      "level": 2,
      "code": "1715",
      "deleted": false
    },
    {
      "id": 1716,
      "name": "精品男包",
      "parentId": 1616,
      "level": 2,
      "code": "1716",
      "deleted": false
    },
    {
      "id": 1717,
      "name": "女鞋",
      "parentId": 1616,
      "level": 2,
      "code": "1717",
      "deleted": false
    },
    {
      "id": 1718,
      "name": "男鞋",
      "parentId": 1616,
      "level": 2,
      "code": "1718",
      "deleted": false
    },
    {
      "id": 1719,
      "name": "运动鞋包",
      "parentId": 1617,
      "level": 2,
      "code": "1719",
      "deleted": false
    },
    {
      "id": 1720,
      "name": "运动服饰",
      "parentId": 1617,
      "level": 2,
      "code": "1720",
      "deleted": false
    },
    {
      "id": 1721,
      "name": "骑行运动",
      "parentId": 1617,
      "level": 2,
      "code": "1721",
      "deleted": false
    },
    {
      "id": 1722,
      "name": "体育用品",
      "parentId": 1617,
      "level": 2,
      "code": "1722",
      "deleted": false
    },
    {
      "id": 1723,
      "name": "游泳用品",
      "parentId": 1617,
      "level": 2,
      "code": "1723",
      "deleted": false
    },
    {
      "id": 1724,
      "name": "健康训练",
      "parentId": 1617,
      "level": 2,
      "code": "1724",
      "deleted": false
    },
    {
      "id": 1725,
      "name": "户外鞋服",
      "parentId": 1617,
      "level": 2,
      "code": "1725",
      "deleted": false
    },
    {
      "id": 1726,
      "name": "户外装备",
      "parentId": 1617,
      "level": 2,
      "code": "1726",
      "deleted": false
    },
    {
      "id": 1727,
      "name": "家装软饰",
      "parentId": 1618,
      "level": 2,
      "code": "1727",
      "deleted": false
    },
    {
      "id": 1728,
      "name": "灯具",
      "parentId": 1618,
      "level": 2,
      "code": "1728",
      "deleted": false
    },
    {
      "id": 1729,
      "name": "家具",
      "parentId": 1618,
      "level": 2,
      "code": "1729",
      "deleted": false
    },
    {
      "id": 1730,
      "name": "五金电工",
      "parentId": 1618,
      "level": 2,
      "code": "1730",
      "deleted": false
    },
    {
      "id": 1731,
      "name": "厨房卫浴",
      "parentId": 1618,
      "level": 2,
      "code": "1731",
      "deleted": false
    },
    {
      "id": 1732,
      "name": "建筑材料",
      "parentId": 1618,
      "level": 2,
      "code": "1732",
      "deleted": false
    },
    {
      "id": 1733,
      "name": "装修设计",
      "parentId": 1618,
      "level": 2,
      "code": "1733",
      "deleted": false
    },
    {
      "id": 1734,
      "name": "手表",
      "parentId": 1619,
      "level": 2,
      "code": "1734",
      "deleted": false
    },
    {
      "id": 1735,
      "name": "时尚饰品",
      "parentId": 1619,
      "level": 2,
      "code": "1735",
      "deleted": false
    },
    {
      "id": 1736,
      "name": "珠宝首饰",
      "parentId": 1619,
      "level": 2,
      "code": "1736",
      "deleted": false
    },
    {
      "id": 1737,
      "name": "男人配饰",
      "parentId": 1619,
      "level": 2,
      "code": "1737",
      "deleted": false
    },
    {
      "id": 1738,
      "name": "眼镜",
      "parentId": 1619,
      "level": 2,
      "code": "1738",
      "deleted": false
    },
    {
      "id": 1739,
      "name": "古玩珍藏",
      "parentId": 1619,
      "level": 2,
      "code": "1739",
      "deleted": false
    },
    {
      "id": 1740,
      "name": "丽人健身",
      "parentId": 1620,
      "level": 2,
      "code": "1740",
      "deleted": false
    },
    {
      "id": 1741,
      "name": "医疗健康",
      "parentId": 1620,
      "level": 2,
      "code": "1741",
      "deleted": false
    },
    {
      "id": 1742,
      "name": "旅行",
      "parentId": 1620,
      "level": 2,
      "code": "1742",
      "deleted": false
    },
    {
      "id": 1743,
      "name": "蛋糕",
      "parentId": 1620,
      "level": 2,
      "code": "1743",
      "deleted": false
    },
    {
      "id": 1744,
      "name": "乐器",
      "parentId": 1621,
      "level": 2,
      "code": "1744",
      "deleted": false
    },
    {
      "id": 1745,
      "name": "游戏",
      "parentId": 1621,
      "level": 2,
      "code": "1745",
      "deleted": false
    },
    {
      "id": 1746,
      "name": "动漫周边",
      "parentId": 1621,
      "level": 2,
      "code": "1746",
      "deleted": false
    },
    {
      "id": 1747,
      "name": "鲜花园艺",
      "parentId": 1621,
      "level": 2,
      "code": "1747",
      "deleted": false
    },
    {
      "id": 1748,
      "name": "宠物",
      "parentId": 1621,
      "level": 2,
      "code": "1748",
      "deleted": false
    },
    {
      "id": 1757,
      "name": "其他",
      "parentId": 0,
      "level": 1,
      "code": "1757",
      "deleted": false
    },
    {
      "id": 1758,
      "name": "礼品鲜花",
      "parentId": 1757,
      "level": 2,
      "code": "1758",
      "deleted": false
    },
    {
      "id": 1759,
      "name": "餐饮外卖",
      "parentId": 1757,
      "level": 2,
      "code": "1759",
      "deleted": false
    },
    {
      "id": 9991708,
      "name": "乐器",
      "parentId": 0,
      "level": 1,
      "code": "9991708",
      "deleted": false
    },
    {
      "id": 9991710,
      "name": "钢琴",
      "parentId": 9991708,
      "level": 1,
      "code": "9991710",
      "deleted": false
    },
    {
      "id": 9991711,
      "name": "电钢琴",
      "parentId": 9991708,
      "level": 1,
      "code": "9991711",
      "deleted": false
    },
    {
      "id": 9991712,
      "name": "电子琴",
      "parentId": 9991708,
      "level": 1,
      "code": "9991712",
      "deleted": false
    },
    {
      "id": 9991713,
      "name": "吉他",
      "parentId": 9991708,
      "level": 1,
      "code": "9991713",
      "deleted": false
    },
    {
      "id": 9991714,
      "name": "尤克里里",
      "parentId": 9991708,
      "level": 1,
      "code": "9991714",
      "deleted": false
    },
    {
      "id": 9991715,
      "name": "打击乐器",
      "parentId": 9991708,
      "level": 1,
      "code": "9991715",
      "deleted": false
    },
    {
      "id": 9991716,
      "name": "西洋管弦",
      "parentId": 9991708,
      "level": 1,
      "code": "9991716",
      "deleted": false
    },
    {
      "id": 9991717,
      "name": "民族乐器",
      "parentId": 9991708,
      "level": 1,
      "code": "9991717",
      "deleted": false
    },
    {
      "id": 9991718,
      "name": "乐器配件",
      "parentId": 9991708,
      "level": 1,
      "code": "9991718",
      "deleted": false
    }
  ]
}
```

**错误响应示例**：

```json
{
  "response": {
    "code": "503",
    "msg": "服务不可用"
  }
}
```

