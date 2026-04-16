//@ts-nocheck

import * as jose from "jose";

// node environment
// import jwt from "jsonwebtoken";

// /**
//  * 签发 Token (生成)
//  */
// jwt.sign(payload, key, options);
await new jose.SignJWT(payload).setProtectedHeader(header).sign(key);
// /**
//  * 校验 Token (验证)
//  */
// jwt.verify(token, key, options);
await jose.jwtVerify(token, key, options);
// /**
//  * 解析 Token (仅解码，不校验合法性)
//  */
// jwt.decode(token);
jose.decodeJwt(token);
