// 笔顺数据接口
export interface StrokeData {
  char: string;
  strokes: string[]; // SVG path 数据数组
  strokeOrder: number[]; // 笔画顺序
}

// 基础笔画库（暂时使用占位数据，后续需要完整的笔顺数据库）
const basicStrokes: Record<string, string[]> = {
  横: ['M 10,50 L 90,50'],
  竖: ['M 50,10 L 50,90'],
  撇: ['M 50,10 Q 30,30 10,50'],
  捺: ['M 10,50 Q 30,30 50,10'],
  点: ['M 50,10 Q 45,15 50,20'],
  提: ['M 10,50 L 50,10'],
};

/**
 * 获取汉字的笔顺数据
 * @param char 汉字字符
 * @returns 笔顺数据，如果不存在则返回 null
 */
export function getStrokeOrder(char: string): StrokeData | null {
  if (!char || !/[\u4e00-\u9fa5]/.test(char)) {
    return null;
  }

  // TODO: 这里需要集成完整的汉字笔顺数据库
  // 目前返回 null，表示暂不支持
  return null;
}

/**
 * 获取基础笔画列表
 * @returns 基础笔画名称数组
 */
export function getBasicStrokes(): string[] {
  return Object.keys(basicStrokes);
}

/**
 * 获取基础笔画的 SVG path
 * @param strokeName 笔画名称
 * @returns SVG path 字符串数组
 */
export function getStrokePath(strokeName: string): string[] {
  return basicStrokes[strokeName] || [];
}

/**
 * 绘制笔顺 SVG
 * @param char 汉字
 * @param container SVG 容器元素
 * @param size 尺寸
 */
export function drawStrokeOrderSVG(char: string, container: HTMLElement, size = 100): void {
  const strokeData = getStrokeOrder(char);
  if (!strokeData) {
    return;
  }

  // 创建 SVG 元素
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', size.toString());
  svg.setAttribute('height', size.toString());
  svg.setAttribute('viewBox', '0 0 100 100');

  // 绘制每个笔画
  strokeData.strokes.forEach((path) => {
    const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElement.setAttribute('d', path);
    pathElement.setAttribute('stroke', '#463AE8');
    pathElement.setAttribute('stroke-width', '2');
    pathElement.setAttribute('fill', 'none');
    pathElement.setAttribute('opacity', '0.6');
    svg.appendChild(pathElement);
  });

  container.appendChild(svg);
}
