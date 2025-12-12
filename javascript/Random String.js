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