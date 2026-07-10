# 2.4.接口调用

---

本文档主要讲解接口调用过程中的重要步骤

<details class="lake-collapse"><summary id="u7f977693"><span class="ne-text">接口域名说明</span></summary><p id="uea9b4a9e" class="ne-p"><span class="ne-text">测试环境接口地址访问域名： https://testapi.jubaozan.cn<br /></span><span class="ne-text">正式环境接口地址访问域名：https://api.c3tech.cn</span></p></details>

## **一、接口访问流程**

1. 通过应用client_id和client_secret获取授权令牌access_token（详见：2.2.鉴权认证）
2. 调用方聚宝赞开放平台API，参数需携带access_token信息；
3. 接收并解析API返回结果  

## **二、公共参数说明**

**公共请求参数**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| access_token | String | Y | 获取的access_token的实际值 |

**公共成功响应参数**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| response | JSON Object | Y | 成功响应对象 |

**成功响应示例**：

```json
{
  "response": {}
}
```

**公共失败响应参数**

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| error_response | JSON Object | Y | 失败响应对象 |

```json
{
  "error_response": {
    "code": "400",
    "msg": "Invalid access token: 66452a82-4b0b-4ace-8cd5-06288f86e92"
  }
}
```

