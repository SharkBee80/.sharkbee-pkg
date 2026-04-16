//@ts-nocheck
import jwt from "jsonwebtoken";

/**
 * 签发 Token (生成)
 */
jwt.sign(payload, key, options);

/**
 * 校验 Token (验证)
 */
jwt.verify(token, key, options);

/**
 * 解析 Token (仅解码，不校验合法性)
 */
jwt.decode(token);
