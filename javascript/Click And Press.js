// 按钮事件
/**
 * @description 长、短按监听
 * @param {Element} element 监听元素
 * @param {Function} callback 回调函数 {type:}
 * @param {Number} threshold 阈值，默认700ms
 * @example 
 * addLongPressListener(element, (e) => {
 *      e.click === true;
 *      e.longPress === false;
 *      e.element === element;
 * }, 700);
 */
function addLongPressListener(element, callback, threshold = 700) {
    let pressTimer = null;
    let isLongPress = false;

    const start = (e) => {
        if (pressTimer !== null) return;

        isLongPress = false;

        // 防止触发默认行为（如文本选择）
        e.preventDefault();

        // 移动端振动反馈
        if (e.type === 'touchstart' && window.navigator.vibrate) {
            window.navigator.vibrate(50);
        }

        pressTimer = setTimeout(() => {
            isLongPress = true;
            callback({ click: false, longPress: true, element: element });
            pressTimer = null;
        }, threshold);
    };

    const cancel = (e) => {
        if (pressTimer !== null) {
            clearTimeout(pressTimer);

            if (!isLongPress && (e.type === 'mouseup' || 'touchend')) {
                callback({ click: true, longPress: false, element: element });
            }

            pressTimer = null;
            isLongPress = false;
        }
    };

    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }

    // 添加事件监听
    // mouse
    element.addEventListener('mousedown', start);
    element.addEventListener('mouseup', cancel);
    element.addEventListener('mouseleave', cancel);
    // touch
    element.addEventListener('touchstart', start);
    element.addEventListener('touchend', cancel);
    element.addEventListener('touchcancel', cancel);
}