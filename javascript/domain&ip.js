import validator from 'validator';

// 域名 + IPv4 + IPv6(带方括号) + 可选端口(1-65535)
// const pattern = /^(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)\.)+(?:[a-zA-Z]{2,})|(?:(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])|\[(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|:(?::[0-9a-fA-F]{1,4}){1,7}|::)\])(?::(?:[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;

/**
 * 验证 域名/IP + 可选端口
 * 支持格式: example.com, 1.1.1.1, [2001:db8::1], example.com:8080, [::1]:443
 */
export const validateAddress = (value) => {
	if (!value) return '此项必填';

	// 1. 分离地址和端口
	// 针对 IPv6 的特殊处理：寻找最后一个冒号，且该冒号不在方括号内
	let host = value;
	let port;

	const lastColonIndex = value.lastIndexOf(':');
	const lastBracketIndex = value.lastIndexOf(']');

	// 如果冒号在最后一个中括号之后，说明存在端口
	if (lastColonIndex > lastBracketIndex && lastColonIndex !== -1) {
		host = value.substring(0, lastColonIndex);
		port = value.substring(lastColonIndex + 1);
	}

	// 2. 校验端口 (如果存在)
	if (port && !validator.isPort(port)) {
		return '端口号无效 (1-65535)';
	}

	// 3. 校验 Host (域名或 IP)
	// 去掉 IPv6 的方括号进行校验
	const cleanHost = host.startsWith('[') && host.endsWith(']')
		? host.slice(1, -1)
		: host;

	const isDomain = validator.isFQDN(cleanHost);
	const isIP = validator.isIP(cleanHost);

	if (!isDomain && !isIP) {
		return '请输入有效的域名或 IP 地址';
	}

	return true;
};
