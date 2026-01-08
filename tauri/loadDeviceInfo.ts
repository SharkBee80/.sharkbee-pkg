// @ts-nocheck
import { platform, family, version, type, arch, locale } from '@tauri-apps/plugin-os';
import type { Platform, OsType, Arch, Family } from '@tauri-apps/plugin-os';
import { getCurrentWindow } from '@tauri-apps/api/window';

// 获取当前操作系统家族
const osFamily = family();
// 获取当前操作系统平台
const osPlatform = platform();
// 获取当前操作系统版本
const osVersion = version();
// 获取当前操作系统类型
const osType = type();
// 获取当前操作系统架构
const osArch = arch();
// 获取当前操作系统语言
const osLocale = await locale();
// 获取当前操作系统主题
const osTheme = await getCurrentWindow().theme()
// 判断当前操作系统是否为深色主题
const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// export const deviceInfo = {
// 	family: osFamily,
// 	platform: osPlatform,
// 	version: osVersion,
// 	type: osType,
// 	arch: osArch,
// 	locale: osLocale,
// 	theme: osTheme,
// 	isDark: isDark
// }

export const deviceInfo = {
	family: family(),
	platform: platform(),
	version: version(),
	type: type(),
	arch: arch(),
	locale: await locale(),
	theme: await getCurrentWindow().theme(),
	isDark: isDark
}
