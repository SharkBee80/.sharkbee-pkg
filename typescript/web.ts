/**
 * 存储项接口，支持过期时间
 */
interface StorageItem<T> {
	value: T;
	expiry: number | null; // 时间戳，null 表示永久
}

export enum StorageType {
	Local = 'local',
	Session = 'session'
}

export class WebStorage {
	private storage: Storage;
	private prefix: string;

	/**
	 * @param type 存储类型
	 * @param prefix Key 前缀，防止多应用/多模块冲突
	 */
	constructor(type: StorageType = StorageType.Local, prefix: string = 'app_') {
		this.storage = type === StorageType.Local ? window.localStorage : window.sessionStorage;
		this.prefix = prefix;
	}

	/**
	 * 设置存储
	 * @param key 键名
	 * @param value 键值
	 * @param ttl 过期时间（秒），可选
	 */
	set<T>(key: string, value: T, ttl: number | null = null): void {
		const item: StorageItem<T> = {
			value,
			expiry: ttl ? Date.now() + ttl * 1000 : null,
		};
		this.storage.setItem(this.prefix + key, JSON.stringify(item));
	}

	/**
	 * 获取存储
	 * @param key 键名
	 */
	get<T>(key: string): T | null {
		const raw = this.storage.getItem(this.prefix + key);
		if (!raw) return null;

		try {
			const item: StorageItem<T> = JSON.parse(raw);

			// 检查是否过期
			if (item.expiry && Date.now() > item.expiry) {
				this.remove(key);
				return null;
			}

			return item.value;
		} catch (e) {
			console.error(`解析 Storage [${key}] 失败:`, e);
			return null;
		}
	}

	/**
	 * 删除指定项
	 */
	remove(key: string): void {
		this.storage.removeItem(this.prefix + key);
	}

	/**
	 * 清空当前前缀下的所有存储
	 */
	clear(): void {
		const keysToRemove: string[] = [];
		for (let i = 0; i < this.storage.length; i++) {
			const key = this.storage.key(i);
			if (key?.startsWith(this.prefix)) {
				keysToRemove.push(key);
			}
		}
		keysToRemove.forEach(key => this.storage.removeItem(key));
	}
}

// 导出单例
// export const localStore = new StorageService(StorageType.Local, 'tauri_ui_');
// export const sessionStore = new StorageService(StorageType.Session, 'tauri_tmp_');
