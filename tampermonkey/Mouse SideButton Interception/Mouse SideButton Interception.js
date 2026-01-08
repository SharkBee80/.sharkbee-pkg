// ==UserScript==
// @name         鼠标侧键拦截
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  拦截鼠标侧键并智能判断历史记录位置
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /* ------------ 通用function ------------ */

    /**
     * Generate a random string
     * @param {number} length
     * @param {object} options
     * @param {boolean} options.uppercase
     * @param {boolean} options.lowercase
     * @param {boolean} options.numbers
     * @returns {string}
     */
    function randomString(length = 6, { uppercase = false, lowercase = false, numbers = false }) {
        // 参数验证
        if (typeof length !== 'number' || length < 0 || !Number.isInteger(length)) {
            throw new Error('Length must be a non-negative integer');
        }

        const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
        const NUMBER_CHARS = "0123456789";

        let charset = "";
        if (uppercase) charset += UPPERCASE_CHARS;
        if (lowercase) charset += LOWERCASE_CHARS;
        if (numbers) charset += NUMBER_CHARS;

        // 边界条件检查
        if (charset.length === 0) {
            charset = UPPERCASE_CHARS + LOWERCASE_CHARS + NUMBER_CHARS;
        }

        let result = "";
        const charsetLength = charset.length;

        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charsetLength));
        }

        return result;
    }

    /* ------------- 历史状态管理器 ------------- */
    class HistoryStateManager {
        constructor() {
            this.STORAGE_KEY = `Mouse_SideButton_Interception`;
            this.state = sessionStorage.getItem(this.STORAGE_KEY) || {
                canGoBack: false,
                canGoForward: false,
                historyLength: 1,
                currentIndex: 0
            };

            // 存储每个历史条目的状态
            this.historyStates = new Map();
            this.init();
        }

        init() {
            // 记录初始状态
            // const initialState = {
            //     url: window.location.href,
            //     timestamp: Date.now(),
            //     index: 0
            // };

            // // 替换当前历史状态
            // if (window.history.replaceState) {
            //     window.history.replaceState(initialState, '', window.location.href);
            // }

            // this.historyStates.set(0, initialState);
            // this.updateState();

            // 监听历史变化
            window.addEventListener('popstate', this.handlePopState.bind(this));

            // 监听页面卸载，用于检测新页面加载
            window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));

            // 监听 hashchange（单页应用）
            window.addEventListener('hashchange', () => {
                this.handleNavigation();
            });
        }

        handlePopState(event) {
            const currentState = event.state || {};
            const currentIndex = currentState.index || 0;

            this.updateState(currentIndex);

            console.log('历史状态变化:', {
                state: currentState,
                canGoBack: this.state.canGoBack,
                canGoForward: this.state.canGoForward,
                index: currentIndex
            });
        }

        handleBeforeUnload() {
            // 页面即将卸载，可能是在导航到新页面
            this.state.canGoForward = false;
        }

        handleNavigation() {
            // 延迟更新状态，确保 DOM 已更新
            setTimeout(() => {
                this.updateState();
            }, 100);
        }

        updateState(currentIndex = null) {
            const historyLength = window.history.length;
            let index = currentIndex || 0;
            if (currentIndex == "--") {
                index = this.state.currentIndex--;
            } else if (currentIndex == "++") {
                index = this.state.currentIndex++;
            } else {
                // 尝试从历史状态获取索引
                index = 0;
            }

            // if (index === null) {
            //     // 尝试从历史状态获取索引
            //     const currentState = window.history.state || {};
            //     index = currentState.index || 0;
            // }

            this.state = {
                canGoBack: index > 0,
                canGoForward: index + 1 < historyLength,
                historyLength: historyLength,
                currentIndex: index
            };
            sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));

            return this.state;
        }

        getCurrentState() {
            return this.state;
        }

        // 检查是否在历史记录的开头
        isAtBeginning() {
            return !this.state.canGoBack;
        }

        // 检查是否在历史记录的末尾
        isAtEnd() {
            return !this.state.canGoForward;
        }

        // 获取历史位置信息
        getPositionInfo() {
            const state = this.getCurrentState();
            return {
                position: `第 ${state.currentIndex + 1}/${state.historyLength} 页`,
                canBack: state.canGoBack,
                canForward: state.canGoForward,
                message: state.canGoBack
                    ? (state.canGoForward ? '可前进后退' : '最后一页，可后退')
                    : (state.canGoForward ? '第一页，可前进' : '仅有一页')
            };
        }
    }

    /* ------------- 通用变量 ------------- */
    const randomId = randomString(4, { numbers: false });
    const historyManager = new HistoryStateManager();

    /* ---------------- 配置 ---------------- */
    const name = GM_info.script.name || '';
    const prefix = name ? name + ': ' : '';
    console.log(prefix + '加载成功 ' + randomId);

    /* ---------------- UI ---------------- */
    const style = document.createElement('style');
    style.innerHTML = `
        .${randomId}_bar_alert {
            position: fixed;
            top: 4rem;
            transform: translateX(-50%);
            left: 50%;
            // background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            color: white;
            padding: 10px 16px;
            border-radius: 20px;
            // font-size: 14px;
            z-index: 999999;
            display: flex;
            gap: 10px;
            align-items: center;
            mix-blend-mode: difference;
            box-shadow: inset 0px 0px 20px 10px;
            user-select: none;
            animation: ${randomId}_fadeIn 0.3s ease;
            // border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        @keyframes ${randomId}_fadeIn {
            from { opacity: 0; transform: translate(-50%, -20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
        }

        .${randomId}_bar_alert_info {
            font-size: 12px;
            opacity: 0.8;
            margin-top: 4px;
        }

        .${randomId}_bar_alert button {
            background: #4caf50;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
            border-radius: 20px;
            box-shadow: inset 0px 0px 6px 1px rgba(0, 0, 0, 0.3);
            padding: 8px 16px;
            font-size: 14px;
            transition: all 0.2s ease;
        }
        
        .${randomId}_bar_alert button:hover {
            background: #45a049;
            transform: scale(1.05);
        }
        
        .${randomId}_bar_alert button:active {
            transform: scale(0.95);
        }
        
        .${randomId}_bar_alert button[disabled] {
            background: #cccccc;
            cursor: not-allowed;
            transform: none !important;
        }
        
        .${randomId}_bar_alert_content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }
    `;
    document.head.appendChild(style);

    let bar, timeout;

    function showBar(text, positionInfo, onConfirm, sec = 5) {
        if (bar) {
            bar.remove();
            clearTimeout(timeout);
        }

        bar = document.createElement('div');
        bar.className = `${randomId}_bar_alert`;

        const positionText = positionInfo ? `<div class="${randomId}_bar_alert_info">${positionInfo}</div>` : '';

        bar.innerHTML = `
            <div class="${randomId}_bar_alert_content">
                <span>${text}</span>
                ${positionText}
            </div>
            <button id="${randomId}_nav-ok" ${!onConfirm ? 'disabled' : ''}>执行</button>
            <button id="${randomId}_nav-cancel">取消</button>
        `;

        if (onConfirm) {
            bar.querySelector(`#${randomId}_nav-ok`).onclick = () => {
                onConfirm();
                cleanup();
            };
        }

        bar.querySelector(`#${randomId}_nav-cancel`).onclick = cleanup;

        document.body.appendChild(bar);

        timeout = setTimeout(cleanup, sec * 1000);

        function cleanup() {
            if (bar) {
                bar.remove();
                bar = null;
                clearTimeout(timeout);
            }
        }
    }

    /* ---------------- 侧键处理 ---------------- */
    function handleSideButton(e) {
        // 只处理侧键（后退=3，前进=4）
        if (e.button !== 3 && e.button !== 4) return;

        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const currentState = historyManager.getCurrentState();
        const positionInfo = historyManager.getPositionInfo();

        console.log(prefix + `鼠标侧键: ${e.button === 3 ? '后退' : '前进'}`, currentState);

        // 后退键
        if (e.button === 3) {
            if (currentState.canGoBack) {
                showBar(
                    '是否返回上一页？',
                    positionInfo.position,
                    () => {
                        window.history.back();
                        // 立即更新状态
                        setTimeout(() => historyManager.updateState("--"), 100);
                    }
                );
            } else {
                showBar(
                    '已经是第一页，无法后退',
                    positionInfo.message,
                    null,
                    2
                );
            }
        }

        // 前进键
        else if (e.button === 4) {
            if (currentState.canGoForward) {
                showBar(
                    '是否前进到下一页？',
                    positionInfo.position,
                    () => {
                        window.history.forward();
                        // 立即更新状态
                        setTimeout(() => historyManager.updateState("++"), 100);
                    }
                );
            } else {
                showBar(
                    '已经是最后一页，无法前进',
                    positionInfo.message,
                    null,
                    2
                );
            }
        }

        return false;
    }

    // 添加事件监听
    function addEventListeners() {
        // 使用 capture 模式确保优先处理
        document.addEventListener('mouseup', handleSideButton, true);

        // 阻止默认的侧键行为
        // document.addEventListener('mousedown', handleSideButton, true);
        // document.addEventListener('auxclick', handleSideButton, true);
    }

    // 初始化
    function init() {
        addEventListeners();

        // 初始状态日志
        console.log(prefix + '初始历史状态:', historyManager.getPositionInfo());

        // // 周期性检查历史状态（用于检测非popstate的导航）
        // setInterval(() => {
        //     historyManager.updateState();
        // }, 1000);
    }

    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();