export const calculateBoxLines = (
	element: HTMLElement | null,
	options: {
		showEnd?: boolean;
		debug?: boolean;
		lang?: string;
		self?: boolean;
	} = { self: true }
): number => {
	if (!element) return 0;
	let r: [number, ...any] = [0], fontSize: number, lineHeight: number, containerHeight: number;
	calculateMaxLines(element, {
		onCalculated: (result: CalculationResult) => {
			r[0] = result.heightLimitLines;
			fontSize = result.fontSize
			lineHeight = result.lineHeight.effectiveLineHeight
			containerHeight = result.containerHeight
		}
	})
	if (options.showEnd) {
		// @ts-ignore
		r = whetherShowEnd(r[0], fontSize, lineHeight, containerHeight)
	}
	if (options.debug) {
		if (options.self) {
			console.log(element);
		}
		let result_: any[] = ['容器限制行数', r[0]];
		if (options.lang == 'en') {
			result_ = ['Container Height Limit Lines', r]
			options.showEnd !== undefined ? result_.push('showEndFunc', options.showEnd, 'ok', r[1]) : null;
		} else {
			options.showEnd !== undefined ? result_.push('尾行显示功能', options.showEnd, 'ok', r[1]) : null;
		}

		console.log(...result_);
	}

	return r[0];
};

/**
 * 计算元素在限定容器内可显示的最大文本行数
 * 考虑因素：自动换行、强制换行（BR/块级元素）、容器高度限制
 */
export const calculateMaxLines = (
	element: HTMLElement | null,
	options: {
		showEnd?: boolean,
		debug?: boolean;
		lang?: string;
		format?: boolean;
		self?: boolean;
		onCalculated?: (result: CalculationResult) => void;
	} = { format: true, self: true }
): number => {
	if (!element) return 0;

	const {
		fontWidth,
		fontSize,
		lineHeight,
		whiteSpace,
		textContent
	} = getElementStyles(element);

	const container = element.parentElement || element;
	const containerWidth = container.clientWidth;
	const containerHeight = container.clientHeight;

	// 容器尺寸检查
	if (containerWidth <= 0 || containerHeight <= 0) {
		return 0;
	}

	// 计算行高（优先使用line-height，否则使用字体大小的1.2倍）
	const effectiveLineHeight = lineHeight > 0 ? lineHeight : fontSize * 1.2;

	// 计算高度允许的最大行数
	const heightLimitLines = Math.floor(containerHeight / effectiveLineHeight);

	let calculatedLines: number;

	// 根据white-space属性采用不同的计算策略
	if (whiteSpace.startsWith('pre')) {
		calculatedLines = calculateLinesForPreWrap(
			element,
			containerWidth,
			whiteSpace
		);
	} else {
		calculatedLines = calculateLinesForNormal(
			element,
			containerWidth,
			textContent,
			fontSize
		);
	}

	// 最终行数受高度限制
	let finalLines: [number, ...any] = [Math.min(calculatedLines, heightLimitLines)];
	if (options.showEnd) {
		const a = whetherShowEnd(finalLines[0], fontSize, lineHeight, containerHeight)
		finalLines = [a[0], a[1], a[2]]
	}

	// 调试信息输出
	if (options.debug || options.onCalculated) {
		const result: CalculationResult = {
			text: textContent.length > 50
				? textContent.slice(0, 48) + '...'
				: textContent,
			textLength: textContent.length,
			fontSize,
			lineHeight: { effectiveLineHeight, lineHeight },
			containerWidth,
			containerHeight,
			whiteSpace,
			autoCalculatedLines: calculatedLines,
			heightLimitLines,
			finalLines: { finalLines: finalLines[0] },
			elementTag: element.tagName.toLowerCase()
		};
		options.showEnd !== undefined ? (result.finalLines = { ...result.finalLines, 'showEndFunc': options.showEnd, 'ok': finalLines[1] }) : null;

		if (options.debug) {
			if (options.self) {
				console.log(element);
			}
			let result_: any = {
				"字符串": textContent.length > 50
					? textContent.slice(0, 48) + '...'
					: textContent,
				"字符长度": textContent.length,
				"字符宽度": fontWidth,
				"字符大小": fontSize,
				"行高": { effectiveLineHeight, lineHeight },
				"容器宽度": containerWidth,
				"容器高度": containerHeight,
				"空白": whiteSpace,
				"自动分行": calculatedLines,
				"限制行数": heightLimitLines,
				"最终行数": { '最终': finalLines[0] },
				"元素标签": element.tagName.toLowerCase()
			}
			options.showEnd !== undefined ? (result_['最终行数'] = { ...result_['最终行数'], '尾行显示功能': options.showEnd, 'ok': finalLines[1] }) : null;
			result_ = ['计算结果:', result_]
			if (options.lang == 'en') {
				result_ = ['calculateLines result:', result]
			}
			if (options.format) {
				const _result = JSON.stringify(result_, null, 2);
				console.log(..._result);
			} else {
				console.log(...result_);
			}
		}
		options.onCalculated?.(result);
	}

	return finalLines[0];
};

/**
 * 获取元素计算后的样式和文本内容
 */
const getElementStyles = (element: HTMLElement) => {
	const style = getComputedStyle(element);

	return {
		fontWidth: style.fontStyle.length,
		fontSize: parseFloat(style.fontSize),
		lineHeight: parseFloat(style.lineHeight),
		whiteSpace: style.whiteSpace,
		textContent: element.textContent?.trim() || ''
	};
};

/**
 * 为 pre、pre-wrap、pre-line 等white-space值计算行数
 */
const calculateLinesForPreWrap = (
	element: HTMLElement,
	containerWidth: number,
	whiteSpace: string
): number => {
	const text = element.textContent || '';
	const segments = text.split('\n');
	let totalLines = 0;

	segments.forEach(segment => {
		if (whiteSpace === 'pre') {
			// pre 不自动换行，每段一行
			totalLines += segment ? 1 : 0; // 空段不计行
		} else {
			// pre-wrap 和 pre-line 会自动换行
			const segmentWidth = getTextWidth(segment, element);
			totalLines += Math.ceil(segmentWidth / containerWidth) || 0;
		}
	});

	// 额外处理强制换行元素
	const forcedLines = countForcedLineBreaks(element, false); // 不计数换行符
	return Math.max(totalLines, forcedLines);
};

/**
 * 为 normal、nowrap、initial 等white-space值计算行数
 */
const calculateLinesForNormal = (
	element: HTMLElement,
	containerWidth: number,
	textContent: string,
	fontSize: number
): number => {
	// 自动换行行数
	const textWidth = getTextWidth(textContent, element);
	const autoLines = Math.ceil(textWidth / containerWidth) || 1; // 至少一行

	// 强制换行行数
	const forcedLines = countForcedLineBreaks(element, true);

	return Math.max(autoLines, forcedLines);
};

/**
 * 计算文本的视觉宽度（更精确的版本）
 */
const getTextWidth = (text: string, element: HTMLElement): number => {
	if (!text) return 0;

	// 创建临时canvas来测量文本宽度（更准确）
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');

	if (context) {
		const style = getComputedStyle(element);
		context.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
		return context.measureText(text).width;
	}

	// 降级方案：使用字体大小估算
	const fontSize = parseFloat(getComputedStyle(element).fontSize);
	let width = 0;

	for (const char of text) {
		// 中文、日文、韩文、全角符号使用全角宽度
		if (/[\u4e00-\u9fa5\u3040-\u30ff\uac00-\ud7af\uff00-\uffef]/.test(char)) {
			width += fontSize;
		} else {
			// 英文字母、数字、半角符号使用半角宽度
			width += fontSize * 0.6; // 更准确的比例
		}
	}

	return width;
};

/**
 * 计算强制换行数量
 */
const countForcedLineBreaks = (
	element: HTMLElement,
	includeNewlines: boolean
): number => {
	let lines = 1; // 起始行

	const walkNodes = (node: Node) => {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const el = node as HTMLElement;
			const display = getComputedStyle(el).display;

			// 块级元素强制换行
			if (display === 'block' || display === 'flex' || display === 'grid') {
				lines++;
			}

			// 遍历子节点
			el.childNodes.forEach(walkNodes);
		} else if (node.nodeName === 'BR') {
			lines++;
		}
	};

	element.childNodes.forEach(walkNodes);

	// 处理white-space: pre中的换行符
	if (includeNewlines) {
		const whiteSpace = getComputedStyle(element).whiteSpace;
		if (whiteSpace.startsWith('pre')) {
			const newlineCount = (element.textContent?.match(/\n/g)?.length || 0);
			lines += newlineCount;
		}
	}

	return lines;
};

function whetherShowEnd(n: number, y: number, h: number, H: number): [number, boolean, boolean] {
	if (n * h < H) {
		if ((n + 1) * h > H && (n * h + (h + y) / 2) < H) {
			return [n + 1, true, true];
		}
		return [n, true, false];
	} else {
		return [n, false, false];
	}
}

/**
 * 计算结果类型定义（用于调试和回调）
 */
interface CalculationResult {
	text: string;
	textLength: number;
	fontSize: number;
	lineHeight: Record<string, number>;
	containerWidth: number;
	containerHeight: number;
	whiteSpace: string;
	autoCalculatedLines: number;
	heightLimitLines: number;
	finalLines: Record<string, number | boolean>;
	elementTag: string;
}

// // 基础用法
// const lines = calculateMaxLines(element);

// // 调试模式
// const lines = calculateMaxLines(element, { debug: true });

// // 使用回调获取计算结果
// const lines = calculateMaxLines(element, {
//   onCalculated: (result) => {
//     console.log('计算结果:', result);
//   }
// });