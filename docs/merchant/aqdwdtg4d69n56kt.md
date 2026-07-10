# 6.2.第三方会员同步

---

### 接口说明：第三方会员同步到平台，可用户系统间会员打通

**请求方式**：POST（HTTPS）

**请求头**：`Content-Type：application/x-www-form-urlencoded`  ~~**请求地址**~~~~：https://api.c3tech.cn/oauthentry/user/createMemberForThird?access_token=<span v-pre>{{access_token}}</span> ~~

 (更换接口调用地址，不影响历史对接)

**请求地址**：https://api.c3tech.cn/oauthentry/user/createUserForThird?access_token=<span v-pre>{{access_token}}</span>

### 参数说明

| 参数 | 类型 | 必传(Y/N) | 示例值 | 说明 |
| --- | --- | --- | --- | --- |
| access_token | String | Y | 66452a82-4b0b-4ace-8cd5-06288f86e923 | 授权令牌 |
| agentid | String | Y | 123 | 第三方用户ID |
| superAgentid | String | N | 11225 | 第三方推荐人ID |
| orderid | String | N |  | 第三方会员编号   注：传入该值会根据会员编号创建用户 |
| zmrOrderid | String | N |  | 第三方推荐人会员编号<br/>注：传入该值会根据推荐人编号绑定上级 |
| fromAgentId | Long | N | 15292 | 聚宝赞推荐人ID |
| heardurl | String | N | [http://wx.qlogo.cn/mmopen/mrjDrTica5PaDY](http://wx.qlogo.cn/mmopen/mrjDrTica5PaDY)<br/>... | 用户头像 |
| nick | String | Y | Hunter | 昵称 |
| mobile | String | Y | 15292248762 | 用户手机号 |
| openid | String | N | oD3iQw-x5av9ppmzvIHFDOZ0z8mo | 会员微信openid<br/>（公众号/小程序/APP） |
| unionid | String | N | o_xqA1gaU1AuIfVq00NZ_J4wXKzo | 会员微信unionid,注：<br/>unionid和手机号至少需要填一个 |
| appid | String | N | wxe9255de8cc4e63a3 | 微信应用ID<br/>(传入unionid时 appid 必填) |
| channel | String | N | official | 来源渠道 <br/>公众号=OFFICIAL <br/>小程序=APPLET  <br/>App=APP <br/>手机注册=MOBILE<br/>（当传入unionid时，channel必填） |
| recommend_mobile | String | N | 15292248762 | 推荐人手机号 |
| level | String | N | VIP会员 | 会员等级名称 |
| pwd | String | N | 密码<br/><br/> | ```java 仅传输使用，非用户密码加密规则  1.使用MessageDigest SHA-256算法， 将clientSecret生成密钥key  2.使用AES根据密钥key将用户密码加密 得到字节数组cipherText  3.将字节数组cipherText， 通过Base64进行编码得到最终密文cipherTextStr  可参考下方代码示例 ```     注：若传了第三方会员编号orderid,未传密码pwd字段会默认密码 111111 |

### 返回结果

| 参数 | 类型 | 必传(Y/N) | 说明 |
| --- | --- | --- | --- |
| type | Number | Y | 1=仅创建会员2=创建会员并绑定上级 |
| mobile | String | N | 会员手机号 |
| nick | String | N | 会员昵称 |
| openid | String | N | 会员openid |
| orderid | String | Y | 聚宝赞会员编号 |
| agentid | Long | Y | 聚宝赞会员ID |
| superAgentid | Long | N | 聚宝赞推荐人ID 0=无上级 |

### 响应示例

```json
{
  "response": {
    "type": 1,
    "mobile": "15121061731",
    "nick": "test",
    "openid": "testopenid",
    "agentid": 14492661,
    "orderid": "112",
    "superAgentid ": 1123
  }
}
```

```javapackage com.example.user;

import javax.crypto.Cipher;import javax.crypto.spec.SecretKeySpec;import java.security.MessageDigest;import java.util.Base64;

public class AESExample {

    public static byte[] encrypt(String plainText, byte[] key) throws Exception {        SecretKeySpec secretKey = new SecretKeySpec(key, "AES");        Cipher cipher = Cipher.getInstance("AES");        cipher.init(Cipher.ENCRYPT_MODE, secretKey);        return cipher.doFinal(plainText.getBytes());    }

    public static String decrypt(byte[] cipherText, byte[] key) throws Exception {        SecretKeySpec secretKey = new SecretKeySpec(key, "AES");        Cipher cipher = Cipher.getInstance("AES");        cipher.init(Cipher.DECRYPT_MODE, secretKey);        byte[] decryptedBytes = cipher.doFinal(cipherText);        return new String(decryptedBytes);    }

    public static void main(String[] args) throws Exception {        // 使用32字节密钥（256位）        String clientSecret = "ABOkWftS2pA1eC4b06qd3iMgiYBoXHhzE3RV";        MessageDigest sha256 = MessageDigest.getInstance("SHA-256");        byte[] key = sha256.digest(clientSecret.getBytes());

        String pwd = "JBZ123456";        // 加密        byte[] cipherText = encrypt(pwd, key);

        // 将cipherText字节数组转换为Base64字符串        String cipherTextStr = Base64.getEncoder().encodeToString(cipherText);        System.out.println("Cipher Text (Base64): " + cipherTextStr);

        // 解密        byte[] decodedCipherText = Base64.getDecoder().decode(cipherTextStr);        String decryptedText = decrypt(decodedCipherText, key);

        // 输出解密后的明文        System.out.println("Decrypted Text: " + decryptedText);    }}```

密码加密示例（c#）

```htmlusing System;using System.Security.Cryptography;using System.Text;

public static class AESUtils{/// <summary>/// 使用 AES/ECB/PKCS7 加密明文/// </summary>/// <param name="plainText">明文字符串</param>/// <param name="key">32 字节密钥（256 位）</param>/// <returns>密文字节数组</returns>public static byte[] Encrypt(string plainText, byte[] key){if (plainText == null) throw new ArgumentNullException(nameof(plainText));if (key == null || key.Length != 32) throw new ArgumentException("密钥必须为 32 字节（256 位）", nameof(key));

using (Aes aes = Aes.Create()){aes.Mode = CipherMode.ECB;aes.Padding = PaddingMode.PKCS7;aes.Key = key;

ICryptoTransform encryptor = aes.CreateEncryptor();byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);return encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);}}

/// <summary>/// 使用 AES/ECB/PKCS7 解密密文/// </summary>/// <param name="cipherText">密文字节数组</param>/// <param name="key">32 字节密钥（256 位）</param>/// <returns>明文字符串</returns>public static string Decrypt(byte[] cipherText, byte[] key){if (cipherText == null) throw new ArgumentNullException(nameof(cipherText));if (key == null || key.Length != 32) throw new ArgumentException("密钥必须为 32 字节（256 位）", nameof(key));

using (Aes aes = Aes.Create()){aes.Mode = CipherMode.ECB;aes.Padding = PaddingMode.PKCS7;aes.Key = key;

ICryptoTransform decryptor = aes.CreateDecryptor();byte[] decryptedBytes = decryptor.TransformFinalBlock(cipherText, 0, cipherText.Length);return Encoding.UTF8.GetString(decryptedBytes);}}

/// <summary>/// 解密用户密码：使用 clientSecret 的 SHA-256 作为密钥，解密 Base64 编码的密文/// </summary>/// <param name="clientSecret">用于派生密钥的字符串</param>/// <param name="encryptedPwdBase64">Base64 编码的 AES 密文</param>/// <returns>解密后的密码明文</returns>public static string DecryptUserPwd(string clientSecret, string encryptedPwdBase64){if (string.IsNullOrEmpty(clientSecret))throw new ArgumentException("clientSecret 密钥不能为空", nameof(clientSecret));if (string.IsNullOrEmpty(encryptedPwdBase64))throw new ArgumentException("encryptedPwdBase64 不能为空", nameof(encryptedPwdBase64));

// 计算 SHA-256，得到 32 字节密钥byte[] key;using (SHA256 sha256 = SHA256.Create()){key = sha256.ComputeHash(Encoding.UTF8.GetBytes(clientSecret));}

// Base64 解码密文byte[] cipherBytes = Convert.FromBase64String(encryptedPwdBase64);

// 解密return Decrypt(cipherBytes, key);}

// 示例用法public static void Main(){string clientSecret = "Tm1ynMuGVhYDLEdPBV8s9Cykm0LlFhPd";

// 计算密钥（SHA-256）byte[] key;using (SHA256 sha256 = SHA256.Create()){key = sha256.ComputeHash(Encoding.UTF8.GetBytes(clientSecret));}

string pwd = "123456";

// 加密byte[] cipherText = Encrypt(pwd, key);string cipherTextBase64 = Convert.ToBase64String(cipherText);Console.WriteLine("Cipher Text (Base64): " + cipherTextBase64);

// 解密byte[] decodedCipher = Convert.FromBase64String(cipherTextBase64);string decryptedText = Decrypt(decodedCipher, key);Console.WriteLine("Decrypted Text: " + decryptedText);}}  ```