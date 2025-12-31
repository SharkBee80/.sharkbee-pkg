/**
 * Generate a random string
 * @param {object} options 
 * @param {number} options.length 6
 * @param {boolean} options.uppercase ABCDEFGHIJKLMNOPQRSTUVWXYZ
 * @param {boolean} options.lowercase abcdefghijklmnopqrstuvwxyz
 * @param {boolean} options.numbers 0123456789
 * @param {boolean} options.symbols ~!@#$%^&*()_+
 * @returns {string}
 */
function randomString({ length = 6, uppercase = false, lowercase = false, numbers = false, symbols = false }) {
    // 参数验证
    if (typeof length !== 'number' || length < 0 || !Number.isInteger(length)) {
        throw new Error('Length must be a non-negative integer');
    }

    const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
    const NUMBER_CHARS = "0123456789";
    const SYMBOLS = "~!@#$%^&*()_+";

    let charset = "";
    if (uppercase) charset += UPPERCASE_CHARS;
    if (lowercase) charset += LOWERCASE_CHARS;
    if (numbers) charset += NUMBER_CHARS;
    if (symbols) charset += SYMBOLS;

    // 边界条件检查
    if (charset.length === 0) {
        charset = UPPERCASE_CHARS + LOWERCASE_CHARS + NUMBER_CHARS + SYMBOLS;
    }

    let result = "";
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) result += charset.charAt(Math.floor(Math.random() * charsetLength));

    return result;
}

if (require && require.main == module) {
    // 只有在脚本被直接运行（如 node app.js）时才会执行
    console.log(randomString({ length: 6, uppercase: true, lowercase: true, numbers: true, symbols: true }));
}