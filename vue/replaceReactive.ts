// @ts-nocheck
type Config = {
	[key: string]: any
}
// default settings
const DEFAULT_SETTINGS = {}

import { reactive } from 'vue'
import merge from 'deepmerge'; // npm install deepmerge
// reactive object
const originConfig = reactive<Config>({})
// new settings
const newConfig: Config = {}
// replace reactive
replaceReactiveStrict(originConfig, merge(DEFAULT_SETTINGS, newConfig));

/////////////////////////////////////////////////////////////////////////

/**function */
// replace reactive
function replaceReactive<
	T extends Record<string, any>
>(
	target: T,
	source: Partial<T>
): void {
	for (const key in target) {
		delete target[key]
	}
	for (const key in source) {
		target[key] = source[key] as T[typeof key]
	}
}
// replace reactive strict
function replaceReactiveStrict<
	T extends Record<string, any>
>(
	target: T,
	source: T
): void {
	for (const key in target) {
		delete target[key]
	}
	Object.assign(target, source)
}