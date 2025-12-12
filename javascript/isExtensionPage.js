function detectRuntimeContext() {
    // 检查当前运行环境
    // 路径
    const isExtensionPage = location.protocol === 'chrome-extension:';
    // API
    const hasChromeRuntime = !!(window.chrome && chrome.runtime && chrome.runtime.id);
    // Service Worker
    const isServiceWorker = (typeof self !== 'undefined') && self.constructor && self.constructor.name === 'ServiceWorkerGlobalScope';

    let likely = 'webpage'; // 默认

    if (isServiceWorker && isExtensionPage) {
        likely = 'extension-service-worker';
    } else if (isExtensionPage) {
        likely = 'extension-page';
    } else if (hasChromeRuntime) {
        // 可能是 content script；进一步检查 sendMessage
        try {
            if (typeof chrome.runtime.sendMessage === 'function') {
                likely = 'content-script-or-extension-context';
            } else {
                likely = 'unknown-extension-context';
            }
        } catch (e) {
            likely = 'unknown-extension-context';
        }
    } else {
        likely = 'webpage';
    }

    return {
        isExtensionPage,
        hasChromeRuntime,
        isServiceWorker,
        likely
    };
}

// 使用示例
// console.log(detectRuntimeContext());

export default detectRuntimeContext;